<template>
  <v-sheet>
    <v-row align="center" justify="center">
      <v-col v-if="passcode.length === 0" class="mb-4" cols="auto"></v-col>
      <v-col class="pl-1 pr-1 pt-1" cols="auto" v-for="i in passcode.length" :key="i">
        <v-icon size="20">mdi-checkbox-blank-circle</v-icon>
      </v-col>
    </v-row>
    <v-container :class="{'shakePin': shake}" class="grey lighten-4" style="border-radius:15px">
      <v-row v-for="i in 4" :key="i" no-gutters>
        <v-col v-for="j in 8" :key="j">
          <v-card height="8vh" outlined tile align="center">
            <v-btn
              class="display-1"
              ripple
              tile
              text
              width="100%"
              height="100%"
              @click="typePwd(emoji[i == 1? i * j : 8*(i-1) + j].symbol)"
            >{{emoji[i == 1? i * j : 8*(i-1) + j].emoji}}</v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text class="caption" @click="reset" :disabled="unlock">
            <v-icon size="16">mdi-lock-reset</v-icon>Reset
          </v-btn>
        </v-col>
        <v-col class="pb-0 pt-1" cols="auto">
          <!-- <v-btn text @click="switchEmoji">
            <v-icon>{{arrow}}</v-icon>
          </v-btn> -->
        </v-col>
        <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text class="caption" @click="login" :disabled="unlock">
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
  props: {
    unlock: Boolean,
    randPwd: String
  },
  data: function() {
    return {
      emoji: emojiPwd["page1"],
      arrow: "mdi-chevron-down",
      passcode: "",
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
      shake: false
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
      this.shake = false;
    },
    login() {
      if (this.passcode == this.randPwd) {
        this.snackbarColor = "success";
        this.snackbarText = "Correct Passcode~"; // Click the unlock icon to lock again.
        this.$emit("unlock", true);
      } else {
        this.snackbarColor = "error";
        this.snackbarText = "Wrong Passcode, try again.";
        this.shake = true;
        this.$emit("unlock", false);
      }
      this.snackbar = true;
      var that = this;
      setTimeout(function() {
        that.reset();
      }, 500);
    }
  }
};
</script>

<style scoped>
.shakePin {
  animation: shake 0.5s linear;
}
@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
</style>