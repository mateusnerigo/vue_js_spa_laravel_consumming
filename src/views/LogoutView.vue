<template>
  <div class="logout-container">
    <p>Usuário deslogado com sucesso!</p>
  </div>
</template>

<script>
import generalFunctions from '@/helpers/generalFunctions';

export default {
    name: 'LogoutView',

    mounted() {
      generalFunctions.removeAppCookies();

      setTimeout(() => {
        this.$router.push('/')
      }, 1000);
    }
}


</script>

<style lang="scss" scoped>

</style>

