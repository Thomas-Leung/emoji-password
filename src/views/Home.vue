<template>
  <div class="home">
    <Clock :unlock="unlock" @unlock="lock" />
    <v-sheet class="pa-4">
      <EmojiPwd :unlock="unlock" @unlock="getUnlockValue" />
    </v-sheet>
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
      unlock: false
    };
  },
  components: {
    Clock,
    EmojiPwd
  },
  methods: {
    getUnlockValue(value) {
      this.unlock = value;
    },
    lock(value) {
      this.unlock = value;
    }
  }
};
</script>
