<template>
  <div
    :class="this.alertType"
    class="alert-container"
  >
    <p class="alert-title">{{ $t(this.alertType) }}</p>
    <p>{{ this.alertText }}</p>
  </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        alertType: String,
        alertText: String,
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.alert-container {
  position: absolute;
  top: 2rem;
  width: $alert_width;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: $gray;
  box-shadow: 0 0 10px 5px $shadow_black;
  font-size: 0.95rem;

  .alert-title {
    font-weight: 600;
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }

  &.danger {
    background-color: $dark_red;
    color: $white;
  }

  &.warning {
    background-color: $dark_yellow;
    color: $white;
  }

  &.success {
    background-color: $dark_green;
    color: $white;
  }
}
</style>

