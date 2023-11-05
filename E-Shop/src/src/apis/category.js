import instance from '@/utils/axios_instance';
export const GetCategoryListAPI = function () {
  return instance({
    url: '/home/category/head'
  });
};
export const GetSubCategoryListAPI = (id) => {
  return instance({
    url: '/category',
    params: {
      id
    }
  });
};
export const GetSubCategoryInfoAPI = (id) => {
  return instance({
    url: '/category/sub/filter',
    params: {
      id
    }
  });
};
export const GetAllCategoryGoodsAPI = (data) => {
  return instance({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  });
};
