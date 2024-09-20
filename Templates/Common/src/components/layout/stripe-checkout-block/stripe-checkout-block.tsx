import { FC, useEffect, useState } from 'react';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import Stripe from 'stripe';
import { useCartStore } from '../../../store';
import { useCart, usePaymentAPI } from '../../../hooks';
import { OrderStatuses } from '../../../shared/types/types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE!, {
  betas: ['custom_checkout_beta_2'],
});

const StripeCheckoutBlock: FC = () => {
  const location = useLocation();
  const { updateOrder } = usePaymentAPI();
  const { clearCart, orderId } = useCartStore();
  const { getCartTotal } = useCart();
  const [paymentStatus, setPaymentStatus] =
    useState<Stripe.Checkout.Session.Status | null>(null);

  useEffect(() => {
    if (paymentStatus === 'complete') {
      updateOrder.mutate({
        id: orderId || '',
        status: OrderStatuses.Paid,
        totalPrice: [
          {
            price: Number(getCartTotal().replace(',', '.')),
            currency: 'USD',
          },
        ],
      });
      clearCart();
    }
  }, [paymentStatus]);

  const options = {
    clientSecret: `${location.state.clientSecret}`,
  };

  const handleComplete = async () => {
    const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET!);
    const checkoutData = await stripe.checkout.sessions.retrieve(
      `${location.state.sessionId}`
    );

    setPaymentStatus(checkoutData?.status);
  };

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ ...options, onComplete: handleComplete }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default StripeCheckoutBlock;
