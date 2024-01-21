import { paymentService } from '@/server/services';
const config = useRuntimeConfig();
const BASE_URL = config.public?.VITE_BASE_URL;
const PRICE_ID = config?.VITE_SECRET_PAY_API_PRICE_ID;
if (!BASE_URL) throw new Error('VITE_BASE_URL in .env not found.');
if (!PRICE_ID) throw new Error('VITE_SECRET_PAY_API_PRICE_ID in .env not found.');

export default defineEventHandler(async event => {
  try {
    const session = await paymentService.sessionsCreate({
      ui_mode: 'embedded',
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    setResponseStatus(event, 201);

    return { clientSecret: session.client_secret };
  } catch (error) {
    return error;
  }
});
