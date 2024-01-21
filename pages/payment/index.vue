<script setup>
useHead({ title: 'Payment' });

const { $stripe } = useNuxtApp();

onMounted(async () => {
  try {
    const { _data: data } = await $fetch.raw('/api/payment/session', { method: 'POST' });
    const { clientSecret } = data;
    const checkout = await $stripe.initEmbeddedCheckout({ clientSecret });

    checkout.mount('#checkout');
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <section class="payment">
    <h1 class="payment__title">
      Checkout Page
    </h1>

    <div class="payment__instruction">
      <p>
        To make a test payment use this card number - <strong>4242 4242 4242 4242</strong>.
      </p>

      <p>
        Date - any date greater than the current one.
      </p>

      <p>
        CSV - any number of 3 digits.
      </p>
    </div>

    <client-only>
      <div
        id="checkout"
        class="payment__form"
      />
    </client-only>
  </section>
</template>

<style lang="sass" scoped>
.payment
  display: flex
  flex-direction: column
  align-items: center

  &__title
    font-size: 36px
    color: black
    margin: 32px 0

  &__instruction
    display: flex
    flex-direction: column
    width: 100%
    max-width: 888px
    font-size: 18px
    row-gap: 8px
    color: #7F7F7F

  &__form
    width: 100%
    margin-top: 32px
</style>
