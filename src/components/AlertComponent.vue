<template>
  <div
    :class="this.alertType"
    class="alert-container"
  >
    <div class="alert-icon">
      <span class="material-symbols-outlined">{{ getAlertIcon }} </span>
    </div>

    <div class="alert-body">
      <p class="alert-title">{{ $t(this.alertType) }}</p>
      <span v-for="(text, index) in this.alertText" :key="`text-${index}`">
        {{ (text.translate === false) ? text.raw : $t(text) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AlertComponent',
    props: {
        alertType: String,
        alertText: Array,
    },
    computed: {
      getAlertIcon() {
        switch (this.alertType ) {
          case 'danger' :
            return 'error';
          case 'warning' :
            return 'warning';
          case 'success' :
            return 'done';
        }
      }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.alert-container {
  position: absolute;
  top: 2rem;
  left: calc($sidebar_wraped_width + 2.5vw);
  width: $alert_width;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: $white;
  box-shadow: 0 0 10px 5px $shadow_black;
  font-size: 0.95rem;
  border-bottom: .35rem solid $black;
  color: $dark_gray;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex: 1 auto;
  z-index: 999;

  .alert-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .material-symbols-outlined {
      font-size: 2.5rem;
      padding-right: 1.5rem;
    }
  }

  .alert-title {
    font-weight: 600;
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }

  &.danger {
    border-bottom: .35rem solid $dark_red;

    .material-symbols-outlined {
      color: $dark_red;
    }
  }

  &.warning {
    border-bottom: .35rem solid $dark_yellow;

    .material-symbols-outlined {
      color: $dark_yellow;
    }
  }

  &.success {
    border-bottom: .35rem solid $dark_green;

    .material-symbols-outlined {
      	color: $dark_green;
    }
  }
}
</style>

