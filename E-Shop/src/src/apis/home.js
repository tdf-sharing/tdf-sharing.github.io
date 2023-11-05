import instance from '@/utils/axios_instance';
export const GetHomeBannerAPI = () => {
  return instance({
    url: '/home/banner'
  });
};
export const GetHomeNewListAPI = () => {
  return instance({
    url: '/home/new'
  });
};
export const GetHomeGoodsListAPI = () => {
  return instance({
    url: '/home/goods'
  });
};
export const GetHomeMoreListAPI = () => {
  return instance({
    url: 'home/hot'
  });
};
