<template>
  <v-sheet class="pa-12">
    <v-container class="grey lighten-5" style="border-radius:15px">
      <v-row v-for="i in 4" :key="i" no-gutters>
        <v-col v-for="j in 4" :key="j">
          <v-card class="pa-3" outlined tile align="center">
              {{i*j}}
            <!-- <p class="display-1 mb-0">{{emoji[i * j]}}</p> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data: function() {
    return {
        emoji: ["", "😀", "😆"]
    };
  }
};
</script>

<style>
</style>