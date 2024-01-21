export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.name === 'payment-success') return true;
  else return navigateTo('payment');
});
