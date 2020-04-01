<template>
  <div class="bank-test-content" align="center">
    <div class="title pt-6">BANK ATM</div>
    <v-sheet :elevation="2" class="mx-auto" height="100" width="100">Enter Emoji PIN</v-sheet>
    <EmojiPwd class="ml-6 mr-6" :randPwd="bankPass.generatedPwd" @unlock="getUnlockValue" />

    <div
      class="ma-6"
    >Email Test LogData {{logData}}{{bankPass["displayPwd"]}}{{phonePass["displayPwd"]}}</div>
    <v-btn @click="logData.push('YEAHHHHH')">Press me</v-btn>
  </div>
</template>

<script>
import EmojiPwd from "@/components/EmojiPwd.vue";

export default {
  components: {
    EmojiPwd
  },
  props: ["logData", "bankPass", "phonePass"],
  data: function() {
    return {
      unlock: false
    };
  },
  methods: {
    getUnlockValue(value) {
      if (value === true) {
        this.$router.push({
          name: "PhoneTest",
          params: {
            logData: this.logData,
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