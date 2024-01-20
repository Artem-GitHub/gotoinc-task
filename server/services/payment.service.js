import stripe from 'stripe';
const config = useRuntimeConfig();
const SECRET_PAY_API_KEY = config?.VITE_SECRET_PAY_API_KEY;

if (!SECRET_PAY_API_KEY) throw new Error('VITE_SECRET_PAY_API_KEY in .env not found.');

export default class PaymentService {
  #stripe = stripe(SECRET_PAY_API_KEY);

  sessionsCreate (config) {
    return this.#stripe.checkout.sessions.create(config);
  }

  sessionsRetrieve (sessionId) {
    return this.#stripe.checkout.sessions.retrieve(sessionId);
  };
};
