import { fromUint8Array, toUint8Array } from "../third-party/base64.js";

async function generate_Key(curvename) {
  const KeyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: curvename,
    },
    true,
    ["deriveKey"]
  );
  const publicKey = fromUint8Array(
    new Uint8Array(
      await window.crypto.subtle.exportKey("raw", KeyPair.publicKey)
    ),
    true
  );
  return [KeyPair.privateKey, publicKey];
}

async function get_AES_Key(my_privateKey, other_publicKey, curvename) {
  const publicKey = await window.crypto.subtle.importKey(
    "raw",
    toUint8Array(other_publicKey),
    {
      name: "ECDH",
      namedCurve: curvename,
    },
    false,
    []
  );
  const Key = await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: publicKey,
    },
    my_privateKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return fromUint8Array(
    new Uint8Array(await window.crypto.subtle.exportKey("raw", Key))
  );
}

async function encrypt_message(Key, message_decrypted) {
  const key = await window.crypto.subtle.importKey(
    "raw",
    toUint8Array(Key),
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(1));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv, tagLength: 32 },
    key,
    new TextEncoder().encode(message_decrypted)
  );
  const result = new Uint8Array(encrypted.byteLength + 1);
  result.set(new Uint8Array(iv), 0);
  result.set(new Uint8Array(encrypted), 1);
  return fromUint8Array(result, true);
}

async function decrypt_message(Key, message_encrypted) {
  const key = await window.crypto.subtle.importKey(
    "raw",
    toUint8Array(Key),
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
  const data = toUint8Array(message_encrypted);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: data.slice(0, 1), tagLength: 32 },
    key,
    data.slice(1)
  );
  return new TextDecoder().decode(new Uint8Array(decrypted));
}

export { generate_Key, get_AES_Key, encrypt_message, decrypt_message };
