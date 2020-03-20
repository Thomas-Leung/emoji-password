<template>
  <div class="home">
    <Clock/>
    <EmojiPwd/>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from '@/components/Clock.vue'
import EmojiPwd from '@/components/EmojiPwd.vue'

export default {
  name: 'Home',
  components: {
    Clock,
    EmojiPwd
  }
}
</script>
