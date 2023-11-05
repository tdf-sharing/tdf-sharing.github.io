import {
  generate_Key,
  get_AES_Key,
  encrypt_message,
  decrypt_message,
} from "./back-end/crypto.js";
import CHATS from "./back-end/chatdata_class.js";
import { jie_liu, fang_dou, long_press_check, get_index } from "./other_fn.js";

let flag_portrait;

(function () {
  const input = document.querySelector("#input");
  const button = document.querySelector("#button_6");
  const left = document.querySelector("#left");
  const upper = document.querySelector("#upper_2");
  const input_c = (function () {
    let old;
    return function (x) {
      if (old !== x) {
        old = x;
        return true;
      } else {
        return false;
      }
    };
  })(); //检查值是否变动
  setInterval(function () {
    if (input_c(input.offsetWidth - input.clientWidth)) {
      button.style.right = `calc(${
        input.offsetWidth - input.clientWidth
      }px + 1vmin)`;
    } //当输入框出现滚动条时自动将按钮左移，以免按钮挡住滚动条
  });
  const observer = new MutationObserver(
    fang_dou(function () {
      if (left.style.width.includes("px")) {
        left.style.width = `${
          (parseInt(left.style.width, 10) /
            document.querySelector(".container").offsetWidth) *
          100
        }%`;
      } //让左侧栏的宽度保持用户拉伸的比例
      if (upper.style.height.includes("px")) {
        upper.style.height = `${
          (parseInt(upper.style.height, 10) /
            document.querySelector(".right").offsetHeight) *
          100
        }%`;
      } //让右上模块的高度保持用户拉伸的比例
    }, 75)
  );
  observer.observe(left, { attributes: true });
  observer.observe(upper, { attributes: true });
  (function () {
    const button = document.querySelector("#button_5");
    const right = document.querySelector("#right");
    flag_portrait = 0;
    input.onfocus = () => (flag_portrait = 1);
    button.onclick = function () {
      right.style.display = "none";
      left.style.display = "flex";
      flag_portrait = 0;
    };
    window.addEventListener("resize", function () {
      if (
        window.matchMedia("(orientation: portrait)").matches &&
        flag_portrait
      ) {
        left.style.display = "none";
        right.style.display = "flex";
      }
    });
    window.addEventListener("resize", function () {
      if (
        window.matchMedia("(orientation: portrait)").matches &&
        !flag_portrait
      ) {
        left.style.display = "flex";
        right.style.display = "none";
      }
    });
  })(); //决策竖屏状态下应该显示哪一部分
})(); //维持界面

(function () {
  const button_1 = document.querySelector("#button_1");
  const button_2 = document.querySelector("#button_5");
  const button_3 = document.querySelector("#button_6");
  function button_active(e) {
    let flag = 1;
    function add_active(x) {
      if (flag && !x.target.classList.contains("button_active")) {
        x.target.classList.add("button_active");
        flag = 0;
      }
    }
    function remove_active(x) {
      const timer = setInterval(function () {
        if (flag && x.target.classList.contains("button_active")) {
          x.target.classList.remove("button_active");
          flag = 0;
          clearInterval(timer);
        }
      });
    }
    const add = add_active;
    const remove = jie_liu(remove_active, 300);
    e.addEventListener("click", (x) => x.preventDefault());
    e.addEventListener("mousedown", add);
    e.addEventListener("touchstart", add);
    e.addEventListener("mouseup", remove);
    e.addEventListener("mouseleave", remove);
    e.addEventListener("touchend", remove);
    e.addEventListener("touchleave", remove);
    e.addEventListener("transitionend", function () {
      flag = 1;
    });
  }
  button_2.addEventListener("click", (x) => x.preventDefault());
  button_active(button_3);
  button_active(button_1);
})(); //给按钮添加动画

(function () {
  const chats = new CHATS("chatdata");
  let last_id;
  if (!localStorage.getItem("chatdata")) {
    alert(
      "基本使用指南：\n\n1.  点击 + 号按要求创建对话\n2.  输入信息并点击 ↑（快捷键：Ctrl+Enter）\n3.  如果输入框中没有出现密文，则说明密文已经被自动复制到了剪贴板中，可以直接粘贴给对方，相反则需要手动复制\n4.  输入对方发送来的密文并点击 ↑（快捷键：Ctrl+Enter）\n5.  若要删除某个对话或消息请长按它\n\nPs：推荐使用Chrome或Edge浏览器"
    );
  } else {
    chats.data.forEach((x, index) => {
      add_name_list(x.c_name);
      set_name_list(index);
    });
  }
  (function () {
    const left = document.querySelector("#left");
    const button_add = document.querySelector("#button_1");
    const button_next = document.querySelector("#button_4");
    const button_close = document.querySelector("#button_3");
    const button_pre = document.querySelector("#button_2");
    const button_store = document.querySelector("#storeornot");
    const input_1 = document.querySelector("#chat_name");
    const input_2 = document.querySelector("#other_pubkey");
    const addbox = document.querySelector("#add_new_box");
    let privateKey;
    let i = 0;
    input_1.onfocus = () => (flag_portrait = 0);
    input_2.onfocus = () => (flag_portrait = 0);
    function create_new_chat(name, key, checked) {
      chats.create(name, key, checked);
      add_name_list(name);
    } //创建新对话的函数
    function close() {
      addbox.style.display = "none";
      const state = button_store.checked;
      if (input_1.value && input_2.value) {
        get_AES_Key(privateKey, input_2.value, state ? "P-256" : "P-384")
          .then((x) => {
            create_new_chat(input_1.value, x, state);
            document.querySelector("#name_list li:last-child").click();
          })
          .catch(() => {
            alert("交换密钥出错，请重试");
          });
      } else {
        alert("内容输入不全");
      }
      button_store.checked = false;
    } //关闭添加对话框的函数
    button_close.onclick = () => {
      addbox.style.display = "none";
      button_store.checked = false;
    };
    button_next.onclick = function () {
      if (i < 2) {
        document.querySelector(`#add-${i + 1}`).style.display = "none";
        i++;
        document.querySelector(`#add-${i + 1}`).style.display = "flex";
        if (i == 2) {
          input_2.focus();
        }
      } else {
        close();
      }
    };
    button_pre.onclick = function () {
      if (i > 0) {
        document.querySelector(`#add-${i + 1}`).style.display = "none";
        document.querySelector(`#add-${i}`).style.display = "flex";
        i--;
      }
      if (i == 0) {
        input_1.focus();
      }
    };
    function gnkey() {
      const pubkey = document.getElementById("my_pubkey");
      generate_Key(button_store.checked ? "P-256" : "P-384").then((x) => {
        privateKey = x[0];
        pubkey.innerText = x[1];
      });
    }
    button_store.onchange = gnkey;
    button_add.onclick = function () {
      gnkey();
      i = 0;
      input_1.value = "";
      input_2.value = "";
      addbox.style.display = "block";
      left.scrollTop = left.scrollHeight - left.offsetHeight;
      document.querySelector("#add-3").style.display = "none";
      document.querySelector("#add-2").style.display = "none";
      document.querySelector("#add-1").style.display = "flex";
      flag_portrait = 0;
      input_1.focus();
    };
    button_store.onclick = function () {
      if (button_store.checked) {
        alert("此项务必和对方设定一致，否则交换密钥将出错");
      }
    };
  })(); //为添加一个对话做准备，给各个按钮添加好对应的事件响应
  (function () {
    const input = document.querySelector("#input");
    const button = document.querySelector("#button_6");
    async function send_button_fn() {
      const actived_id = get_index(document.querySelector(".name_active"));
      if (input.value) {
        try {
          const x = await decrypt_message(
            chats.get_Key_by_id(actived_id),
            input.value
          );
          chats.add_others(actived_id, x);
          input.value = "";
        } catch {
          const x = await encrypt_message(
            chats.get_Key_by_id(actived_id),
            input.value
          );
          chats.add_mine(actived_id, input.value);
          navigator.clipboard
            .writeText(x)
            .then(() => (input.value = ""))
            .catch(() => (input.value = x));
        }
        show(actived_id);
        set_name_list(actived_id);
      }
    }
    button.addEventListener("click", send_button_fn);
    //为input绑定ctrl+enter事件
    input.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.keyCode == 13) {
        send_button_fn();
      }
    });
  })(); //为发送按钮绑定相应事件

  //------------------------上面为主代码，下面为各种函数------------------------

  function add_name_list(name) /* 渲染对话列表 */ {
    const left = document.querySelector("#left");
    const parent = document.querySelector("#name_list");
    const mask = document.querySelector("#mask");
    const outer = document.createElement("li");
    const line_1 = document.createElement("h1");
    const line_2 = document.createElement("p");
    line_1.classList.add("line_1");
    line_2.classList.add("line_2");
    line_1.innerText = name;
    line_2.innerText = "";
    outer.appendChild(line_1);
    outer.appendChild(line_2);
    outer.onclick = function () {
      const outer_index = get_index(this);
      if (outer_index != last_id) {
        document
          .querySelectorAll("#name_list li")
          .forEach((x) => x.classList.remove("name_active"));
        this.classList.add("name_active");
        mask.style.display = "none";
        document.getElementById("input").value = "";
        show(outer_index);
      }
      flag_portrait = 1;
      if (window.matchMedia("(orientation: portrait)").matches) {
        document.querySelector("#right").style.display = "flex";
        left.style.display = "none";
      }
      document.querySelector("#input").focus();
    }; //点击对话列表的某一项，将其设为选中状态，并渲染对应的对话
    long_press_check(outer, function () {
      if (confirm("是否删除本对话")) {
        chats.delete_chat_by_id(get_index(outer));
        if (last_id === get_index(outer)) {
          document.querySelectorAll("#chat_list li").forEach((x) => x.remove());
          mask.style.display = "block";
          document.querySelector("#input").value = "";
          last_id = -1;
        } else if (last_id > get_index(outer)) {
          last_id--;
        }
        outer.remove();
      }
    }); //添加长按删除功能
    parent.appendChild(outer);
  }
  function set_name_list(index) /* 将最后一条信息填充到对话列表的 */ {
    const x = document.querySelector(
      "#name_list li:nth-child(" + (index + 1) + ")"
    );
    try {
      x.lastChild.innerText = chats.get_lastm_by_id(index)[0];
    } catch {
      x.lastChild.innerText = "";
    }
  }
  function show(index) /* 渲染指定序号的对话内容 */ {
    const parent = document.querySelector("#chat_list");
    const upper = document.querySelector("#upper_2");
    function add_left_chat(text) {
      const outer = document.createElement("li");
      outer.classList.add("the_other");
      outer.innerText = text;
      long_press_check(outer, function () {
        if (confirm("是否删除本条信息")) {
          chats.delete_message_by_id(index, get_index(outer));
          outer.remove();
          set_name_list(index);
        }
      });
      parent.appendChild(outer);
    } //添加左侧的对话，并给这个对话添加长按删除功能
    function add_right_chat(text) {
      const outer = document.createElement("li");
      outer.classList.add("me");
      outer.innerText = text;
      long_press_check(outer, function () {
        if (confirm("是否删除本条信息")) {
          chats.delete_message_by_id(index, get_index(outer));
          outer.remove();
          set_name_list(index);
        }
      });
      parent.appendChild(outer);
    } //添加右侧的对话，并给这个对话添加长按删除功能
    if (last_id === index) {
      const x = chats.get_lastm_by_id(index);
      if (x[1]) {
        add_left_chat(x[0]);
      } else {
        add_right_chat(x[0]);
      }
    } else {
      last_id = index;
      document.querySelectorAll("#chat_list li").forEach((x) => x.remove());
      chats.get_messages_by_id(index).forEach(function (x) {
        if (x[1]) {
          add_left_chat(x[0]);
        } else {
          add_right_chat(x[0]);
        }
      });
    } //判断选中的是否是之前的chat，如果是，直接在后面加一个消息，如果不是，删掉所有消息，重新渲染
    upper.scrollTop = upper.scrollHeight - upper.offsetHeight;
  }
})();
