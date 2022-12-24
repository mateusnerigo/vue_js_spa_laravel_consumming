<template>
  <nav>
    <router-link to="/">Home</router-link>

    <router-link v-show="isLoggedIn" to="/salePoints">Sale points</router-link>
    <router-link v-show="isLoggedIn" to="/clients">Clients</router-link>
    <router-link v-show="isLoggedIn" to="/products">Products</router-link>
    <router-link v-show="isLoggedIn" to="/sales">Sales</router-link>

    <router-link v-if="isLoggedIn" to="/logout">Logout</router-link>
    <router-link v-else to="/login">Login</router-link>
  </nav>

  <router-view class="router-view" v-slot="{ Component }">
    <Transition name="router-transition" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script>
import generalFunctions from '@/helpers/generalFunctions';
export default ({
  data() {
    return {
      isLoggedIn: generalFunctions
        .hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME)
    }
  }
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.router-transition-enter-active,
.router-transition-leave-active {
  transition: opacity 0.5s ease;
}

.router-transition-enter-from,
.router-transition-leave-to {
  opacity: 0;
}
</style>
