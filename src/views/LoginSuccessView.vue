<template>
  <div class="login-success-container">
    <p>{{ $t('userSuccessfullyLoggedIn') }}</p>
  </div>
</template>

<script>
export default {
    name: 'LoginSuccessView',

    mounted() {
      setTimeout(() => {
        this.$router.push('/')
      }, 1000);
    }
}
</script>

<style lang="scss" scoped>

</style>

