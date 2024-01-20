<script setup>
useHead({ title: 'Payment success' });

definePageMeta({
  middleware: ['payment-success'],
});

function goToPlayer () {
  return navigateTo('/player');
};
</script>

<template>
  <section class="payment-success">
    <h1 class="payment-success__title">
      Success Page
    </h1>

    <h2 class="payment-success__subtitle">
      Payment is successful
    </h2>

    <button
      class="payment-success__button"
      @click="goToPlayer"
    >
      Open player
    </button>
  </section>
</template>

<style lang="sass" scoped>
.payment-success
  display: flex
  flex-direction: column
  align-items: center
  padding: 32px 0

  &__title
    font-size: 36px
    color: black

  &__subtitle
    font-size: 32px
    color: #3AAFA9
    margin: 120px 0 32px 0

  &__button
    height: 48px
    background: #399AFB
    font-size: 18px
    color: white
    padding: 0 32px
    border-radius: 8px
</style>
