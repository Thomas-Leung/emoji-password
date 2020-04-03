<template>
  <div class="email-test-content" align="center">
    <div class="title pt-6">Sign in to your Email</div>
    <div class="caption">Using emoji password</div>
    <div class="subtitle-2">Tries: {{tries}}</div>
    <v-text-field
      class="ml-6 mr-6 mt-12 mb-n6 pt-12"
      label="Username"
      placeholder="John Doe"
      filled
      dense
    ></v-text-field>
    <EmojiPwd class="ml-6 mr-6" :randPwd="emailPass.generatedPwd" @unlock="getUnlockValue" />
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
  props: ["logData", "emailPass", "bankPass", "phonePass", "userId"],
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
        this.logData.push(
          `[${new Date(new Date().getTime() + (-new Date().getTimezoneOffset())*60*1000).toISOString()}]` +
            ", " +
            this.userId +
            ", Email, TEST, Login successful"
        );
        this.$router.push({
          name: "BankTest",
          params: {
            logData: this.logData,
            bankPass: this.bankPass,
            phonePass: this.phonePass,
            userId: this.userId
          }
        });
      } else {
        this.logData.push(
          `[${new Date(new Date().getTime() + (-new Date().getTimezoneOffset())*60*1000).toISOString()}]` +
            ", " +
            this.userId +
            ", Email, TEST, Login unsuccessful"
        );
        this.tries--;
        if (this.tries <= 0) {
          this.$router.push({
            name: "BankTest",
            params: {
              logData: this.logData,
              bankPass: this.bankPass,
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