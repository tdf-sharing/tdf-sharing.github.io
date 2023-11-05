import instance from '@/utils/axios_instance';
export const GetUserOrderAPI = (params) => {
  return instance({
    url: '/member/order',
    method: 'GET',
    params
  });
};
export const GetOrderInfoAPI = (id) => {
  return instance({
    url: `/member/order/${id}`,
    method: 'GET'
  });
};
export const CancelOrderAPI = (id) => {
  return instance({
    url: `/member/order/${id}/cancel`,
    method: 'PUT',
    data: {
      cancelReason: ''
    }
  });
};
export const StartOrderShipAPI = (id) => {
  return instance({
    url: `/member/order/consignment/${id}`,
    method: 'GET'
  });
};
export const ConfirmOrderReceivedAPI = (id) => {
  return instance({
    url: `/member/order/${id}/receipt`,
    method: 'PUT'
  });
};
export const DeleteOrderAPI = (ids) => {
  return instance({
    url: `/member/order`,
    method: 'DELETE',
    data: {
      ids
    }
  });
};
