<template>
  <div class="email-test-content" align="center">
    <div class="title pt-6">Sign in to your Email</div>
    <div class="caption pb-6">Using emoji password</div>
    <v-text-field
      class="ml-6 mr-6 mt-12 mb-n6 pt-12"
      label="Username"
      placeholder="John Doe"
      filled
      dense
    ></v-text-field>
    <EmojiPwd class="ml-6 mr-6" :randPwd="emailPass.generatedPwd" @unlock="getUnlockValue" />

    <div
      class="ma-6"
    >Email Test LogData {{logData}}{{emailPass["displayPwd"]}}{{bankPass["displayPwd"]}}{{phonePass["displayPwd"]}}</div>
    <v-btn @click="logData.push('YEAHHHHH')">Press me</v-btn>
  </div>
</template>

<script>
import EmojiPwd from "@/components/EmojiPwd.vue";

export default {
  components: {
    EmojiPwd
  },
  props: ["logData", "emailPass", "bankPass", "phonePass"],
  data: function() {
    return {
      unlock: false
    };
  },
  methods: {
    getUnlockValue(value) {
      if (value === true) {
        this.$router.push({
          name: "BankTest",
          params: {
            logData: this.logData,
            bankPass: this.bankPass,
            phonePass: this.phonePass
          }
        });
      }
    }
  }
};
</script>

<style>
</style>