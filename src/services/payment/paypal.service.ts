import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  private paypalEnvironment():
    | paypal.core.SandboxEnvironment
    | paypal.core.LiveEnvironment {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return process.env.NODE_ENV === 'production'
      ? new paypal.core.LiveEnvironment(clientId, clientSecret)
      : new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }

  private paypalClient(): paypal.core.PayPalHttpClient {
    return new paypal.core.PayPalHttpClient(this.paypalEnvironment());
  }

  async createOrder(
    total: number,
    currency: string,
  ): Promise<paypal.orders.OrdersCreateRequest> {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: total.toFixed(2),
          },
        },
      ],
    });

    try {
      const response = await this.paypalClient().execute(request);
      return response.result;
    } catch (error) {
      throw error;
    }
  }
}
