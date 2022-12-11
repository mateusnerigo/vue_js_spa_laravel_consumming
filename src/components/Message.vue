<template>
  <div class="message-container {{ messageType }}">
    <p>{{ messageText }}</p>
  </div>
</template>

<script>
export default {
    name: 'Message',
    props: {
        messageType: String,
        messageText: String,
    }
}
</script>

<style lang="scss" scoped>

</style>

