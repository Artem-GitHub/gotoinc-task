export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  const PUBLIC_PAY_API_KEY = config.public.VITE_PUBLIC_PAY_API_KEY;

  if (!PUBLIC_PAY_API_KEY) throw new Error('VITE_PUBLIC_PAY_API_KEY in .env not found.');

  const stripe = Stripe(PUBLIC_PAY_API_KEY);

  nuxtApp.provide('stripe', stripe);
});
