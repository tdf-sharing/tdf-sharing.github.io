import GoodsItem from './Good-index.vue';
export const componentPlugin = {
  install(app) {
    app.component('GoodsItem', GoodsItem);
  }
};
