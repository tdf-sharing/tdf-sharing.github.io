/* [{
    c_name
    Key
    storeornot
    messages[[
        message
        owner
    ]]
}] */

import { encode, decode } from "../third-party/base64.js";

class CHATS {
  constructor(storename) {
    this.data = new Array();
    this.storename = storename;
    this.#load();
  }
  #new_chat(c_name, Key, storeornot) {
    return {
      c_name: c_name,
      Key: Key,
      storeornot: storeornot,
      messages: new Array(),
    };
  }
  #new_message(message, owner) {
    return [message, owner];
  }
  #store() {
    localStorage.setItem(
      this.storename,
      encode(JSON.stringify(this.data.filter((item) => item.storeornot)), true)
    );
  }
  #load() {
    const data = localStorage.getItem(this.storename);
    if (data) {
      this.data = JSON.parse(decode(data));
    }
  }
  create(name_str, Key, storeornot) {
    this.data.push(this.#new_chat(name_str, Key, storeornot));
    this.#store();
  }
  add_mine(index, message) {
    this.data[index].messages.push(this.#new_message(message, 0));
    this.#store();
  }
  add_others(index, message) {
    this.data[index].messages.push(this.#new_message(message, 1));
    this.#store();
  }
  delete_message_by_id(index_c, index_m) {
    this.data[index_c].messages.splice(index_m, 1);
    this.#store();
  }
  delete_chat_by_id(index) {
    this.data.splice(index, 1);
    this.#store();
  }
  get_Key_by_id(index) {
    return this.data[index].Key;
  }
  get_lastm_by_id(index) {
    return this.data[index].messages[this.data[index].messages.length - 1];
  }
  get_messages_by_id(index) {
    return this.data[index].messages;
  }
}

export default CHATS;
