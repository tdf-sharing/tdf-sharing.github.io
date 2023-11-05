import instance from '@/utils/axios_instance';
export const GetCartListAPI = () => {
  return instance({
    url: '/member/cart'
  });
};
export const AddCartItemAPI = ({ skuId, count }) => {
  return instance({
    url: '/member/cart',
    method: 'post',
    data: {
      skuId,
      count
    }
  });
};
export const ChangeCartItemAPI = ({ skuId, selected, count }) => {
  return instance({
    url: `/member/cart/${skuId}`,
    method: 'PUT',
    data: {
      selected,
      count
    }
  });
};
export const DelCartItemAPI = (ids) => {
  return instance({
    url: `/member/cart`,
    method: 'delete',
    data: {
      ids
    }
  });
};
export const MergeCartAPI = (data) => {
  return instance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  });
};
