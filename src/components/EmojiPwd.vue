<template>
  <v-sheet class="pa-4">
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
            >{{emoji[i == 1? i * j : 4*(i-1) + j].emoji}}</v-btn>
            <!-- <p class="display-1 mb-0">{{emoji[i * j]}}</p> -->
          </v-card>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
         <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text class="caption">
            <v-icon size="16">mdi-lock-reset</v-icon>
            Reset
          </v-btn>
        </v-col>
        <v-col class="pb-0 pt-1" cols="auto">
          <v-btn text @click="switchEmoji">
            <v-icon>{{arrow}}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import emojiPwd from "@/components/data/emojiPwd.json"
export default {
  data: function() {
    return {
      emoji: emojiPwd["page1"],
      arrow: "mdi-chevron-down"
    };
  },
  methods: {
    switchEmoji: function() {
      if (this.arrow === "mdi-chevron-down") {
        this.emoji = emojiPwd["page2"]
        this.arrow = "mdi-chevron-up"
      } else {
        this.emoji = emojiPwd["page1"]
        this.arrow = "mdi-chevron-down"
      }
    }
  }
};
</script>

<style scoped>
.v-btn {
  min-width: 0;
}
</style>