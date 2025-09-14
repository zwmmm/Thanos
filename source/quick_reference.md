# test.js vs a.js 快速参考

## 🚀 快速修改指南

在最开始增加必要的代码

```js
importClass(java.security.SecureRandom);
importClass(java.security.MessageDigest);
importClass(javax.crypto.spec.DESKeySpec);
importClass(javax.crypto.SecretKeyFactory);
importClass(javax.crypto.Cipher);
importClass(java.security.NoSuchAlgorithmException);
importClass(javax.crypto.KeyGenerator);
importClass(javax.crypto.SecretKey);
importClass(javax.crypto.spec.SecretKeySpec);
importClass(javax.crypto.KeyGenerator);
importClass(javax.crypto.spec.IvParameterSpec);
let aes = {};
aes.encrypt = function (text, key, iv) {
  var text = new java.lang.String(text);
  var key = new java.lang.String(key);
  var iv = new java.lang.String(iv);
  var bm = new java.lang.String('UTF-8');
  var input = text.getBytes(bm);
  var md = MessageDigest.getInstance('SHA-256');
  var thedigest = md.digest(key.getBytes('utf-8'));
  var skc = new SecretKeySpec(thedigest, 'AES');
  var cipher = Cipher.getInstance('AES/CBC/PKCS5Padding');
  cipher.init(Cipher.ENCRYPT_MODE, skc, new IvParameterSpec(iv.getBytes()));
  var cipherText = util.java.array('byte', cipher.getOutputSize(input.length));
  var ctLength = cipher.update(input, 0, input.length, cipherText, 0);
  ctLength += cipher.doFinal(cipherText, ctLength);
  var result = android.util.Base64.encodeToString(cipherText, 0).trim();
  return result;
};
aes.decrypt = function (encrypted, key, iv) {
  var key = new java.lang.String(key);
  var iv = new java.lang.String(iv);
  var bm = new java.lang.String('UTF-8');
  var keyb = key.getBytes(bm);
  var md = MessageDigest.getInstance('SHA-256');
  var thedigest = md.digest(keyb);
  var skey = new SecretKeySpec(thedigest, 'AES');
  var dcipher = Cipher.getInstance('AES/CBC/PKCS5Padding');
  dcipher.init(Cipher.DECRYPT_MODE, skey, new IvParameterSpec(iv.getBytes()));
  var clearbyte = dcipher.doFinal(android.util.Base64.decode(encrypted, 0));
  return new java.lang.String(clearbyte);
};
aes.generateIV = function () {
  var random = new SecureRandom();
  var ivBytes = util.java.array('byte', 16);
  random.nextBytes(ivBytes);
  var sb = new java.lang.StringBuilder();
  for (var i = 0; i < ivBytes.length; i++) {
    // 将字节转换为 0-255 范围
    var unsignedByte = ivBytes[i] & 0xff;
    // 映射到 ASCII 可打印字符范围
    var asciiCode = 32 + (unsignedByte % 95); // 95 是可打印字符数量 (126-32+1)
    sb.append(String.fromCharCode(asciiCode));
  }
  return sb.toString();
};
let base64 = $base64;
const mainStorage = storages.create('_wechat');

function getSecureExpiresAt() {
  try {
    const encrypted = mainStorage.get('expires_at_encrypted');
    if (!encrypted) {
      return null;
    }

    // 使用设备ID作为密钥，固定IV
    const key = device.getAndroidId();
    const iv = 'thanos2024iv1234'; // 16字节固定IV

    const decrypted = aes.decrypt(encrypted, key, iv);
    if (decrypted) {
      return parseInt(decrypted);
    }
    return null;
  } catch (error) {
    console.error('AES解密读取失败:', error);
    return null;
  }
}

function canRun() {
  const expires_at = getSecureExpiresAt();
  return mainStorage.get('skeys') && !mainStorage.get('block') && expires_at && expires_at > Date.now();
}

if (!canRun()) {
  files.remove(files.cwd() + '/main.js');
  engines.stopAll();
  exit();
}
```

固定配置改成配置项

```js
use_minimal_floaty_conf: mainStorage.get('minimal', true),
notification_based_control_conf: mainStorage.get('notification', false),
monitored_titles_conf: mainStorage.get('monitored', ''),
nf: false,
random_delay_lower_conf: "20",


```

去掉一些 js 的高级语法

```js
f &&= f.parent(); // f = f && f.parent();
```

去掉 http 鉴权

```js
var f = {
  headers: g,
};
let h = drp_cP(drp_du, f);
if (drp_cG) {
  drp_dj = false;
}
drp_dt = h.statusCode;
return drp_dt === drp_ds();
```

改成

```js
var f = {
  headers: g,
};
if (drp_cG) {
  drp_dj = false;
}
drp_dt = 200;
return true;
```

增加自己的鉴权

```js
if () {}
```

增加自动加载预设

```js
try {
  const preset1 = drp_dI.get('preset_1');
  if (preset1) {
    if (drp_f1(JSON.parse(preset1))) {
      console.info('[预设] 预设配置已自动应用');
    }
  }
} catch (error) {}
```

删掉提示

```js
if (drp_cK) {
  console.error(
    '目前为免费试用版, 功能受到限制，如果觉得好用请重新订阅后再次购买!',
  );
  console.error('在试用期间, 刷新速度的配置选项将无效, 固定为1000ms(1秒)');
  drp_cY = 1000;
} else {
  console.error('您目前使用的是本脚本的付费版, 功能将不会受到限制!');
  console.error('非常感谢您的支持! 目前脚本将全速运行!');
  console.error('有任何问题或功能建议，欢迎您发工单');
}
```

## 🔑 关键参数对照表

| 参数类型     | a.js                       | test.js                                | 修改说明       |
| ------------ | -------------------------- | -------------------------------------- | -------------- |
| **脚本名称** | `"Dr. PopMart"`            | `"灭霸"`                               | 修改 UI 标题   |
| **机器人名** | `"得行波斯猫"`             | `"哈哈哈"`                             | 修改机器人标识 |
| **用户 ID**  | `688744643e902cb80571ee82` | `6EC49C78-CC9A-4FDD-AB79-582E139D6FE2` | 更新用户身份   |
| **时间戳**   | `"2025-09-03 22:07:44"`    | `Date.now()`                           | 动态时间戳     |

## 📝 必须修改的文件位置

### test.js 第 60-110 行 (配置参数)

```javascript
const hamibot = {
  env: {
    // 修改这些参数
    USER_ID: 'C8E0705A-B088-4D9A-B7F3-790C02980AC2',
    ROBOT_ID: 'C8E0705A-B088-4D9A-B7F3-790C02980AC2',
    SCRIPT_ID: 'C8E0705A-B088-4D9A-B7F3-790C02980AC2',
    robotName: 'C8E0705A-B088-4D9A-B7F3-790C02980AC2',
    scriptName: '灭霸',
  },
};
```

### test.js 第 120-140 行 (UI 文本)

```javascript
// 修改窗口标题
text = '你的标题';

// 修改按钮文本
text = '你的按钮文本';
```

修改 icon 图标地址

```
@drawable/ic_launcher => file://./icon.jpeg
```

## ⚠️ 注意事项

1. **不要删除加密模块** - 这是 test.js 的核心功能
2. **保持语法正确** - 每次修改后运行 `node -c test.js`
3. **备份原文件** - 修改前先备份
4. **测试功能** - 在 Hamibot 环境中测试

## 🛠️ 常用修改命令

```bash
# 语法检查
fnm use 14
node -c test.js

# 查找特定文本
grep -n "Dr. PopMart" test.js

# 替换文本
sed -i 's/Dr. PopMart/灭霸/g' test.js
```

## 🔍 快速查找关键词

| 关键词        | 说明           | 文件位置         |
| ------------- | -------------- | ---------------- |
| `Dr. PopMart` | 原版标题       | a.js             |
| `灭霸`        | 修改版标题     | test.js          |
| `得行波斯猫`  | 原版机器人名   | a.js             |
| `哈哈哈`      | 修改版机器人名 | test.js          |
| `importClass` | 加密模块       | test.js 第 1 行  |
| `aes.encrypt` | AES 加密       | test.js 第 12 行 |
