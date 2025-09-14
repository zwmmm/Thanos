'ui';
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
function aes() {}
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
const privatePem = files.read(`private.pem`); // 或直接写成多行字符串
function importPrivateKeyFromPem(pem) {
  const Base64 = android.util.Base64;
  const KeyFactory = java.security.KeyFactory;
  const PKCS8EncodedKeySpec = java.security.spec.PKCS8EncodedKeySpec;

  const base64 = pem.replace(
    /-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,
    '',
  );
  const derBytes = Base64.decode(base64, Base64.DEFAULT);
  const keySpec = new PKCS8EncodedKeySpec(derBytes);
  return KeyFactory.getInstance('RSA').generatePrivate(keySpec);
}
function base64ToBytes(b64) {
  const Base64 = android.util.Base64;
  return Base64.decode(b64, Base64.DEFAULT);
}
function rsaOaepSha256Decrypt(encryptedBytes, privateKey) {
  const Cipher = javax.crypto.Cipher;
  const OAEPParameterSpec = javax.crypto.spec.OAEPParameterSpec;
  const MGF1ParameterSpec = java.security.spec.MGF1ParameterSpec;
  const PSource = javax.crypto.spec.PSource;

  const cipher = Cipher.getInstance('RSA/ECB/OAEPWithSHA-256AndMGF1Padding');
  const oaepParams = new OAEPParameterSpec(
    'SHA-256',
    'MGF1',
    new MGF1ParameterSpec('SHA-256'),
    PSource.PSpecified.DEFAULT,
  );
  cipher.init(Cipher.DECRYPT_MODE, privateKey, oaepParams);
  return cipher.doFinal(encryptedBytes);
}

const homeLayout = `<drawer id="drawer">
  <vertical>
    <appbar id="appbar" w="*">
      <toolbar id="toolbar" w="auto" layout_gravity="center" gravity="center" paddingLeft="50"
        paddingRight="50" marginTop="4" title="灭霸" />
    </appbar>

    <!-- 权限开关区域 -->
    <horizontal marginTop="0" w="auto" layout_gravity="center" gravity="center">
      <Switch id="wzaService" text="无障碍权限" padding="10 10 10 10" textSize="15sp" />
      <Switch id="xfcService" text="悬浮窗权限" padding="10 10 10 10" textSize="15sp" />
    </horizontal>

    <viewpager id="viewpager">
      <frame>
        <ScrollView>
          <!-- 功能按钮 -->
          <vertical padding="10 0 10 0" w="*">
            <horizontal marginTop="15" w="auto" layout_gravity="center">
              <button id="runBtn" margin="6" style="Widget.AppCompat.Button.Colored" text="运行脚本" />
              <button id="closeBtn" margin="6" style="Widget.AppCompat.Button.Colored" text="停止脚本" />
            </horizontal>
            <horizontal marginTop="15" w="auto" layout_gravity="center">
              <Switch id="minimal" text="开启精简模式" />
              <Switch id="notification" text="开启群控" />
            </horizontal>
            <horizontal marginTop="6" w="auto" layout_gravity="center">
              <text id="monitored_title" text="群控群名：" />
              <input id="monitored" hint="请输入" w="200sp" />
            </horizontal>
            <!-- 激活按钮 -->
            <horizontal marginTop="6" w="auto" layout_gravity="center">
              <text id="input_title" text="激活码：" />
              <input id="input" hint="请输入" w="200sp" />
            </horizontal>
            <horizontal marginTop="6" w="auto" layout_gravity="center">
              <button id="save" text="保存" />
              <button id="activation" textColor="red" text="激活" />
            </horizontal>
            <horizontal marginTop="6" w="auto" layout_gravity="center">
              <text id="skeys" text="" textSize="15sp" />
            </horizontal>
            <horizontal marginTop="6" w="auto" layout_gravity="center">
              <text id="expires_at" text="" textSize="15sp" />
            </horizontal>
            <horizontal marginTop="6" w="auto" layout_gravity="center">
              <text text="温馨提示：修改配置后需要点击保存才能生效" color="red" />
            </horizontal>
          </vertical>
        </ScrollView>
      </frame>
    </viewpager>
  </vertical>
</drawer>`;
ui.layout(homeLayout);

let isOpenWza = false;
let isOpenXfc = false;

const storage = storages.create('_wechat');

if (storage.get('block')) {
  files.remove(files.cwd() + '/main.js');
  engines.stopAll();
  exit();
}

// 定义脚本保存路径 - 使用应用内部存储
const SCRIPT_PATH = files.cwd() + '/data/thanos.js';

// 脚本文件管理函数
function deleteScriptFile() {
  try {
    if (files.exists(SCRIPT_PATH)) {
      files.remove(SCRIPT_PATH);
    }
  } catch (error) {
    console.error('删除脚本文件失败:', error);
  }
}

function checkScriptFileExists() {
  return files.exists(SCRIPT_PATH);
}

function ensureScriptFile() {
  if (!checkScriptFileExists()) {
    console.log('脚本文件不存在，需要重新拉取');
    return false;
  }
  return true;
}

// 加密存储管理函数 - 使用AES加密
function setSecureExpiresAt(timestamp) {
  try {
    // 使用设备ID作为密钥，固定IV
    const key = device.getAndroidId();
    const iv = 'thanos2024iv1234'; // 16字节固定IV

    const encrypted = aes.encrypt(String(timestamp), key, iv);
    if (encrypted) {
      storage.put('expires_at_encrypted', encrypted);
      return true;
    }
    return false;
  } catch (error) {
    console.error('时间存储失败:', error);
    return false;
  }
}

function getSecureExpiresAt() {
  try {
    const encrypted = storage.get('expires_at_encrypted');
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

setInterval(function () {
  try {
    // 无障碍权限状态检查
    const isAutoService = !!auto.service;
    ui.wzaService.attr('checked', isAutoService);
    isOpenWza = isAutoService;

    let xfcPermission = floaty.checkPermission();
    ui.xfcService.attr('checked', xfcPermission);
    isOpenXfc = xfcPermission;
  } catch (e) {}
}, 1000);

// 权限开关事件
ui.wzaService.on('click', () => {
  try {
    if (auto.service) {
      auto.service.disableSelf();
    } else {
      app.startActivity({
        action: 'android.settings.ACCESSIBILITY_SETTINGS',
      });
    }
  } catch (e) {}
});

ui.xfcService.on('click', () => {
  try {
    if (!floaty.checkPermission()) {
      floaty.requestPermission();
    }
  } catch (e) {}
});

ui.activation.on('click', () => {
  try {
    const uts = ui.input.text();
    register(uts);
  } catch (e) {}
});

let currentScript = null;

ui.runBtn.on('click', () => {
  try {
    ui.post(() => {
      ui.runBtn.attr('text', '启动中...');
      ui.runBtn.attr('enabled', false);
    });
    const handleFullback = () => {
      ui.post(() => {
        ui.runBtn.attr('text', '运行脚本');
        ui.runBtn.attr('enabled', true);
      });
    };
    if (canRun()) {
      // 检查脚本文件是否存在
      if (!ensureScriptFile()) {
        toast('脚本文件不存在，请重新激活');
        handleFullback();
        return;
      }

      if (currentScript) {
        currentScript.stop();
      }
      currentScript = engines.execScriptFile(SCRIPT_PATH);
    } else {
      toast('请先激活');
    }
    handleFullback();
  } catch (e) {}
});

function closeAll() {
  if (currentScript) {
    currentScript.getEngine().forceStop();
    currentScript = null;
  }
  console.hide();
  floaty.closeAll();
}

ui.closeBtn.on('click', () => {
  closeAll();
});

/**
 * 时间格式化函数
 * @param {number|Date} time - 时间戳或Date对象
 * @param {string} format - 格式字符串，默认为'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(time) {
  const format = 'YYYY-MM-DD HH:mm:ss';
  try {
    // 参数验证
    if (!time) {
      return '';
    }

    // 转换为Date对象
    let date;
    if (typeof time === 'number') {
      date = new Date(time);
    } else if (time instanceof Date) {
      date = time;
    } else {
      return '';
    }

    // 验证日期有效性
    if (isNaN(date.getTime())) {
      return '';
    }

    // 获取时间组件
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 格式化字符串替换
    return format
      .replace(/YYYY/g, year)
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);
  } catch (error) {
    console.error('时间格式化错误:', error);
    return '';
  }
}

function updateUI() {
  ui.run(() => {
    const skeys = storage.get('skeys');
    const expires_at = getSecureExpiresAt();
    ui.activation.attr('enabled', true);

    if (skeys) {
      ui.skeys.text(`激活码：${skeys}`);
      ui.activation.attr('text', '重新激活');
    }
    if (!expires_at) {
    } else if (expires_at < Date.now()) {
      ui.expires_at.text(`已过期：${formatTime(expires_at)}`);
    } else {
      ui.expires_at.text(`过期时间：${formatTime(expires_at)}`);
    }
  });
}

function updateScript() {
  // 只有激活状态才能更新脚本
  if (!canRun()) {
    console.log('未激活状态，跳过脚本更新');
    return;
  }

  var fileString = files.read('./test.js');
  files.createWithDirs(SCRIPT_PATH);
  files.write(SCRIPT_PATH, fileString);
  return;

  try {
    const url = $base64.decode(
      'aHR0cHM6Ly9jb2RlLmp1ZWppbi5jbi9hcGkvcmF3Lzc1NDYxNTA2MDg5NTM2Mzg5NDc/aWQ9NzU0NjE1MDYwODk1MzY4ODA5OQ==',
    );
    let response = http.get(url, {}, (res, err) => {
      if (err) {
        toast('更新脚本失败');
        console.error(err);
        return;
      }
      if (res.statusCode !== 200) {
        toast('更新脚本失败');
        return;
      }
      var fileString = res.body.string();

      // 确保data目录存在
      files.createWithDirs(SCRIPT_PATH);
      files.write(SCRIPT_PATH, fileString);
    });
  } catch (error) {
    toast('更新脚本失败');
    console.error(error);
  }
}
ui.notification.on('check', (checked) => {
  if (checked && !storage.get('notification', false)) {
    app.startActivity({
      action: 'android.settings.APP_NOTIFICATION_SETTINGS',
      extras: {
        'android.provider.extra.APP_PACKAGE': context.getPackageName(),
      },
    });
  }
});
ui.save.on('click', () => {
  storage.put('minimal', ui.minimal.isChecked());
  storage.put('notification', ui.notification.isChecked());
  storage.put('monitored', ui.monitored.text());
  toast('保存成功');
});
ui.monitored.setText(storage.get('monitored', ''));
ui.minimal.checked = storage.get('minimal', true);
ui.notification.checked = storage.get('notification', false);

function init() {
  try {
    // 先检查激活状态，只有激活才创建脚本
    if (canRun()) {
      console.log('检测到有效激活，准备拉取脚本');
      updateScript();
    } else {
      console.log('未激活状态，跳过脚本创建');
      // 确保过期时删除脚本文件
      const expires_at = getSecureExpiresAt();
      if (expires_at && expires_at < Date.now()) {
        deleteScriptFile();
      }
    }
    updateUI();
  } catch (error) {
    console.error(error);
  }
}

init();

// 添加长按复制功能
ui.skeys.on('long_click', () => {
  try {
    const skeys = storage.get('skeys');
    if (!skeys) {
      toast('没有激活码可复制');
      return;
    }

    // 复制激活码到剪贴板
    setClip(skeys);
    toast('激活码已复制到剪贴板');
    console.log('激活码已复制:', skeys);
  } catch (error) {
    console.error('复制激活码失败:', error);
    toast('复制失败');
  }
});

function register(uts) {
  if (!uts) {
    toast('请输入激活码');
    return;
  }
  ui.activation.attr('text', '激活中...');
  ui.activation.attr('enabled', false);

  const userId = device.getAndroidId();
  const url = $base64.decode(
    'aHR0cHM6Ly9hY3RpdmF0aW9uLWNvZGUuc2FueWkuZGVuby5uZXQvcHJvamVjdHMvNWVhMDIyNWYtMTA1Yi00OTE3LTgwZTAtODFmMWI4ODEyZWFiL0UwQUMxOTJDLTdGNzgtNDg1MC1BQjI2LTI0MkY2NzVFQjdFMD91a3M9',
  );
  http.get(
    `${url}${uts}`,
    { headers: { uid: userId } },
    function (response, error) {
      const showError = (msg) => {
        toast(msg || '激活失败');
        ui.post(() => {
          ui.activation.attr('text', '激活');
          ui.activation.attr('enabled', true);
        });
      };
      try {
        if (error) {
          showError();
          console.error(error);
          return;
        }
        if (response && response.statusCode == 200) {
          const encryptedBase64 = response.body.string();
          const privateKey = importPrivateKeyFromPem(privatePem);
          const decryptedBytes = rsaOaepSha256Decrypt(
            base64ToBytes(encryptedBase64),
            privateKey,
          );
          const plaintext = new java.lang.String(
            decryptedBytes,
            java.nio.charset.StandardCharsets.UTF_8,
          );
          const body = JSON.parse(String(plaintext));

          if (body.success && body.data && body.data.expires_at > Date.now()) {
            toast('激活成功！');
            console.log('[激活系统] 激活成功');
            storage.put('skeys', body.data.activation_code);
            setSecureExpiresAt(body.data.expires_at);

            // 激活成功后立即拉取脚本
            console.log('激活成功，开始拉取脚本');
            updateScript();
            updateUI();
          } else {
            showError(body.message);
            console.log('[激活系统] 激活失败', body.message);
          }
        }
      } catch (error) {
        showError();
        console.error(error);
      }
    },
  );
}

function canRun() {
  const expires_at = getSecureExpiresAt();
  return expires_at && expires_at > Date.now() && storage.get('skeys');
}

setInterval(() => {
  if (!canRun()) {
    closeAll();

    // 过期时立即删除脚本文件
    const expires_at = getSecureExpiresAt();
    if (expires_at && expires_at < Date.now()) {
      deleteScriptFile();
      console.log('服务已过期，脚本文件已删除');
    }

    storage.get('skeys')
      ? toast.show('服务到期，请续费')
      : toast.show('请先激活');
  }
}, 1000 * 60 * 60);
