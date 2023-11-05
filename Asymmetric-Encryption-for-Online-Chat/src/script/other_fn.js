function fang_dou(fn, time, args = []) {
  let timer;
  return function (e) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args, e), time);
  };
} //防抖

function jie_liu(fn, time, args = []) {
  let timer;
  return function (e) {
    if (!timer) {
      fn.apply(this, [...args, e]);
      timer = setTimeout(() => (timer = null), time);
    }
  };
} //节流

function long_press_check(e, fn, time = 2000) {
  let timer;
  function active() {
    timer = setTimeout(() => fn(), time);
  }
  function stop() {
    clearTimeout(timer);
  }
  e.addEventListener("mousedown", active);
  e.addEventListener("touchstart", active);
  e.addEventListener("mouseup", stop);
  e.addEventListener("mouseleave", stop);
  e.addEventListener("touchend", stop);
  e.addEventListener("touchleave", stop);
} //检测用户是否长按

function get_index(e) {
  let i = 0;
  while (e.previousElementSibling) {
    e = e.previousElementSibling;
    i++;
  }
  return i;
} //得到当前元素排在兄弟元素中的第几个

export { fang_dou, jie_liu, long_press_check, get_index };
