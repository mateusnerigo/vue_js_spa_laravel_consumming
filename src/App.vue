<template>
  <NavbarComponent />

  <router-view class="router-view" v-slot="{ Component }">
    <Transition name="router-transition" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script>
import NavbarComponent from './components/Sidebar.vue';

export default ({
  components: {
    NavbarComponent
  }
})
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

  @import '/src/scss/variables.scss';

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #app {
    height: 100vh;
    background: $white;
    overflow-x: hidden;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .router-view {
    margin-left: $sidebar_wraped_width;
    width: $page_width;
    padding: 2rem 5rem;
  }

  .router-transition-enter-active,
  .router-transition-leave-active {
    transition: 0.2s ease;
  }

  .router-transition-enter-from,
  .router-transition-leave-to {
    opacity: 0;
  }
</style>
