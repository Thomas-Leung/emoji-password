<template>
  <div class="create-pwd-content">
    <!-- CREATE PASSWORD PAGE HEADER -->
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

      <!-- CREATE PASSWORD FOR EMAIL -->
      <v-stepper-items class="pa-n8">
        <v-stepper-content step="1">
          <v-sheet>
            <h1 class="title font-weight-medium">Step 1: New password for Email:</h1>
            <h1 class="headline font-weight-medium">
              Your password is:
              <span v-if="!hidePwd">{{emailPass.displayPwd}}</span>
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
          <EmojiPwd :randPwd="emailPass.generatedPwd" @unlock="getUnlockValue" />
          <v-sheet height="2vh"></v-sheet>
          <v-btn color="primary" @click="nextPage(2)">Next</v-btn>
          <v-btn text @click="bottomSheet = !bottomSheet">Check Log</v-btn>
        </v-stepper-content>

        <!-- CREATE PASSWORD FOR BANKING -->
        <v-stepper-content step="2">
          <v-sheet>
            <h1 class="title font-weight-medium">Step 2: New password for Banking:</h1>
            <h1 class="headline font-weight-medium">
              Your password is:
              <span v-if="!hidePwd">{{bankPass.displayPwd}}</span>
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
          <EmojiPwd :randPwd="bankPass.generatedPwd" @unlock="getUnlockValue" />
          <v-sheet height="2vh"></v-sheet>
          <v-btn class="mr-2" color="secondary" @click="previousPage(1)">back</v-btn>
          <v-btn color="primary" @click="nextPage(3)">Next</v-btn>
          <v-btn text @click="bottomSheet = !bottomSheet">Check Log</v-btn>
        </v-stepper-content>

        <!-- CREATE PASSWORD FOR UNLOCKING PHONE -->
        <v-stepper-content step="3">
          <v-sheet>
            <h1 class="title font-weight-medium">Step 3: New password for phone:</h1>
            <h1 class="headline font-weight-medium">
              Your password is:
              <span v-if="!hidePwd">{{phonePass.displayPwd}}</span>
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
          <EmojiPwd :randPwd="phonePass.generatedPwd" @unlock="getUnlockValue" />
          <v-sheet height="2vh"></v-sheet>
          <v-btn class="mr-2" color="secondary" @click="previousPage(2)">back</v-btn>
          <v-btn color="primary" @click="navEmailTest()">Start Testing</v-btn>
          <v-btn text @click="bottomSheet = !bottomSheet">Check Log</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <!-- LOGGING AREA -->
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

    <!-- SNACKBAR TO PROMPT USER -->
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
      emailPass: {
        generatedPwd: "", // the symbol (character) of emojiPwd
        displayPwd: "" // the emoji of emojiPwd
      },
      bankPass: {
        generatedPwd: "", // the symbol (character) of emojiPwd
        displayPwd: "" // the emoji of emojiPwd
      },
      phonePass: {
        generatedPwd: "", // the symbol (character) of emojiPwd
        displayPwd: "" // the emoji of emojiPwd
      },
      bottomSheet: false,
      unlock: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      logs: [],
      scheme: ["Email", "Banking", "Phone"],
      userId: ""
    };
  },
  methods: {
    /**
     * If user enters the correct password, 
     * the user can go to the next step to create the next password.
     */
    nextPage(nextPgNo) {
      if (this.unlock === true) {
        this.hidePwd = false; //reset value to false
        this.unlock = false; //reset value to false
        this.page = nextPgNo;

        this.logs.push(
          `[${new Date(
            new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
          ).toISOString()}]` +
            ", " +
            this.userId +
            ", " +
            this.scheme[this.page - 1] +
            ", CREATE, Start attempt"
        );
      } else {
        this.snackbarColor = "info";
        this.snackbarText =
          "You need to successfully enter the password to continue.";
        this.snackbar = true;
      }
    },
    /**
     * Go back to the previous step for the previous password.
     */
    previousPage(prevPgNo) {
      // minor bug: if you go 2 previous and move 2 pages forward,
      // it will lock again.
      this.page = prevPgNo;
      this.unlock = true;

      this.logs.push(
        `[${new Date(
          new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
        ).toISOString()}]` +
          ", " +
          this.userId +
          ", " +
          this.scheme[this.page - 1] +
          ", CREATE, Start attempt"
      );
    },
    /**
     * Navigate to the email test if user has created all passwords.
     * Otherwise, prompt the user to create all passwords.
     */
    navEmailTest() {
      if (this.unlock === true) {
        this.$router.push({
          name: "EmailTest",
          params: {
            logData: this.logs,
            emailPass: this.emailPass,
            bankPass: this.bankPass,
            phonePass: this.phonePass,
            userId: this.userId
          }
        });
      } else {
        this.snackbarColor = "info";
        this.snackbarText =
          "You need to successfully enter the password to continue.";
        this.snackbar = true;
      }
    },
    /**
     * Logging for user agent 
     */
    logging() {
      let logData = `[${new Date(
        new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()}] UserAgentHeader: ${navigator.userAgent}`;
      this.logs.push(logData);
    },
    /**
     * Check if the user inputs the correct
     * password and log if it is successfull or not.
     */
    getUnlockValue(value) {
      this.unlock = value;
      if (value) {
        this.logs.push(
          `[${new Date(
            new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
          ).toISOString()}]` +
            ", " +
            this.userId +
            ", " +
            this.scheme[this.page - 1] +
            ", CREATE, Login successful"
        );
      } else {
        this.logs.push(
          `[${new Date(
            new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
          ).toISOString()}]` +
            ", " +
            this.userId +
            ", " +
            this.scheme[this.page - 1] +
            ", CREATE, Login failed"
        );
      }
    },
    /**
     * Generate random password for all password creation.
     */
    generateRandomPwd(object) {
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
      object.generatedPwd = generatedPwd;
      object.displayPwd = displayPwd;
      console.log(displayPwd);
    },
    /**
     * Generate random id for the user
     */
    randId() {
      // prettier-ignore
      return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }
  },
  created() {
    this.userId = this.randId();
    this.generateRandomPwd(this.emailPass);
    this.generateRandomPwd(this.bankPass);
    this.generateRandomPwd(this.phonePass);
    this.logs.push(
      `[${new Date(
        new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()}]` +
        ", " +
        this.userId +
        ", " +
        "Email, CREATE, Login password created"
    );
    this.logs.push(
      `[${new Date(
        new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()}]` +
        ", " +
        this.userId +
        ", " +
        "Banking, CREATE, Login password created"
    );
    this.logs.push(
      `[${new Date(
        new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()}]` +
        ", " +
        this.userId +
        ", " +
        "Phone, CREATE, Login password created"
    );
    this.logs.push(
      `[${new Date(
        new Date().getTime() + -new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()}]` +
        ", " +
        this.userId +
        ", " +
        "Email, CREATE, Start attempt"
    );
  }
};
</script>