import instance from '@/utils/axios_instance';
export const UserLoginAPI = ({ account, password }) => {
  return instance({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  });
};
export const GetUserLikeListAPI = ({ limit = 4 }) => {
  return instance({
    url: '/goods/relevant',
    params: {
      limit
    }
  });
};
