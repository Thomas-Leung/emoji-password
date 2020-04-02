<template>
  <div class="home" align="center">
    <Clock :unlock="unlock" @unlock="lock" />
    <v-sheet class="pa-4">
      <div class="caption pb-6">Tries: {{tries}}</div>
      <EmojiPwd :randPwd="phonePass.generatedPwd" @unlock="getUnlockValue" />
    </v-sheet>
    <!-- <div
      class="ma-6"
    >Email Test LogData {{logData}}{{phonePass["displayPwd"]}}
    </div> -->
    <v-sheet height="2vh"></v-sheet>
    <v-btn text @click="bottomSheet = !bottomSheet">Check Log</v-btn>
    <v-bottom-sheet v-model="bottomSheet" inset :scrollable="true">
      <v-card height="350px">
        <v-card-title>
          <span class="title">Log Data:</span>
        </v-card-title>
        <v-card-text>
          <ul id="log-data">
            <li v-for="(log, index) in logData" :key="index">{{log}}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from "@/components/Clock.vue";
import EmojiPwd from "@/components/EmojiPwd.vue";

export default {
  name: "Home",
  data: function() {
    return {
      unlock: false,
      bottomSheet: false,
      tries: 3
    };
  },
  components: {
    Clock,
    EmojiPwd
  },
  props: ["logData", "phonePass", "userId"],
  methods: {
    getUnlockValue(value) {
      this.unlock = value;
      if(value) {
        this.logData.push(`${new Date().toISOString()}` + ", " + this.userId + ", Phone, TEST, Login successful");
      } else {
        this.logData.push(`${new Date().toISOString()}` + ", " + this.userId + ", Phone, TEST, Login un-successful");
        this.tries--;
        if(this.tries <= 0) {
          // do something
        }
      }
    },
    lock(value) {
      this.unlock = value;
    }
  }
};
</script>
