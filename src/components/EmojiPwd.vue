<template>
  <v-sheet class="pa-4">
    <v-row align="center" justify="center">
      <v-col v-if="passcode.length === 0" class="mb-4" cols="auto"></v-col>
      <v-col class="pl-1 pr-1 pt-1" cols="auto" v-for="i in passcode.length" :key="i">
        <v-icon size="14">mdi-checkbox-blank-circle</v-icon>
      </v-col>
    </v-row>
    <v-container class="grey lighten-4" style="border-radius:15px">
      <v-row v-for="i in 4" :key="i" no-gutters>
        <v-col v-for="j in 4" :key="j">
          <v-card height="8vh" outlined tile align="center">
            <v-btn
              class="display-1"
              ripple
              tile
              text
              width="100%"
              height="100%"
              @click="typePwd(emoji[i == 1? i * j : 4*(i-1) + j].symbol)"
            >{{emoji[i == 1? i * j : 4*(i-1) + j].emoji}}</v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text class="caption" @click="reset">
            <v-icon size="16">mdi-lock-reset</v-icon>Reset
          </v-btn>
        </v-col>
        <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text @click="switchEmoji">
            <v-icon>{{arrow}}</v-icon>
          </v-btn>
        </v-col>
        <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text class="caption" @click="login">
            Login
            <v-icon size="16">mdi-lock-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar :color="snackbarColor" v-model="snackbar">
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-sheet>
</template>

<script>
import emojiPwd from "@/components/data/emojiPwd.json";
export default {
  data: function() {
    return {
      emoji: emojiPwd["page1"],
      arrow: "mdi-chevron-down",
      passcode: "",
      tempPwd: "1234",
      snackbar: false,
      snackbarText: "sasd",
      snackbarColor: "success",
    };
  },
  methods: {
    switchEmoji: function() {
      if (this.arrow === "mdi-chevron-down") {
        this.emoji = emojiPwd["page2"];
        this.arrow = "mdi-chevron-up";
      } else {
        this.emoji = emojiPwd["page1"];
        this.arrow = "mdi-chevron-down";
      }
    },
    typePwd: function(value) {
      this.passcode += value;
    },
    reset() {
      this.passcode = "";
    },
    login() {
      if (this.passcode == this.tempPwd) {
        this.snackbarColor = "success";
        this.snackbarText = "Correct Passcode";
      } else {
        this.snackbarColor = "error";
        this.snackbarText = "Wrong Passcode, try again.";
      }
      this.snackbar = true;
      this.passcode = "";
    }
  }
};
</script>

<style scoped>

</style>