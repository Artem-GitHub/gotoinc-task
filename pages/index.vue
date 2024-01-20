<script setup>
useHead({ title: 'Home' });

function goToPaymentCheckoutPage () {
  return navigateTo('payment');
};
</script>

<template>
  <section class="home">
    <div class="home__main">
      <h1 class="home__title">
        Welcome to the music playback test application
      </h1>

      <p class="home__subtitle">
        This is a test music playback application, with integrated test payment
      </p>
    </div>

    <div class="action">
      <p class="action__message">
        To try, go to test payment
      </p>

      <button
        class="action__button"
        @click="goToPaymentCheckoutPage"
      >
        Payment
      </button>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.home
  display: flex
  flex-direction: column
  align-items: center
  padding: 32px

  &__main
    text-align: center
    margin-top: 120px
    margin-bottom: 60px

  &__title
    font-size: 48px
    color: black
    margin-bottom: 4px

  &__subtitle
    font-size: 28px
    color: #7F7F7F

.action
  display: flex
  flex-direction: column
  align-items: center

  &__message
    font-size: 24px
    color: #7F7F7F
    margin-bottom: 32px

  &__button
    height: 48px
    background: #399AFB
    font-size: 18px
    color: white
    padding: 0 32px
    border-radius: 8px
</style>
