import instance from '@/utils/axios_instance';
export const GetProductInfoAPI = (id) => {
  return instance({
    url: '/goods',
    params: {
      id
    }
  });
};
export const GetProductHotListAPI = ({ id, type, limit = 3 }) => {
  return instance({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  });
};
