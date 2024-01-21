import { paymentService } from '@/server/services';

export default defineEventHandler(async event => {
  const { session_id } = getQuery(event);

  try {
    const session = await paymentService.sessionsRetrieve(session_id);

    return {
      status: session.status,
      customer_email: session.customer_details.email,
    };

  } catch (error) {
    return error;
  }
});
