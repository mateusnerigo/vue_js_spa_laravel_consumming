<template>
  <NavbarComponent />

  <router-view class="router-view" v-slot="{ Component }">
    <Transition name="router-transition" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

export default ({
  components: {
    NavbarComponent
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
  transition: 0.5s ease;
}

.router-transition-enter-from,
.router-transition-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
