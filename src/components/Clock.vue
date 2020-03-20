<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-icon>mdi-lock</v-icon>
      </v-col>
      <v-col class="mb-12">
        <h1
          class="display-2 font-weight-light mb-3"
        >{{("0" + date.getHours()).slice(-2)}} : {{("0" + date.getMinutes()).slice(-2)}} : {{("0" + date.getSeconds()).slice(-2)}}</h1>
        <p>{{dayNames[date.getDay()]}}, {{date.toLocaleString('default', { month: 'long' })}}. {{date.getDate()}}</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-n12 pt-10">
        <p class="caption font-weight-regular">Enter passcode</p>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  name: "Clock",
  data: () => ({
    date: new Date(),
    dayNames: ["Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat.", "Sun."]
  }),
  mounted: function() {
    this.$nextTick(function() {
      window.setInterval(() => {
        this.date = new Date();
      }, 1000);
    });
  }
};
</script>
