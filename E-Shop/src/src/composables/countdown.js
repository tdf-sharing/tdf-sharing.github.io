import { computed, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
export const UseCountDown = () => {
  let timer = null;
  const time = ref(0);
  const format_time = computed(() => dayjs.unix(time.value).format('mm分ss秒'));
  const start = (initTime) => {
    time.value = initTime < 0 ? 0 : initTime;
    timer = setInterval(() => {
      if (!time.value) {
        clearInterval(timer);
        return;
      }
      time.value--;
    }, 1000);
  };
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    format_time,
    start
  };
};
