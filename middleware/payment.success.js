export default defineNuxtRouteMiddleware(async (to, from) => {
  const { session_id } = to.query;

  if (!session_id) return navigateTo('/');

  try {
    const response = await $fetch('/api/payment/session', { query: { session_id } });

    if (response.status === 'open') return navigateTo('payment');
    return true;

  } catch (error) {
    throw error;
  }
});
