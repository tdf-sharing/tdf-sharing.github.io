import instance from '@/utils/axios_instance';
export const GetCheckInfoAPI = () => {
  return instance({
    url: '/member/order/pre'
  });
};
export const AddCheckAddressAPI = (addr) => {
  return instance({
    url: '/member/address',
    method: 'POST',
    data: addr
  });
};
export const DelCheckAddressAPI = (id) => {
  return instance({
    url: `/member/address/${id}`,
    method: 'DELETE'
  });
};
export const CreatePayOrderAPI = (data) => {
  return instance({
    url: '/member/order',
    method: 'POST',
    data
  });
};
export const GetPayInfoAPI = (id) => {
  return instance({
    url: `/member/order/${id}`
  });
};
export const PayAPI = (orderId) => {
  return instance({
    url: `pay/mock`,
    method: 'GET',
    params: {
      orderId
    }
  });
};
