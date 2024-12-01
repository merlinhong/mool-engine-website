import type { IApiConfig } from "./index";


export default {
  getOrder: {
    url: '/api/order/get',
    type: 'get',
    data: {} as {
      orderId: string;
    }
  },
  createOrder: {
    url: '/api/order/create',
    type: 'post',
    data: {} as {
      productId: string;
      quantity: number;
    }
  }
}  satisfies IApiConfig; 