export interface payOSRequest {
  planId: string;
  returnUrl: string;
  cancelUrl: string;
}
export interface payOSResponse {
  error: number;
  message: string;
  data: {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    checkoutUrl: string;
    qrCode: string;
  };
}
export interface paypalRequest {
  price: number;
}
