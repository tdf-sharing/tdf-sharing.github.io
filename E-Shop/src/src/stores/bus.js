import { defineStore } from 'pinia';
export const UseBusStore = defineStore('bus', () => {
  let logintowhere = {
    path: '/'
  };
  const get_towhere = () => {
    const tmp = logintowhere;
    logintowhere = {
      path: '/'
    };
    return tmp;
  };
  const set_towhere = (to) => {
    logintowhere = to;
  };
  return {
    get_towhere,
    set_towhere
  };
});
