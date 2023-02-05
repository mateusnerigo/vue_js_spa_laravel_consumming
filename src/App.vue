<template>
  <Sidebar />

  <transition name="alert-transition">
    <AlertComponent
        v-show="$store.state.alertProps.isActive"
        :alertText="$store.state.alertProps.texts"
        :alertType="$store.state.alertProps.type"
    />
  </transition>

  <transition name="modal-fade" appear>
    <ConfirmModal v-if="$store.state.confirmModalProps.isActive" />
  </transition>

  <transition name="circle-loading-full-page-transition">
    <CircleLoading v-if="$store.state.isLoadingActive" :fullPage="true" />
  </transition>

  <router-view class="router-view" v-slot="{ Component }">
    <Transition name="router-transition" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script>
import AlertComponent from './components/AlertComponent.vue';
import Sidebar from './components/Sidebar.vue';
import CircleLoading from './components/CircleLoading.vue';
import ConfirmModal from './components/ConfirmModal.vue';

export default ({
  components: {
    Sidebar,
    AlertComponent,
    CircleLoading,
    ConfirmModal
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

  .page-container {
    .page-container-header {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      align-items: center;
      justify-content: space-between;

      margin-bottom: 2.5rem;
    }
  }

  input, select, textarea {
    border: none;
    border-bottom: 1px solid $dark_white;
    border-radius: 0.15rem;
    font-size: 0.85rem;
    background-color: white;
    padding: 0.75rem;
  }

  .form-group {
    padding: 1rem 0;

    .form-row {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }

  .mt-2 {
    margin-top: 2rem;
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

    .material-symbols-outlined {
      font-size: 0.9rem
    }
  }

  .router-view {
    margin-left: $sidebar_wraped_width;
    padding: 2rem 3rem;
    width: $page_width;
  }

  .router-transition-enter-active,
  .router-transition-leave-active {
    transition: 0.2s ease;
  }

  .router-transition-enter-from,
  .router-transition-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: 0.2s ease !important;

    #modal-container {
      transition: 0.2s ease !important;
    }
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0 !important;

    #modal-container {
      opacity: 0 !important;
      transform: scale(0.95);
      transform: translateY(-1rem);
    }
  }

  .alert-transition-enter-active,
  .alert-transition-leave-active {
    transition: 0.5s ease-in-out;

    .material-symbols-outlined {
      transition: 0.5s ease-in-out;
    }
  }

  .alert-transition-enter-from,
  .alert-transition-leave-to {
    opacity: 0;

    transform: translateY(-5rem);

    .material-symbols-outlined {
      transform: scale(1.5);
    }
  }

  .circle-loading-full-page-transition-enter-active,
  .circle-loading-full-page-transition-leave-active {
    transition: 1s ease;
  }

  .circle-loading-full-page-transition-enter-from,
  .circle-loading-full-page-transition-leave-to {
    opacity: 0;
  }
</style>
