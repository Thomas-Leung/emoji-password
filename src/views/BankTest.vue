<template>
  <div class="bank-test-content" align="center">
    <div class="title pt-6">Sign in to your Bank account</div>
    <div class="caption pb-6">Tries: {{tries}}</div>
    <EmojiPwd class="ml-6 mr-6" :randPwd="bankPass.generatedPwd" @unlock="getUnlockValue" />
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
import EmojiPwd from "@/components/EmojiPwd.vue";

export default {
  components: {
    EmojiPwd
  },
  props: ["logData", "bankPass", "phonePass", "userId"],
  data: function() {
    return {
      bottomSheet: false,
      unlock: false, // this isn't needed?
      tries: 3
    };
  },
  methods: {
    getUnlockValue(value) {
      //this.unlock = value;
      if (value === true) {
        this.logData.push(`${new Date().toISOString()}` + ", " + this.userId + ", Bank, TEST, Login successful");
        this.$router.push({
          name: "PhoneTest",
          params: {
            logData: this.logData,
            phonePass: this.phonePass,
            userId: this.userId
          }
        });
      } else {
        this.logData.push(`${new Date().toISOString()}` + ", " + this.userId + ", Bank, TEST, Login un-successful");
        this.tries--;
        if (this.tries <= 0) {
          this.$router.push({
            name: "PhoneTest",
            params: {
              logData: this.logData,
              phonePass: this.phonePass,
              userId: this.userId
            }
          });
        }
      }
    }
  }
};
</script>

<style>
</style>