import { useIntersectionObserver } from '@vueuse/core';
export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        el.style.opacity = 0;
        el.style.transition = 'opacity 0.35s';
        el.onload = () => (el.style.opacity = 1);
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value;
            stop();
          }
        });
      }
    });
  }
};
