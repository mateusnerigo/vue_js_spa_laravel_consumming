<template>
  <div class="login-success-container">
    <p>Usuário logado com sucesso!</p>
  </div>
</template>

<script>
export default {
    name: 'LoginSuccessView',

    mounted() {
      setTimeout(() => {
        window.location.replace('/');
        // this.$router.push('/')
      }, 1000);
    }
}
</script>

<style lang="scss" scoped>

</style>

