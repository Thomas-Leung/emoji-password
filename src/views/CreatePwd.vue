<template>
  <div class="create-pwd-content">
    <v-sheet color="orange lighten-2" class="px-8 py-2">
      <v-row class="headline font-weight-medium">Emoji Password</v-row>
      <v-row class="font-weight-light body-2">
        Welcome to emoji password test. First you need to create 3 password for 3 difference scenarios.
        These password sets are created randomly and you should remember them for later use. Let's begin~
      </v-row>
    </v-sheet>

    <v-stepper v-model="page">
      <v-stepper-header>
        <v-stepper-step :complete="page > 1" step="1">Email</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="page > 2" step="2">Banking</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Unlock Phone</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="pa-n8">
        <v-stepper-content step="1">
          <v-sheet>
            <h1 class="title font-weight-medium">Step 1 new password for email:</h1>
            <h1 class="headline font-weight-medium">
              You password is:
              <span v-if="!hidePwd">{{displayPwd}}</span>
            </h1>
            <v-switch
              inset
              dense
              :ripple="false"
              v-model="hidePwd"
              :label="`Hide password: ${hidePwd.toString()}`"
              class="ma-0 ml-1"
              hide-details
            ></v-switch>
          </v-sheet>
          <EmojiPwd :randPwd="generatedPwd" @unlock="getUnlockValue" />
          <v-sheet height="2vh"></v-sheet>
          <v-btn color="primary" @click="nextPage(2)">Next</v-btn>
          <v-btn text @click="bottomSheet = !bottomSheet">Check Log</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="page = 3">Continue</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="page = 1">Continue</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-bottom-sheet v-model="bottomSheet" inset :scrollable="true">
      <v-card height="350px">
        <v-card-title>
          <span class="title">Log Data:</span>
        </v-card-title>
        <v-card-text>
          <ul id="log-data">
            <li v-for="(log, index) in logs" :key="index">{{log}}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <v-snackbar :color="snackbarColor" v-model="snackbar">
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import EmojiPwd from "@/components/EmojiPwd.vue";

export default {
  components: {
    EmojiPwd
  },
  data() {
    return {
      page: 1,
      hidePwd: false,
      generatedPwd: "", // the symbol (character) of emojiPwd
      displayPwd: "", // the emoji of emojiPwd
      bottomSheet: false,
      unlock: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      logs: ["line1", "line2"]
    };
  },
  methods: {
    nextPage(nextPgNo) {
      if (this.unlock === true) {
        this.page = nextPgNo;
      } else {
        this.snackbarColor = "info";
        this.snackbarText =
          "You need to successfully enter the password to continue.";
        this.snackbar = true;
      }
      console.log(nextPgNo);
    },
    logging() {
      let logData = `[${new Date().toISOString()}] UserAgentHeader: ${
        navigator.userAgent
      }`;
      console.log(logData);
      this.logs.push(logData);
    },
    getUnlockValue(value) {
      this.unlock = value;
    },
    generateRandomPwd() {
      let generatedPwd = "";
      let displayPwd = "";
      const characters = "1234567890qwerty!@#$%^&*()QWERTY";
      // prettier-ignore
      const emoji = ["😀", "😆", "😅", "😂", "🤣", "😇", "🙃", "😉", "😋", "😝", "🧐", "🤓", "🥳", "😏", "🥺", "😢", "😭", "😤", "😠", "😰", "😓", "🤔", "🤭", "🤥", "😶", "😬", "🙄", "😦", "😴", "🤤", "😵", "😷" ];
      const charactersLength = characters.length;
      const pwdLength = 5;
      for (let i = 0; i < pwdLength; i++) {
        let randomNum = Math.floor(Math.random() * charactersLength);
        generatedPwd += characters.charAt(randomNum);
        displayPwd += emoji[randomNum];
      }
      this.generatedPwd = generatedPwd;
      this.displayPwd = displayPwd;
    }
  },
  created() {
    this.generateRandomPwd();
    this.logging();
  }
};
</script>