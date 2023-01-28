<template>
  <div class="logout-container">
    <p>{{ $t("userSuccessfullyLoggedOut") }}</p>
  </div>
</template>

<script>
import generalFunctions from '@/helpers/generalFunctions';

export default {
    name: 'LogoutView',

    mounted() {
      generalFunctions.removeAppCookies();
      this.$store.dispatch('setIsAuthenticated');

      setTimeout(() => {
        this.$router.push('/')
      }, 1000);
    }
}


</script>

<style lang="scss" scoped>

</style>

