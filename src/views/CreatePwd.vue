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
          <EmojiPwd :randPwd="generatedPwd" />
          <v-sheet height="2vh"></v-sheet>
          <v-btn color="primary" @click="page = 2">Next</v-btn>
          <v-btn text>Check Log</v-btn>
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
      displayPwd: "" // the emoji of emojiPwd
    };
  },
  created() {
    let generatedPwd = "";
    let displayPwd = "";
    const characters = "1234567890qwerty!@#$%^&*()QWERTY";
    const emoji = [
      "😀",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😇",
      "🙃",
      "😉",
      "😋",
      "😝",
      "🧐",
      "🤓",
      "🥳",
      "😏",
      "🥺",
      "😢",
      "😭",
      "😤",
      "😠",
      "😰",
      "😓",
      "🤔",
      "🤭",
      "🤥",
      "😶",
      "😬",
      "🙄",
      "😦",
      "😴",
      "🤤",
      "😵",
      "😷"
    ];
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
};
</script>