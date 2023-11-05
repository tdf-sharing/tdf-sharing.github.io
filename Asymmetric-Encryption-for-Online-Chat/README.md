# 关于

- 本项目能在现有的即时通讯软件基础上，通过非对称加密算法交换密钥，实现对聊天内容的加密，以保障会话的私密性

### _第三方.JS文件_

- [js-base64](https://github.com/dankogai/js-base64)

### _加密算法_

- ECDH

- AES-GCM

# 指南

第一次使用本网站时，会跳出一份指南，按照指南使用即可。

### _警告_

本项目用于存储聊天数据的 local storage API 通常具有大约5-10MB的存储限制。

超过此限制可能会导致网页崩溃，因此需及时删除无用会话。

# 免责声明

### _不保证绝对安全_

- 为了方便，本项目大幅缩短了加密密钥、验证标签（tag）和初始化向量（IV）的长度

- 本项目使用的 NIST_P-256 曲线被质疑可能存在后门
- 本项目可能存在安全漏洞
- 客户机环境可能不安全
- ……

---

# About

- This project aims to add encryption to online conversations on existing instant messaging software by utilizing asymmetric key exchange

### _Third-Party .JS File_

- [js-base64](https://github.com/dankogai/js-base64)

### _Encryption Algorithms_

- ECDH
- AES-GCM

# Guide

Upon your first use of this website, a basic user manual will appear.

In general, all you need to do is follow the instructions provided.

### _Warning_

The local storage API used by this project to store chat data typically has a storage limit of around 5-10MB.

Exceeding this limit may result in the webpage crashing.

Please make sure to promptly delete any conversations that are no longer needed.

# Disclaimer

### _Absolute security is not guaranteed_

- Taking convenience into account, the project has significantly reduced the length of the encryption key, verification tag, and initialization vector (IV)
- The NIST Curve P-256 which is used by this project has been questioned for potential backdoors
- There may be security vulnerabilities in this project
- The security of terminal devices cannot be guaranteed
- ...
