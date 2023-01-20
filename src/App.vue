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
  @import '/src/scss/variables.scss';
  @import '/src/scss/fonts.scss';

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;
  }

  #app {
    height: 100vh;
    background: $white;
    overflow-x: hidden;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-family: 'Mountserrat', sans-serif;
  }

  input, select, textarea {
    border: none;
    border-bottom: 1px solid $dark_white;
    border-radius: 0.15rem;
    font-size: 0.85rem;
    background-color: white;
    padding: 0.75rem;
  }

  button {
    border: none;
    padding: 0.25rem;
    margin: 0.15rem;
    border-radius: 0.25rem;
    background-color: $gray;
    color: $white;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: .2s ease-out;

    &:hover {
      filter: brightness(1.1);
    }

    .material-icons {
      font-size: 0.9rem
    }
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
