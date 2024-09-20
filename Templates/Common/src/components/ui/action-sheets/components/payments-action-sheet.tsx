import { FC, useState } from 'react';
import Stripe from 'stripe';
import { useNavigate } from 'react-router-dom';
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import ActionSheetRoot from '../action-sheet-root.tsx';
import { Paths, PaymentMethods } from '../../../../shared/types/constants.ts';
import { useMainStore } from '../../../../store/main-store.ts';
import { useCartStore } from '../../../../store/cart-store.ts';
import {
  Button,
  HomeIndicator,
  PaymentItem,
  Typo,
} from '../../../../components';
import { ReactComponent as StripeIcon } from '../../../../assets/icons/Stripe.svg';
import { ReactComponent as Ton } from '../../../../assets/icons/ton.svg';
import { ActionSheetTypes } from '../../../../shared/types/types.ts';

const PaymentsActionSheet: FC = () => {
  const navigate = useNavigate();
  const { closeActionSheet } = useMainStore();
  const { cart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethods>(
    PaymentMethods.STRIPE
  );
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const checkoutCredits = async () => {
    const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET!);
    const cartItems = Array.from(cart.values());

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: cartItems.map(elem => ({
        price_data: {
          currency: elem.currency,
          product_data: {
            name: elem.name,
            images: [elem.image],
            description: `Size: ${elem.size.name},  Color: ${elem.color.name}`,
          },
          unit_amount: Number(elem.price?.toString().replace(',', '.')) * 100,
        },
        quantity: elem.quantity,
      })),
      mode: 'payment',
      redirect_on_completion: 'never',
    });

    navigate(Paths.STRIPE, {
      state: { clientSecret: session.client_secret, sessionId: session.id },
    });
    closeActionSheet(ActionSheetTypes.PAYMENT);
  };

  const handleSelectPayment = (payment: PaymentMethods) => {
    setSelectedPayment(payment);
  };

  const handleProceed = async () => {
    switch (selectedPayment) {
      case PaymentMethods.TON:
        if (!wallet) {
          await tonConnectUI.openModal();
        } else {
          await tonConnectUI.sendTransaction({
            messages: [
              {
                address: import.meta.env.VITE_TON_WALLET_ADDRESS,
                amount: '100000000',
              },
            ],
            validUntil: Date.now() + 10 * 60 * 1000,
          });
        }
        break;
      case PaymentMethods.STRIPE:
        checkoutCredits();
        break;
      default:
        break;
    }
  };

  return (
    <ActionSheetRoot>
      <div className="payment">
        <div className="payment__wrapper">
          <Typo className="payment__title">Choose payment method</Typo>

          {/* <PaymentItem */}
          {/*  icon={<PayPal />} */}
          {/*  selected={selectedPayment === PaymentMethods.PAYPAL} */}
          {/*  onClick={() => handleSelectPayment(PaymentMethods.PAYPAL)} */}
          {/* > */}
          {/*  PayPal */}
          {/* </PaymentItem> */}
          <PaymentItem
            icon={<StripeIcon />}
            selected={selectedPayment === PaymentMethods.STRIPE}
            onClick={() => handleSelectPayment(PaymentMethods.STRIPE)}
          >
            Stripe
          </PaymentItem>

          <PaymentItem
            icon={<Ton />}
            selected={selectedPayment === PaymentMethods.TON}
            onClick={() => handleSelectPayment(PaymentMethods.TON)}
          >
            {wallet?.account.address ? (
              <TonConnectButton className="payment__wallet" />
            ) : (
              'TON'
            )}
          </PaymentItem>
          {/* <PaymentItem */}
          {/*  icon={<Google />} */}
          {/*  selected={selectedPayment === PaymentMethods.GOOGLE} */}
          {/*  onClick={() => handleSelectPayment(PaymentMethods.GOOGLE)} */}
          {/* > */}
          {/*  Google */}
          {/* </PaymentItem> */}

          {/* <Button */}
          {/*  icon={<AddIcon className="fill-black_40" />} */}
          {/*  size="large" */}
          {/*  align="start" */}
          {/*  className="border-dashed border border-grey_100" */}
          {/* > */}
          {/*  <Typo color="black_40">Add payment method</Typo> */}
          {/* </Button> */}
        </div>

        <div className="payment__actions">
          <Button variant="secondary" size="large" onClick={handleProceed}>
            <Typo className="payment__text">Proceed</Typo>
          </Button>

          <HomeIndicator />
        </div>
      </div>
    </ActionSheetRoot>
  );
};

export default PaymentsActionSheet;
