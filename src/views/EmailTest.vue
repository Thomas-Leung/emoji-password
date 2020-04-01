<template>
  <div>
    Email Test LogData {{logData}}
    <v-btn @click="logData.push('YEAHHHHH')">Press me</v-btn>
  </div>
</template>

<script>
export default {
  props: { logData: Array }
};
</script>

<style>
</style>