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

const hamibot = {
    env: {
      delivery: "来回刷（到店取）",
      specs_conf: "整盒",
      purchase_count_conf: "2",
      extra_selection_regex_conf: "",
      extra_delay_conf: "0",
      legacy_refresh_conf: false,
      rage_stock_refresh_conf: false,
      delay_conf: "400",
      sku_result_toast_conf: false,
      enable_random_delay_conf: true,
      random_delay_lower_conf: "20",
      random_delay_upper_conf: "100",
      max_refresh_time_conf: "0",
      ack_delay_conf: "0",
      panic_timer_conf: "6",
      ignore_ack_panic_timer_conf: "0",
      shield_breaker_mode_conf: false,
      ignore_ack_conf: false,
      ignore_ack_click_delay_conf: "200",
      special_confirm_delay_conf: "1750",
      auto_click_notification_conf: false,
      special_click_confirm_conf: false,
      click_new_notification_conf: false,
      main_window_alpha_conf: "",
      reset_floaty_position_conf: false,
      vibrate_time_conf: 1000,
      payment_password_conf: "",
      hide_console_conf: false,
      use_legacy_floaty_conf: false,
      use_minimal_floaty_conf: mainStorage.get('minimal', true),
      keep_screen_on_conf: false,
      run_on_boot_conf: false,
      monitor_restock_conf: false,
      notification_based_control_conf: mainStorage.get('notification', false),
      monitored_titles_conf: mainStorage.get('monitored', ''),
      ignore_home_command_conf: false,
      debug_mode_conf: false,
      APP_ENV: "production",
      USER_ID: "6EC49C78-CC9A-4FDD-AB79-582E139D6FE2",
      ROBOT_ID: "6EC49C78-CC9A-4FDD-AB79-582E139D6FE2",
      SCRIPT_ID: "6EC49C78-CC9A-4FDD-AB79-582E139D6FE2",
      TIMESTAMP: Date.now(),
      JWT_TOKEN: "6EC49C78-CC9A-4FDD-AB79-582E139D6FE2"
    },
    plan: {
      name: "单设备极速版",
      onFreeTrial: false,
      model: "flatRate"
    },
    robotName: "哈哈哈",
    scriptName: "灭霸",
    postMessage: function () {},
    exit: function () {
      exit();
    }
  };
  const {
    use_legacy_floaty_conf: drp_bM,
    use_minimal_floaty_conf: drp_bN
  } = hamibot.env;
  var drp_bO;
  var drp_bP;
  var drp_bQ;
  var drp_bR;
  if (drp_bM) {
    drp_bO = floaty.window("\n                <vertical id=\"main_window\" bg=\"#000000\" alpha=\"0.9\" w=\"100\">\n                    <text id=\"title\" text=\"灭霸\" gravity=\"center\" textColor=\"#66ccff\" textStyle=\"bold\" />\n                    <horizontal>\n                        <button id=\"start\" text=\"运行\" bg=\"#00FFFF\" w=\"100\" visibility=\"visible\" />\n                        <button id=\"end\" text=\"停止\" bg=\"#FF0000\" w=\"100\" visibility=\"gone\" />\n                    </horizontal>\n                    <button text=\"\" bg=\"#111111\" w=\"50\" h=\"10\" />\n                    <horizontal>\n                        <button id=\"type_settings\" text=\"方式\" bg=\"#66ccff\" w=\"50\" h=\"40\" />\n                        <button id=\"number_settings\" text=\"数量\" bg=\"#f0ff0f\" w=\"50\" h=\"40\" />\n                    </horizontal>\n                    <button text=\"\" bg=\"#111111\" w=\"50\" h=\"10\" />\n                    <horizontal>\n                        <button id=\"move_start\" text=\"移动\" bg=\"#f0ff0f\" w=\"100\" h=\"40\" visibility=\"visible\" />\n                        <button id=\"move_end\" text=\"固定\" bg=\"#00FFFF\" w=\"100\" h=\"40\" visibility=\"gone\" />\n                    </horizontal>\n                </vertical>\n                ");
  } else if (drp_bN) {
    drp_bP = floaty.rawWindow("<frame>\n                    <img id=\"drag\" src=\"file://./icon.jpeg\" circle=\"true\" tint=\"#66ccff\" bg=\"#00000000\" padding=\"2\" w=\"75\" h=\"75\" />\n                    <text id=\"text_status\" text=\"启动\" textColor=\"#FFFFFF\" textSize=\"14sp\" layout_gravity=\"center\" gravity=\"center\" bg=\"#00000000\" />\n                </frame>");
  } else {
    drp_bQ = floaty.window("<vertical id=\"main_window\" bg=\"#000000\" alpha=\"0.9\" w=\"100\">\n                    <text id=\"title\" text=\"灭霸\" gravity=\"center\" textColor=\"#66ccff\" textStyle=\"bold\" />\n                    <horizontal>\n                        <button id=\"start\" text=\"运行\" bg=\"#00FFFF\" w=\"100\" visibility=\"visible\" />\n                        <button id=\"end\" text=\"停止\" bg=\"#FF0000\" w=\"100\" visibility=\"gone\" />\n                    </horizontal>\n                    <button text=\"\" bg=\"#111111\" w=\"50\" h=\"3\" />\n                    <horizontal>\n                        <button id=\"config_settings\" text=\"配置\" bg=\"#66ccff\" w=\"100\" h=\"40\" />\n                    </horizontal>\n                    <button text=\"\" bg=\"#111111\" w=\"50\" h=\"3\" />\n                    <horizontal>\n                        <button id=\"move_start\" text=\"移动\" bg=\"#f0ff0f\" w=\"100\" h=\"40\" visibility=\"visible\" />\n                        <button id=\"move_end\" text=\"固定\" bg=\"#00FFFF\" w=\"100\" h=\"40\" visibility=\"gone\" />\n                    </horizontal>\n                </vertical>");
  }
  drp_bR = floaty.rawWindow("<vertical id=\"config_main\" bg=\"#000000\" alpha=\"0.95\" padding=\"10\" w=\"1px\" h=\"1px\">\n                <text text=\"⚙️ 临时配置设置\" gravity=\"center\" textColor=\"#66ccff\" textStyle=\"bold\" textSize=\"18\" />\n                <button text=\"关闭\" id=\"close_config\" bg=\"#F44336\" w=\"*\" h=\"40\" margin=\"0 10\" />\n                <button text=\"本地配置预设\" id=\"preset_config\" bg=\"#FFD700\" w=\"*\" h=\"40\" />\n                <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n                <scroll>\n                    <vertical>\n                        <button id=\"delivery_type_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"delivery_number_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"specs_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"extra_selection_regex_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n\n                        <button id=\"refresh_delay_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"legacy_refresh_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"enable_random_delay_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"random_delay_lower_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"random_delay_upper_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"max_refresh_time_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"rage_stock_refresh_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"payment_password_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n\n\n                        <button id=\"extra_delay_config\" text=\"\" bg=\"#2196F3\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"ack_delay_config\" text=\"\" bg=\"#2196F3\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n\n                        <button id=\"ignore_ack_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"special_confirm_delay_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"ignore_ack_click_delay_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"shield_breaker_mode_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"ignore_ack_panic_timer_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"panic_timer_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n                        \n\n                        <button id=\"vibrate_time_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"main_window_alpha_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"auto_click_notification_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"reset_floaty_position_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                    </vertical>\n                </scroll>\n            </vertical>");
  var drp_bS = "Ada lovelace";
  var drp_bT = "See it, say it, sorted.";
  var drp_bU = "King's Cross";
  var drp_bV;
  var drp_bW;
  var drp_bX;
  var drp_bY;
  var drp_bZ;
  var drp_c0;
  var drp_c1;
  var drp_c2 = "Never Settle.";
  var drp_c2 = "lGTW1pMWlUUXVKTWJGZ1Y0aFF2ZllreUdIYnJaL2pJbFYwMFBncmdnUUVYZEJNNjdICkRUYWpqczVUSGJ4eTNIMENCU0pGNVI2WXBTdk9Ed25GeDBOdjN3T2R1TVDMzFQNm2JmeVZadnpRT2JuWGd1V3ptUEVxTE9PZ3lqd05mZWEwQW8zU295S2YxU3FoRW1YQ3ZwZHRDbkJJam9jTUZPNk9QR1VUVGE2Q1AgUT54dH4gRFpIUk9zdU5GTk5vSzluV08hdko4aTFpVFF1Sk1iRmdWNGhRdmZZa3lHSGJyWi9qSWxWMDBQZ3JnZ1FFWGRCTTY3SApEVGFqanM1VEhieHkzSDBDQlNKRjVSNllwU3ZPRHduRngwTnYzd09kdUwvTFlLMXJrN0RB" + drp_c2;
  var drp_c3 = "Happy cracking!";
  var drp_c4 = "Practice makes perfect.";
  drp_c4 = "47cf4380-5bda-40a3-9ab3-74e0cdd5b079";
  function drp_c5(a, b) {
    var a = a + 10000;
    drp_bV = hamibot;
    drp_bW = hamibot;
    drp_bX = drp_bW.exit;
    drp_c0 = exit;
    drp_c1 = exit;
    drp_c2 = "VTNwU1ZVMTZSazVWVlZaRVRYcEdVVTV0Y0RGalJrWnNVVlpPYUdScmJ6Uk5helF5WVdwS05WZFhaRFpWTWtwdFpWWmFZV1J1Y0ZKVU1rcDFWMGRrTVZZemNIUlZSVlo0VkVVNVVGb3piSEZrTURWdFdsZEZkMUZYT0hwVk1qazFVekpaZUZVelJtOVNWekZaVVROYWQxcElVa1JpYTBwS1lXMDVhbFJWV2xCT2F6bFJVakZXVlZaSFJUSlJNVUZuVlZRMU5HUklOR2RTUm5CSlZXczVlbVJWTlVkVWF6VjJVM3BzZFZZd09IaGxSelV4VW0xMFZFd3hXWEpVUm14SFZGY3hjRTFYYkZWVldGWkxWRmRLUjFveFdUQmhSa1l5V214c2NtVlZaRWxaYmtwaFRESndTbUpHV1hkTlJrSnVZMjFrYmxWVlZsbGFSVXBPVG1wa1NVTnJVbFZaVjNCeFkzcFdWVk5IU2pSbFZFNUpUVVZPUTFVd2NFZE9Wa2t5VjFoQ1ZHUnJPVVZrTWpWSFpVUkNUMlJxVGpOVU1sSXhWRU01VFZkVmMzaGpiWE16VWtWRlBRPT0=";
    drp_c4 = "42f93ddc-1c6f-40fc-82d7-5578a4596cd7";
  }
  for (let drp_f9 = 0; drp_f9 < 5; drp_f9++) {
    drp_c5(drp_f9, auto);
  }
  var drp_c6 = drp_bX;
  auto.waitFor();
  console.error("[无障碍] 状态正常");
  function drp_c7() {
    drp_bY = drp_bV.env;
    drp_bZ = drp_bY;
    drp_c2 = "U3pSVU16Rk5VVVZETXpGUU5tcDFjRkZsUVZOaGRrbzRNazQyYWpKNVdXZDZVMkptZVZaYWRucFJUMkp1V0dkMVYzcHRVRVZ4VEU5UFozbHFkMDVtWldFd1FXOHpVMjk1UzJZeFUzRm9SVzFZUTNad1pIUkRia0pKYW05alRVWlBOazlRUjFWVVZHRTJRMUFnVVQ1NGRINGdSRnBJVWs5emRVNUdUazV2U3psdVYwOHhlRzUxUm10VEwxWXJURmxHVFcxcE1XbFVVWFZLVFdKR1oxWTBhRkYyWmxscmVVZElZbkphTDJwSmJGWXdNRkJuY21kblVVVllaRUpOTmpkSUNrUlVZV3BxY3pWVVNHSjRlVE5JTUVOQ1UwcEdOVkkyV1hCVGRrOUVkMjVHZURCT2RqTjNUMlIxVEM5TVdVc3hjbXMzUkVFPQ==";
    drp_c4 = "d2143c10-f1e5-4fe1-8055-0d07a77b63da";
  }
  drp_c7();
  const {
    delivery: drp_c8,
    specs_conf: drp_c9,
    purchase_count_conf: drp_ca,
    type_conf: drp_cb,
    extra_delay_conf: drp_cc,
    delay_conf: drp_cd,
    enable_random_delay_conf: drp_ce,
    random_delay_lower_conf: drp_cf,
    random_delay_upper_conf: drp_cg,
    max_refresh_time_conf: drp_ch,
    auto_click_notification_conf: drp_ci,
    click_new_notification_conf: drp_cj,
    hide_console_conf: drp_ck,
    disable_click: drp_cl,
    ack_delay_conf: drp_cm,
    debug_mode_conf: drp_cn,
    ignore_ack_conf: drp_co,
    main_window_alpha_conf: drp_cp,
    reset_floaty_position_conf: drp_cq,
    ignore_ack_click_delay_conf: drp_cr,
    sku_result_toast_conf: drp_cs,
    rage_stock_refresh_conf: drp_ct,
    vibrate_time_conf: drp_cu,
    special_confirm_delay_conf: drp_cv,
    special_click_confirm_conf: drp_cw,
    extra_selection_regex_conf: drp_cx,
    payment_password_conf: drp_cy,
    shield_breaker_mode_conf: drp_cz,
    panic_timer_conf: drp_cA,
    ignore_ack_panic_timer_conf: drp_cB,
    keep_screen_on_conf: drp_cC,
    run_on_boot_conf: drp_cD,
    notification_based_control_conf: drp_cE,
    monitored_titles_conf: drp_cF,
    legacy_refresh_conf: drp_cG,
    ignore_home_command_conf: drp_cH,
    monitor_restock_conf: drp_cI,
    auto_reduce_purchase_count_conf: drp_cJ
  } = drp_bY;
  const {
    onFreeTrial: drp_cK
  } = drp_bV.plan;
  var drp_cL = drp_cK;
  const drp_cM = new Date(drp_bY.TIMESTAMP);
  const drp_cN = new Date();
  const drp_cO = Math.abs(drp_cN - drp_cM);
  const drp_cP = 60000;
  var drp_bS;
  var drp_bT;
  var drp_bU;
  if (drp_cO > drp_cP) {
    sleep(4000);
    exit();
  } else {
    drp_bS = drp_bV.scriptId;
    drp_bT = drp_bV.scriptName;
    drp_bU = drp_bV.plan.name;
    drp_c4 = "2507cf26-ae50-4db9-8bd7-215be2663501";
  }
  function drp_cQ() {
    drp_bZ = drp_bY.JWT_TOKEN;
    drp_c4 = "57901f92-ae0f-41d1-aabd-8e7a4d3200cd";
    return drp_bZ + drp_bS + drp_bU;
  }
  var drp_cR;
  var drp_cS;
  var drp_cT;
  drp_bZ = drp_bS;
  drp_bZ = drp_bS + drp_bU;
  drp_cR = drp_cQ();
  drp_cS = http;
  drp_cT = http.get;
  drp_c2 = "N0lRcHJuVDdyNXlMZkpId01Ub1RERWZaaGFUNEhXTGtKc2xYRUJYNWFMVkQ0ckpxTUZEdTRNTGV2N3FOcFRWck9HMnBtb2hyV1hWekFBbmxRWFhtSDdmNGFLZjNLZ2RUQ0V6c2A5SnU7OCxQPiQxVz83QT5XLzdmMTJxb2ZaOXd1K280dVliSGxpdnExRWxlY053Qk5YelIwazZRejBrbjdUYS9CMm9SNklZRkNIczlmRkxkUk8wWmlRMG5JK2dnCmYxSzQ4QlZkZUh1MENyd3E3Z1RZdEd4TWxJWU1zZmNqQk1JWU5ySmR1V2hPMy95aVZkdUI=";
  if (!drp_bY.JWT_TOKEN) {
    drp_c1();
  } else {
    drp_c2 = base64.decode(drp_c2);
  }
  if (!drp_ck) {
    console.show();
  }
  var drp_cU = 0;
  var drp_cV = drp_c8 || "到店取";
  var drp_cW = parseInt(drp_ca) || 1;
  var drp_cX = drp_c9 || "单个";
  var drp_cY = parseInt(drp_cd) || 300;
  var drp_cZ = parseInt(drp_cc) || 0;
  var drp_d0 = parseFloat(drp_ch) || 0;
  var drp_d1 = parseInt(drp_cm) || 0;
  var drp_d2 = drp_ci || false;
  var drp_d3 = Math.max(parseInt(drp_cf) || 10, 1);
  var drp_d4 = Math.max(parseInt(drp_cg) || 150, 1);
  var drp_d5 = Math.min(Math.max(parseFloat(drp_cp) || 0.9, 0), 1);
  var drp_d6 = parseInt(drp_cr) || 200;
  var drp_d7 = 0;
  var drp_d8 = 0;
  var drp_d9 = 0;
  var drp_da = Date.now();
  var drp_db = parseInt(drp_cu) || 3000;
  var drp_dc = parseInt(drp_cv) || 1750;
  var drp_dd = drp_cq || false;
  var drp_de = drp_ce || false;
  var drp_df = drp_co || false;
  var drp_dg = drp_bM || false;
  var drp_dh = drp_bN || false;
  var drp_di = drp_cj || false;
  var drp_dj = drp_ct || false;
  var drp_dk = drp_cw || false;
  var drp_dl = drp_cx || "";
  var drp_dm = drp_cy || "";
  var drp_dn = false;
  var drp_do = drp_cz || false;
  var drp_dp = drp_cA || 0;
  var drp_dq = drp_cB || 0;
  var drp_dr = drp_cC || false;
  var drp_ds = drp_cD || false;
  var drp_dt = drp_cE || false;
  var drp_du = drp_cF || "";
  var drp_dv = drp_cG || false;
  var drp_dw = drp_cH || false;
  var drp_dx = drp_cI || false;
  var drp_dy = drp_cJ || false;
  drp_du = drp_du.split(/[,，]/);
  if (drp_dt || drp_dx) {
    try {
      events.observeNotification();
      console.error("[控制] 正在监听微信消息通知");
      if (drp_dt) {
        console.error("[控制] 正在监控的群组: " + drp_du.join(", "));
      }
    } catch (drp_fa) {
      console.error("[控制] 监听微信消息失败，请确认已开启hamibot的通知读取权限");
    }
  }
  if (drp_ds) {
    console.info("[提示] 脚本已设置为开机自启动");
  }
  if (drp_dr) {
    device.keepScreenOn(7200000000);
    console.info("[提示] 屏幕已保持常亮");
  }
  function drp_dz() {
    var b = {
      JldZQ: "Exit button parent not found",
      odvqk: "QOkoi",
      VwVAX: function (d, f) {
        return d === f;
      },
      qDcxj: "xTMPT"
    };
    var c = b;
    if (drp_bZ) {
      if (c.odvqk !== "CxvkI") {
        return 200;
      } else {
        c.main_window.attr("alpha", d);
      }
    } else if (c.VwVAX("ZNLIM", c.qDcxj)) {
      b.log(c.JldZQ);
      return null;
    } else {
      return 1210;
    }
  }
  var drp_dA;
  var drp_dB;
  var drp_dC;
  drp_dC = "Bear";
  drp_dB = drp_dC;
  drp_dB = "https://internal.alibaba.com/verify/2507cf26-ae50-4db9-8bd7-215be2663501/response";
  function drp_dD(b, c, d) {
    let h = b.substring(d, d + 16);
    let j = b.substring(d + 16);
    return aes.decrypt(j, c, h);
  }
  function drp_dE() {
    return "https://internal.alibaba.com/verify/2507cf26-ae50-4db9-8bd7-215be2663501/response";
  }
  function drp_dF() {
    return drp_dD(drp_c2, drp_c4, drp_dz() / 2);
  }
  drp_dC += "er ";
  drp_dB = drp_dF();
  var drp_dG;
  var drp_dH;
  var drp_dI;
  function drp_dJ() {
    try {
      drp_dB = base64.decode(drp_dB);
      let g = {};
      var c = "yRFxy902vYq9Kotiy4bU6LIWIx1TlMc07SKjZNXIeV3wAkXEMhzvwlY9y1ekT6C7dp4rvWSlAnUbAMeFOrXUq87xvFnA4U4ftGg3TRLG0{SV{tEy,:m*PNMHFupL79ugesPUPOHhOw==";
      var d = drp_dD(c, drp_c4, drp_dz() / 2);
      g[d] = drp_dC + drp_bZ;
      var f = {
        headers: g,
      };
      if (drp_cK) {
        drp_dn = false;
      }
      drp_dA = 200;
      return true;
    } catch (j) {}
  }
  var drp_dK = "hamibot.exit();";
  function drp_dL() {
    var d = Math.floor(Math.random() * 100);
    drp_dG = d;
    var f = "hamibot.exit();";
    drp_dG = drp_dA;
    drp_dH = drp_dA;
    drp_dI = drp_dA;
  }
  drp_dL();
  let drp_dM = drp_dJ();
  if (!drp_dM) {
    drp_dz();
    drp_bX();
  } else if (drp_cT) {
    let drp_fb = console;
  }
  var drp_dN = drp_dM;
  console.info("[欢迎使用] 灭霸 v1.0.3");
  
  // 自动加载预设1
  try {
    const preset1 = drp_dP.get('preset_1');
    if (preset1) {
      if (drp_f1(JSON.parse(preset1))) {
        console.info('[预设] 预设配置已自动应用');
      }
    }
  } catch (error) {}
  
  if (drp_dA / 2 != 100) {
    drp_bX();
  }
  if (!drp_dN) {
    drp_c6();
  }
  var drp_dO = drp_dN;
  if (drp_dg) {
    var drp_dP = storages.create("DRP");
    var drp_dQ = drp_bO;
    drp_dQ.main_window.attr("alpha", drp_d5);
    function drp_fc() {
      drp_cU = 1;
      drp_dQ.end.attr("visibility", "visible");
      drp_dQ.start.attr("visibility", "gone");
    }
    function drp_fd() {
      drp_cU = 0;
      drp_dQ.end.attr("visibility", "gone");
      drp_dQ.start.attr("visibility", "visible");
    }
    drp_dQ.start.click(function () {
      drp_fc();
      console.error("[状态] 辅助脚本启动");
      if (!drp_dn) {
        console.log("[提示] 如果脚本没反应，请重启hamibot和微信");
        drp_dn = true;
        if (!drp_dN) {
          drp_c6();
        }
      }
    });
    drp_dQ.end.click(function () {
      drp_fd();
      console.error("[状态] 辅助脚本停止");
    });
    drp_dQ.move_start.click(function () {
      drp_dQ.setAdjustEnabled(true);
      drp_dQ.move_start.attr("visibility", "gone");
      drp_dQ.move_end.attr("visibility", "visible");
    });
    drp_dQ.move_end.click(function () {
      drp_dQ.setAdjustEnabled(false);
      drp_dQ.move_start.attr("visibility", "visible");
      drp_dQ.move_end.attr("visibility", "gone");
      var d = drp_dQ.getX();
      var f = drp_dQ.getY();
      drp_dP.put("floaty_position_x", d);
      drp_dP.put("floaty_position_y", f);
      console.warn("[提示] 悬浮窗位置已记录");
    });
    drp_dQ.type_settings.click(function () {
      'ui';
  
      const d = ["送到家", "到店取", "来回刷", "来回刷（到店取）", "来回刷（送到家）"];
      var f = d.indexOf(drp_cV);
      dialogs.singleChoice("请选择配送方案", d, f).then(g => {
        switch (g) {
          case 0:
            drp_cV = "送到家";
            break;
          case 1:
            drp_cV = "到店取";
            break;
          case 2:
            drp_cV = "来回刷";
            break;
          case 3:
            drp_cV = "来回刷（到店取）";
            break;
          case 4:
            drp_cV = "来回刷（送到家）";
            break;
        }
        console.info("目前的购买方案为: ", drp_cV);
        console.info("如果已在运行状态，请停止后重新运行");
      });
    });
    drp_dQ.number_settings.click(function () {
      'ui';
  
      const b = ["1", "2", "手动输入"];
      dialogs.singleChoice("请选择购买数量", b).then(c => {
        if (c === 2) {
          dialogs.rawInput("请输入购买数量", drp_cW).then(f => {
            if (parseInt(f) > 0) {
              drp_cW = parseInt(f);
              console.info("目前的购买数量为: ", drp_cW);
              console.info("如果已在运行状态，请停止后重新运行");
            } else {
              console.info("请输入正整数, [", f, "]不符合规范");
            }
          });
        } else {
          drp_cW = c + 1;
          console.info("目前的购买数量为: ", drp_cW);
          console.info("如果已在运行状态，请停止后重新运行");
        }
      });
    });
    var drp_dR = drp_dP.get("floaty_position_x");
    var drp_dS = drp_dP.get("floaty_position_y");
    var drp_dT = device.width / 2 + 100;
    var drp_dU = drp_dQ.getY() + 100;
    if (drp_ds) {
      ui.post(() => {
        drp_fc();
      });
    }
    if (typeof drp_dR === "number" && typeof drp_dS === "number" && drp_dR >= 0 && drp_dR + 100 <= device.width) {
      console.warn("[提示] 悬浮窗位置已读取");
      drp_dQ.setPosition(drp_dR, drp_dS);
    } else {
      drp_dQ.setPosition(drp_dT, drp_dU);
    }
  } else {
    var drp_dP = storages.create("DRP");
    if (drp_dh) {
      var drp_dQ = drp_bP;
      drp_dQ.setTouchable(true);
      var drp_cU = 0;
      let drp_ft;
      let drp_fu;
      let drp_fv;
      let drp_fw;
      let drp_fx = 0;
      const drp_fy = 200;
      const drp_fz = 600;
      const drp_fA = 10;
      let drp_fB;
      let drp_fC = false;
      drp_dQ.drag.setOnTouchListener(function (a, b) {
        var c = {
          mVEgf: function (d, f) {
            return d(f);
          },
          mcLqM: function (d) {
            return d();
          },
          tOzxV: "last_child_of_child_of_linear_layout not found",
          SFiKV: function (d, f) {
            return d + f;
          },
          TzkJy: function (d, f) {
            return d + f;
          },
          vGqrZ: function (d, f) {
            return d > f;
          }
        };
        switch (b.getAction()) {
          case b.ACTION_DOWN:
            drp_ft = b.getRawX();
            drp_fu = b.getRawY();
            drp_fv = drp_dQ.getX();
            drp_fw = drp_dQ.getY();
            drp_fx = new Date().getTime();
            drp_fB = setTimeout(() => {
              drp_fC = true;
              c.mcLqM(drp_fD);
            }, drp_fz);
            return true;
          case b.ACTION_MOVE:
            let d = b.getRawX() - drp_ft;
            let f = b.getRawY() - drp_fu;
            drp_dQ.setPosition(c.SFiKV(drp_fv, d), c.TzkJy(drp_fw, f));
            if (Math.abs(d) > drp_fA || c.vGqrZ(Math.abs(f), drp_fA)) {
              clearTimeout(drp_fB);
              drp_fC = false;
            }
            return true;
          case b.ACTION_UP:
            let g = new Date().getTime();
            if (g - drp_fx < drp_fy) {
              drp_fE();
              drp_fC = false;
              clearTimeout(drp_fB);
            }
            return true;
        }
        return false;
      });
      function drp_fD() {
        try {
          if (!drp_dV) {
            drp_dV = drp_fo();
            var b = String(device.width * 0.8) + "px";
            var c = String(device.height * 0.8) + "px";
            drp_dV.config_main.attr("w", b);
            drp_dV.config_main.attr("h", c);
            sleep(500);
          }
          drp_fr();
        } catch (f) {
          log("Error in config button click: " + f);
        }
      }
      function drp_fE() {
        if (drp_cU == 1) {
          console.error("[状态] 辅助脚本停止");
          drp_dQ.text_status.setText("启动");
          try {
            drp_dQ.drag.attr("tint", "#66ccff");
          } catch (g) {
            console.error("Failed to set image tint:", g);
          }
          drp_cU = 0;
        } else {
          console.error("[状态] 辅助脚本启动");
          if (!drp_dn) {
            console.log("[提示] 如果脚本没反应，请重启hamibot和微信");
            drp_dn = true;
          }
          drp_dQ.text_status.setText("停止");
          try {
            drp_dQ.drag.attr("tint", "#FF4444");
          } catch (h) {
            console.error("Failed to set image tint:", h);
          }
          drp_cU = 1;
        }
      }
      if (drp_ds) {
        ui.post(() => {
          drp_fE();
        });
      }
    } else {
      var drp_dQ = drp_bQ;
      drp_dQ.main_window.attr("alpha", drp_d5);
      function drp_fF() {
        drp_cU = 1;
        drp_dQ.end.attr("visibility", "visible");
        drp_dQ.start.attr("visibility", "gone");
      }
      if (drp_ds) {
        ui.post(() => {
          drp_fF();
        });
      }
      function drp_fG() {
        drp_cU = 0;
        drp_dQ.end.attr("visibility", "gone");
        drp_dQ.start.attr("visibility", "visible");
      }
      drp_dQ.start.click(function () {
        drp_fF();
        console.error("[状态] 辅助脚本启动");
        if (!drp_dn) {
          console.log("[提示] 如果脚本没反应，请重启hamibot和微信");
          drp_dn = true;
        }
      });
      drp_dQ.end.click(function () {
        drp_fG();
        console.error("[状态] 辅助脚本停止");
      });
      drp_dQ.move_start.click(function () {
        drp_dQ.setAdjustEnabled(true);
        drp_dQ.move_start.attr("visibility", "gone");
        drp_dQ.move_end.attr("visibility", "visible");
      });
      drp_dQ.move_end.click(function () {
        drp_dQ.setAdjustEnabled(false);
        drp_dQ.move_start.attr("visibility", "visible");
        drp_dQ.move_end.attr("visibility", "gone");
        var d = drp_dQ.getX();
        var f = drp_dQ.getY();
        drp_dP.put("floaty_position_x", d);
        drp_dP.put("floaty_position_y", f);
        console.warn("[提示] 悬浮窗位置已记录");
      });
    }
    var drp_dV = null;
    var drp_dW = false;
    function drp_fe() {
      var b = {
        purchase_type: drp_cV,
        purchase_count: drp_cW,
        specs: drp_cX,
        refresh_delay: drp_cY,
        enable_random_delay: drp_de,
        extra_delay: drp_cZ,
        ack_delay: drp_d1,
        ignore_ack: drp_df,
        special_confirm_delay: drp_dc,
        ignore_ack_click_delay: drp_d6,
        random_refresh_delay_lower: drp_d3,
        random_refresh_delay_upper: drp_d4,
        max_refresh_time: drp_d0,
        rage_stock_refresh: drp_dj,
        legacy_refresh: drp_dv,
        vibrate_time: drp_db,
        main_window_alpha: drp_d5,
        auto_click_notification: drp_d2,
        reset_floaty_position: drp_dd,
        extra_selection_regex: drp_dl,
        payment_password: drp_dm,
        shield_breaker_mode: drp_do,
        panic_timer: drp_dp
      };
      return b;
    }
    function drp_ff(b) {
      var c = {
        XjiTK: function (f, g) {
          return f !== g;
        },
        geAJk: function (f, g) {
          return f === g;
        },
        IRXYm: "LOPev"
      };
      var d = c;
      drp_cV = b.purchase_type;
      drp_cW = b.purchase_count;
      drp_cX = b.specs;
      drp_cY = b.refresh_delay;
      drp_de = b.enable_random_delay;
      drp_cZ = b.extra_delay;
      drp_d1 = b.ack_delay;
      drp_df = b.ignore_ack;
      drp_dc = b.special_confirm_delay;
      drp_d6 = b.ignore_ack_click_delay;
      drp_d3 = b.random_refresh_delay_lower;
      drp_d4 = b.random_refresh_delay_upper;
      drp_d0 = b.max_refresh_time;
      drp_dj = b.rage_stock_refresh;
      drp_dv = b.legacy_refresh !== undefined ? b.legacy_refresh : false;
      drp_db = b.vibrate_time;
      drp_d5 = b.main_window_alpha;
      drp_d2 = b.auto_click_notification;
      drp_dd = b.reset_floaty_position;
      drp_dl = d.XjiTK(b.extra_selection_regex, undefined) ? b.extra_selection_regex : "";
      drp_dm = b.payment_password !== undefined ? b.payment_password : "";
      drp_do = d.XjiTK(b.shield_breaker_mode, undefined) ? b.shield_breaker_mode : false;
      drp_dp = b.panic_timer !== undefined ? b.panic_timer : 0;
      if (drp_dQ && drp_dQ.main_window) {
        if (d.geAJk(d.IRXYm, "tgeaP")) {
          c(d);
        } else {
          drp_dQ.main_window.attr("alpha", drp_d5);
        }
      }
    }
    function drp_fg(a) {
      var c = drp_fe();
      var d = drp_fj(a);
      drp_dP.put("preset_" + a, JSON.stringify(c));
      console.info("📁 配置已保存到 " + d + " (槽位 " + a + ")");
      toast("配置已保存到 " + d);
    }
    function drp_fh(a) {
      var c = drp_dP.get("preset_" + a);
      if (c) {
        try {
          var h = JSON.parse(c);
          var g = drp_fj(a);
          drp_ff(h);
          drp_fs();
          console.info("📁 配置已从 " + g + " (槽位 " + a + ") 加载");
          toast("配置已从 " + g + " 加载");
          return true;
        } catch (l) {
          console.error("加载预设失败: " + l);
          toast("加载预设失败");
          return false;
        }
      }
      return false;
    }
    function drp_fi(b) {
      var f = drp_dP.get("preset_" + b);
      return f && f.length > 0;
    }
    function drp_fj(b) {
      var f = drp_dP.get("preset_name_" + b);
      return f || "预设 " + b;
    }
    function drp_fk(b, c) {
      if (c && c.trim().length > 0) {
        drp_dP.put("preset_name_" + b, c.trim());
      } else {
        drp_dP.remove("preset_name_" + b);
      }
    }
    function drp_fl(a) {
      var f = drp_fj(a);
      drp_dP.remove("preset_" + a);
      drp_dP.remove("preset_name_" + a);
      console.info("🗑️ 已删除预设: " + f + " (槽位 " + a + ")");
      toast("已删除预设: " + f);
    }
    function drp_fm() {
      drp_fq();
      var b = [];
      for (var c = 1; c <= 5; c++) {
        var g = drp_fi(c);
        var h = drp_fj(c);
        var j = g ? " ✓" : " (空)";
        var k = g ? "📁" : "📂";
        b.push(k + " " + h + j);
      }
      b.push("🔙 返回配置");
      dialogs.select("选择预设槽位", b).then(l => {
        if (l === -1) {
          drp_fp();
          return;
        }
        if (l === 5) {
          drp_fp();
          return;
        }
        var m = l + 1;
        drp_fn(m);
      });
    }
    function drp_fn(a) {
      var c = drp_fi(a);
      var d = drp_fj(a);
      var f = [];
      f.push("💾 保存当前配置");
      f.push("✏️ 重命名预设");
      if (c) {
        f.push("📂 加载此预设");
        f.push("🗑️ 删除此预设");
      }
      f.push("🔙 返回预设列表");
      var g = d + (c ? " ✓" : " (空)");
      dialogs.select(g, f).then(j => {
        if (j === -1) {
          drp_fm();
          return;
        }
        var l = f[j];
        if (l === "💾 保存当前配置") {
          dialogs.confirm("确认保存", "确定要将当前配置保存到 " + d + " 吗？" + (c ? "\n\n⚠️ 这将覆盖现有配置" : "")).then(p => {
            if (p) {
              drp_fg(a);
            }
            drp_fp();
          });
        } else if (l === "📂 加载此预设") {
          dialogs.confirm("确认加载", "确定要加载 " + d + " 的配置吗？\n\n⚠️ 当前配置将被覆盖").then(p => {
            if (p) {
              drp_fh(a);
            }
            drp_fp();
          });
        } else if (l === "✏️ 重命名预设") {
          var m = drp_fj(a);
          var n = "预设 " + a;
          var o = m === n ? "" : m;
          dialogs.rawInput("重命名预设（留空恢复默认）", o, "").then(p => {
            if (p !== null) {
              drp_fk(a, p);
              var q = p && p.trim().length > 0 ? p.trim() : n;
              console.info("📝 预设 " + a + " 已重命名为: " + q);
              toast("预设已重命名为: " + q);
            }
            drp_fn(a);
          });
        } else if (l === "🗑️ 删除此预设") {
          dialogs.confirm("确认删除", "确定要删除 " + d + " 吗？\n\n⚠️ 此操作不可恢复").then(p => {
            if (p) {
              drp_fl(a);
            }
            drp_fm();
          });
        } else {
          drp_fm();
        }
      });
    }
    function drp_fo() {
      try {
        drp_dV = drp_bR;
        if (!drp_dV) {
          return;
        }
        drp_dV.setPosition(-10000, -10000);
        drp_dV.setTouchable(false);
        drp_dW = false;
      } catch (c) {
        log("Error creating config window: " + c);
        drp_dV = null;
        return;
      }
      drp_dV.ignore_ack_config.click(function () {
        drp_df = !drp_df;
        console.info("🚫 特殊刷回流模式已设置为: ", drp_df ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.delivery_type_config.click(function () {
        drp_fq();
        dialogs.select("请选择配送方案", ["送到家", "到店取", "来回刷", "来回刷（到店取）", "来回刷（送到家）"]).then(f => {
          if (f !== -1) {
            switch (f) {
              case 0:
                drp_cV = "送到家";
                break;
              case 1:
                drp_cV = "到店取";
                break;
              case 2:
                drp_cV = "来回刷";
                break;
              case 3:
                drp_cV = "来回刷（到店取）";
                break;
              case 4:
                drp_cV = "来回刷（送到家）";
                break;
            }
            console.info("配送方案已设置为: ", drp_cV);
            drp_fs();
          }
          drp_fp();
        });
      });
      drp_dV.delivery_number_config.click(function () {
        drp_fq();
        const d = ["1", "2", "手动输入"];
        dialogs.singleChoice("请选择购买数量", d).then(f => {
          if (f === 2) {
            dialogs.rawInput("请输入购买数量", drp_cW).then(h => {
              if (parseInt(h) > 0) {
                drp_cW = parseInt(h);
                console.info("购买数量已设置为: ", drp_cW);
                drp_fs();
              } else {
                console.info("请输入正整数, [", h, "]不符合规范");
              }
              drp_fp();
            });
          } else {
            drp_cW = f + 1;
            console.info("购买数量已设置为: ", drp_cW);
            drp_fs();
            drp_fp();
          }
        });
      });
      drp_dV.specs_config.click(function () {
        drp_fq();
        dialogs.select("请选择规格", ["单个", "整盒"]).then(g => {
          if (g !== -1) {
            drp_cX = g === 0 ? "单个" : "整盒";
            console.info("规格已设置为: ", drp_cX);
            drp_fs();
          }
          drp_fp();
        });
      });
      drp_dV.refresh_delay_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入库存刷新延迟 (毫秒)", drp_cY).then(f => {
          var g = parseInt(f);
          if (g >= 0) {
            if (drp_cK) {
              drp_cY = 1000;
              console.log("🚫 试用期不支持修改库存刷新延迟");
            } else {
              drp_cY = g;
              console.info("⏱️ 库存刷新延迟已设置为: ", drp_cY + "ms");
            }
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.enable_random_delay_config.click(function () {
        drp_de = !drp_de;
        console.info("🎲 启用额外随机库存刷新间隔已设置为: ", drp_de ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.extra_delay_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入主动操作延迟 (毫秒)", drp_cZ).then(d => {
          var f = parseInt(d);
          if (f >= 0) {
            drp_cZ = f;
            console.info("主动操作延迟已设置为: ", drp_cZ + "ms");
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.ack_delay_config.click(function () {
        var d = {
          UUTyK: function (g, h) {
            return g !== h;
          },
          WkZvb: "✅ 点击[我知道了]后等待的延迟已设置为: "
        };
        var f = d;
        drp_fq();
        dialogs.rawInput("请输入点击[我知道了]后等待的延迟 (毫秒)", drp_d1).then(g => {
          var h = parseInt(g);
          if (h >= 0) {
            if (f.UUTyK("nVrnS", "wUoXc")) {
              drp_d1 = h;
              console.info(f.WkZvb, drp_d1 + "ms");
              drp_fs();
            } else {
              c.error("Failed to set image tint:", d);
            }
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.special_confirm_delay_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入特殊刷回流点击确认延迟 (毫秒)", drp_dc).then(d => {
          var f = parseInt(d);
          if (f >= 0) {
            drp_dc = f;
            console.info("⭐ 特殊刷回流点击确认延迟已设置为: ", drp_dc + "ms");
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.ignore_ack_click_delay_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入特殊刷回流点击延迟 (毫秒)", drp_d6).then(d => {
          var f = parseInt(d);
          if (f >= 0) {
            drp_d6 = f;
            console.info("⏰ 特殊刷回流点击延迟已设置为: ", drp_d6 + "ms");
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.random_delay_lower_config.click(function () {
        var d = {
          XpyAh: function (f, g) {
            return f(g);
          },
          tftOa: "KYvoK",
          JakPn: function (f, g) {
            return f === g;
          },
          MCANF: "blTpJ",
          MvnWj: "dIJpn"
        };
        drp_fq();
        dialogs.rawInput("请输入随机延迟下限 (毫秒)", drp_d3).then(f => {
          if (d.tftOa === "KYvoK") {
            var g = d.XpyAh(parseInt, f);
            if (g >= 1) {
              if (d.JakPn(d.MCANF, d.MvnWj)) {
                b();
              } else {
                drp_d3 = g;
                console.info("⬇️ 随机延迟下限已设置为: ", drp_d3 + "ms");
                drp_fs();
              }
            } else {
              console.info("请输入大于0的整数");
            }
            drp_fp();
          } else {
            var k = c.findOne(d.XpyAh(d, "我知道了").algorithm("DFS"));
          }
        });
      });
      drp_dV.random_delay_upper_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入随机延迟上限 (毫秒)", drp_d4).then(d => {
          var f = parseInt(d);
          if (f >= 1) {
            drp_d4 = f;
            console.info("⬆️ 随机延迟上限已设置为: ", drp_d4 + "ms");
            drp_fs();
          } else {
            console.info("请输入大于0的整数");
          }
          drp_fp();
        });
      });
      drp_dV.max_refresh_time_config.click(function () {
        var d = {
          mDElf: function (f, g) {
            return f + g;
          },
          olRTw: "最大刷新时间已设置为: ",
          DQAab: function (f, g) {
            return f + g;
          },
          DzXEY: "EZrhA",
          tOzDa: "请输入非负数"
        };
        drp_fq();
        dialogs.rawInput("请输入最大刷新时间 (分钟)", drp_d0).then(f => {
          var g = {
            rrBpr: function (j, k) {
              return d.mDElf(j, k);
            }
          };
          var h = parseFloat(f);
          if (h >= 0) {
            drp_d0 = h;
            console.info(d.olRTw, d.DQAab(drp_d0, "分钟"));
            drp_fs();
          } else if (d.DzXEY === "LRpCX") {
            c.remove(g.rrBpr("preset_name_", d));
          } else {
            console.info(d.tOzDa);
          }
          drp_fp();
        });
      });
      drp_dV.rage_stock_refresh_config.click(function () {
        drp_dj = !drp_dj;
        console.info("⚡ 狂暴库存刷新模式已设置为: ", drp_dj ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.legacy_refresh_config.click(function () {
        drp_dv = !drp_dv;
        console.info("🔄 上下刷新模式已设置为: ", drp_dv ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.vibrate_time_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入抢购成功振动时长 (毫秒)", drp_db).then(f => {
          var g = parseInt(f);
          if (g >= 0) {
            drp_db = g;
            console.info("抢购成功振动时长已设置为: ", drp_db + "ms");
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.main_window_alpha_config.click(function () {
        var d = {
          PfaHX: function (f, g) {
            return f(g);
          },
          Kittb: function (f, g) {
            return f <= g;
          },
          APJbj: "alpha",
          vLuvj: "🔍 窗口透明度已设置为: ",
          dPRlZ: function (f) {
            return f();
          }
        };
        drp_fq();
        dialogs.rawInput("请输入窗口透明度 (0.0-1.0)", drp_d5).then(f => {
          var g = d.PfaHX(parseFloat, f);
          if (g >= 0 && d.Kittb(g, 1)) {
            drp_d5 = g;
            drp_dQ.main_window.attr(d.APJbj, drp_d5);
            console.info(d.vLuvj, drp_d5);
            d.dPRlZ(drp_fs);
          } else {
            console.info("请输入0.0到1.0之间的数值");
          }
          drp_fp();
        });
      });
      drp_dV.auto_click_notification_config.click(function () {
        drp_d2 = !drp_d2;
        console.info("🔔 自动点击到货通知已设置为: ", drp_d2 ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.reset_floaty_position_config.click(function () {
        drp_dd = !drp_dd;
        console.info("🔄 重置悬浮窗位置已设置为: ", drp_dd ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.extra_selection_regex_config.click(function () {
        var d = {
          OQEAs: function (f, g) {
            return f !== g;
          },
          uZfkH: "dnWYJ"
        };
        drp_fq();
        dialogs.rawInput("请输入额外选择规则 (支持 | 或 ｜ 分隔，如: A组|7.29｜黑)", drp_dl || "").then(f => {
          if (d.OQEAs(f, null)) {
            if (d.uZfkH === "dnWYJ") {
              drp_dl = f.trim();
              if (drp_dl.length > 0) {
                console.info("🔤 额外选择规则已设置为: ", drp_dl);
              } else {
                console.info("🔤 额外选择规则已清空");
              }
              drp_fs();
            } else {
              d.setPosition(-10000, -10000);
              f.setTouchable(false);
              g = false;
            }
          }
          drp_fp();
        });
      });
      drp_dV.shield_breaker_mode_config.click(function () {
        drp_do = !drp_do;
        console.info("🛡️ 破盾模式已设置为: ", drp_do ? "开启" : "关闭");
        drp_fs();
      });
      drp_dV.ignore_ack_panic_timer_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入自动关闭特殊刷回流时间 (秒，0表示关闭)", drp_dq).then(g => {
          var h = parseInt(g);
          if (h >= 0) {
            drp_dq = h;
            if (drp_dq > 0) {
              console.info("⏰ 自动关闭特殊刷回流时间已设置为: ", drp_dq + "秒");
            } else {
              console.info("⏰ 自动关闭特殊刷回流已关闭");
            }
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.panic_timer_config.click(function () {
        drp_fq();
        dialogs.rawInput("请输入自动关闭破盾模式时间 (秒，0表示关闭)", drp_dp).then(d => {
          var f = parseInt(d);
          if (f >= 0) {
            drp_dp = f;
            if (drp_dp > 0) {
              console.info("⏰ 自动关闭破盾模式时间已设置为: ", drp_dp + "秒");
            } else {
              console.info("⏰ 自动关闭破盾模式已关闭");
            }
            drp_fs();
          } else {
            console.info("请输入非负整数");
          }
          drp_fp();
        });
      });
      drp_dV.payment_password_config.click(function () {
        var d = {
          YbTvF: function (g, h) {
            return g !== h;
          }
        };
        var f = d;
        drp_fq();
        dialogs.rawInput("请输入6位支付密码", drp_dm || "").then(g => {
          if (f.YbTvF(g, null)) {
            let h = g.trim();
            if (h.length === 6 && /^\d{6}$/.test(h)) {
              drp_dm = h;
              console.info("🔒 支付密码已设置为: ", drp_dm);
              drp_fs();
            } else {
              console.error("❌ 支付密码必须是6位数字，请重新输入");
              dialogs.alert("密码格式错误", "支付密码必须是6位数字，请重新设置");
            }
          }
          drp_fp();
        });
      });
      drp_dV.close_config.click(function () {
        drp_fq();
      });
      drp_dV.preset_config.click(function () {
        drp_fm();
      });
      return drp_dV;
    }
    function drp_fp() {
      if (drp_dV && !drp_dW) {
        try {
          ui.post(() => {
            var b = Math.floor(device.width * 0.8) + "px";
            var c = Math.floor(device.height * 0.8) + "px";
            drp_dV.config_main.attr("w", b);
            drp_dV.config_main.attr("h", c);
            var b = device.width * 0.8 || device.width * 0.8;
            var c = device.height * 0.8 || device.height * 0.8;
            var d = Math.floor(device.width / 2 - b / 2);
            var f = Math.floor(device.height / 2 - c / 2);
            drp_dV.setPosition(d, f);
            drp_dV.setTouchable(true);
            drp_dW = true;
          });
          drp_fs();
        } catch (b) {
          log("Error showing config window: " + b);
        }
      }
    }
    function drp_fq() {
      var b = {
        qRbNU: "📂 加载此预设",
        pgygQ: "🗑️ 删除此预设",
        XPVAO: "[提示] 如果脚本没反应，请重启hamibot和微信",
        YWrOE: function (d, f) {
          return d && f;
        },
        jYdEM: "uyaVK",
        zxHjA: function (d, f) {
          return d === f;
        },
        IWOKU: "lTsHp",
        oGSwT: "Error hiding config window: "
      };
      var c = b;
      if (c.YWrOE(drp_dV, drp_dW)) {
        try {
          if (c.jYdEM !== "guFMB") {
            ui.post(() => {
              drp_dV.setPosition(-10000, -10000);
              drp_dV.setTouchable(false);
              drp_dW = false;
            });
          } else {
            c.push(c.qRbNU);
            d.push(c.pgygQ);
          }
        } catch (f) {
          if (c.zxHjA("lTsHp", c.IWOKU)) {
            log(c.oGSwT + f);
          } else {
            f.log(c.XPVAO);
            g = true;
            if (!h) {
              k();
            }
          }
        }
      }
    }
    function drp_fr() {
      try {
        if (drp_dW) {
          drp_fq();
        } else {
          drp_fp();
        }
      } catch (c) {
        log("Error toggling config window: " + c);
      }
    }
    function drp_fs() {
      if (drp_dV) {
        if (drp_dA != 200) {
          return;
        }
        try {
          drp_dV.delivery_type_config.setText("🚚 配送方式: " + (drp_cV || "到店取"));
          drp_dV.delivery_number_config.setText("📦 配送数量: " + (drp_cW || 1));
          drp_dV.specs_config.setText("📏 规格: " + (drp_cX || "单个"));
          drp_dV.refresh_delay_config.setText("⏱️ 库存刷新刷新延迟: " + drp_cY + "ms");
          drp_dV.enable_random_delay_config.setText("🎲 启用额外随机库存刷新间隔: " + (drp_de ? "开启" : "关闭"));
          drp_dV.extra_delay_config.setText("⏰ 主动操作延迟: " + drp_cZ + "ms");
          drp_dV.ack_delay_config.setText("✅ 点击[我知道了]后等待的延迟: " + drp_d1 + "ms");
          drp_dV.ignore_ack_config.setText("🚫 特殊刷回流模式(不点击我知道了): " + (drp_df ? "开启" : "关闭"));
          drp_dV.special_confirm_delay_config.setText("⭐ 特殊刷回流点击确认延迟: " + drp_dc + "ms");
          drp_dV.ignore_ack_click_delay_config.setText("⏰ 特殊刷回流点击延迟: " + drp_d6 + "ms");
          drp_dV.random_delay_lower_config.setText("⬇️ 随机延迟下限: " + drp_d3 + "ms");
          drp_dV.random_delay_upper_config.setText("⬆️ 随机延迟上限: " + drp_d4 + "ms");
          drp_dV.max_refresh_time_config.setText("⌛ 最大刷新时间: " + drp_d0 + "分钟");
          drp_dV.rage_stock_refresh_config.setText("⚡ 狂暴库存刷新模式: " + (drp_dj ? "开启" : "关闭"));
          drp_dV.legacy_refresh_config.setText("🔄 上下刷新模式: " + (drp_dv ? "开启" : "关闭"));
          drp_dV.vibrate_time_config.setText("📳 抢购成功振动时长: " + drp_db + "ms");
          drp_dV.main_window_alpha_config.setText("🔍 窗口透明度: " + drp_d5);
          drp_dV.auto_click_notification_config.setText("🔔 自动点击到货通知: " + (drp_d2 ? "开启" : "关闭"));
          drp_dV.reset_floaty_position_config.setText("🔄 重置悬浮窗位置: " + (drp_dd ? "开启" : "关闭"));
          drp_dV.extra_selection_regex_config.setText("🔤 额外选择规则: " + (drp_dl || "未设置"));
          drp_dV.shield_breaker_mode_config.setText("🛡️ 破盾模式: " + (drp_do ? "开启" : "关闭"));
          drp_dV.ignore_ack_panic_timer_config.setText("⏰ 自动关闭特殊刷回流: " + (drp_dq > 0 ? drp_dq + "秒" : "关闭"));
          drp_dV.panic_timer_config.setText("⏰ 自动关闭破盾模式: " + (drp_dp > 0 ? drp_dp + "秒" : "关闭"));
          drp_dV.payment_password_config.setText("🔒 支付密码: " + (drp_dm || "未设置"));
        } catch (d) {
          log("Error updating config window: " + d);
        }
      }
    }
    if (!drp_dh) {
      drp_dQ.config_settings.click(function () {
        ui.post(() => {
          try {
            if (!drp_dV) {
              drp_dV = drp_fo();
              drp_fs();
              var b = String(device.width * 0.8) + "px";
              var c = String(device.height * 0.8) + "px";
              drp_dV.config_main.attr("w", b);
              drp_dV.config_main.attr("h", c);
              sleep(500);
            }
            drp_fr();
          } catch (d) {
            log("Error in config button click: " + d);
          }
        });
      });
    }
    var drp_dR = drp_dP.get("floaty_position_x");
    var drp_dS = drp_dP.get("floaty_position_y");
    var drp_dT = device.width / 2 + 100;
    var drp_dU = drp_dQ.getY() + 100;
    if (typeof drp_dR === "number" && typeof drp_dS === "number" && drp_dR >= 0 && drp_dR + 100 <= device.width && !drp_dd) {
      console.warn("[提示] 悬浮窗位置已读取");
      drp_dQ.setPosition(drp_dR, drp_dS);
    } else {
      console.warn("[提示] 已使用默认悬浮窗位置");
      drp_dQ.setPosition(drp_dT, drp_dU);
    }
    var drp_dV = drp_fo();
  }
  function drp_dX(b) {
    var f = b.findOne(text("购买方式"));
    if (!f) {
      console.log("Exit button not found");
      return null;
    }
    var g = f.parent();
    if (!g) {
      console.log("Parent1 not found");
      return null;
    }
    var h = g.parent();
    if (!h) {
      console.log("Parent2 not found");
      return null;
    }
    var j = h.parent();
    if (!j) {
      console.log("Exit button parent not found");
      return null;
    }
    var k = j.child(0);
    if (!k) {
      console.log("Exit button child not found");
      return null;
    }
    if (k.className() !== "android.widget.Image") {
      console.log("Exit button child is not an Image");
      return null;
    }
    return k;
  }
  var drp_dY = drp_dO;
  var drp_dZ = 1984;
  function drp_e0() {
    var d = className("android.widget.TextView").text("到货通知").findOne(50);
    if (d) {
      console.warn("[操作] 已点击到货通知按钮");
      d.click();
    }
  }
  var drp_e1 = "yRFxy902vYq9Kotiy4bU6LIWIx1TlMc07SKjZNXIeV3wAkXEMhzvwlY9y1ekT6C7dp4rvWSlAnUbAMeFOrXUq87xvFnA4U4ftGg3TRLG0{SV{tEy,:m*PNMHFupL79ugesPUPOHhOw==";
  drp_dZ = drp_dZ + drp_dA;
  function drp_e2(a, b) {
    var c = {
      zKhlc: "child_of_linear_layout does not have four children",
      LcEJu: function (g, h) {
        return g < h;
      },
      tBWEh: "OxhNb",
      uJRPX: function (g, h) {
        return g(h);
      },
      NpIUP: function (g, h) {
        return g + h;
      }
    };
    let d = a;
    let f = 0;
    while (d != null && c.LcEJu(f, b)) {
      try {
        if (c.tBWEh === "EAqAo") {
          if (c) {
            f(c.zKhlc);
          }
          return;
        } else {
          d = d.child(0);
        }
      } catch (h) {
        c.uJRPX(log, c.NpIUP("Exception at level ", f) + ": " + h);
        return null;
      }
      f++;
    }
    return d;
  }
  var drp_e3 = drp_dZ != 1984;
  var drp_e4 = threads;
  function drp_e5(a) {
    var c = {
      xddTs: "preset_name_",
      jYPCt: function (h) {
        return h();
      },
      aXhhO: function (h, j) {
        return h(j);
      },
      ELfxP: "android.widget.TextView",
      PhKzb: "DFS",
      fDZzx: function (h, j) {
        return h === j;
      },
      OHMvS: "XWPcR",
      xlcJs: function (h, j) {
        return h < j;
      },
      XxiYA: function (h, j) {
        return h !== j;
      },
      xzzZm: "Top node is null after going up 3 parents.",
      BLlte: "UPOrf"
    };
    var d = null;
    var f = a;
    for (var g = 0; g < 13; g++) {
      if (f == null) {
        break;
      }
      if (c.fDZzx(f.className(), "android.widget.RelativeLayout")) {
        if (c.OHMvS !== "HITOf") {
          d = f;
        } else {
          d.put(c.xddTs + f, g.trim());
        }
      }
      f = f && f.parent();
    }
    if (drp_dA + 1 != 201) {
      drp_c0();
    }
    if (d != null) {
      f = d;
      for (var g = 0; c.xlcJs(g, 2); g++) {
        if (c.XxiYA("MGzXs", "ikzdz")) {
          if (f == null) {
            break;
          }
          f = f.parent();
        } else {
          j = k.trim();
          if (l.length > 0) {
            q.info("🔤 额外选择规则已设置为: ", r);
          } else {
            s.info("🔤 额外选择规则已清空");
          }
          c.jYPCt(p);
        }
      }
      if (f != null) {
        let l = f.bounds();
      } else {
        c.aXhhO(log, c.xzzZm);
      }
    } else if (c.BLlte !== "xgTJr") {
      c.aXhhO(log, "No RelativeLayout found in 13 levels.");
    } else {
      return false;
    }
    return f;
  }
  if (!drp_e3) {
    drp_e4.start(function () {
      while (true) {
        drp_cU = 0;
      }
    });
  }
  function drp_e6(a) {
    if (!a) {
      return "no_header";
    }
    if (a.childCount() === 0) {
      return "no_header";
    }
    var c = a.child(0);
    if (!c) {
      return "no_header";
    }
    if (c.className() !== "android.widget.RelativeLayout") {
      return "no_header";
    }
    var d = c.children();
    if (!d || d.length === 0) {
      return "";
    }
    if (drp_dZ - 1984 != 200) {
      return "no_header";
    }
    var f = 0;
    var g = d[0];
    for (var h = 0; h < d.length; h++) {
      var j = d[h];
      var k = j ? j.drawingOrder() : 0;
      if (k > f) {
        if (j.childCount() != 0) {
          f = k;
          g = j;
        }
      }
    }
    if (!g) {
      return "";
    }
    var l = g && g.childCount() > 0 ? g.child(0) : null;
    if (!l) {
      return "";
    }
    var m = l.findOne(className("android.widget.TextView").algorithm("BFS"));
    if (!m) {
      return "";
    }
    return m.text();
  }
  function drp_e7() {
    var a = className("android.widget.RelativeLayout").algorithm("BFS").findOne(100);
    if (!a) {
      return null;
    }
    if (!a.parent()) {
      return null;
    }
    var b = a.parent();
    if (!b) {
      return null;
    }
    if (!b.parent()) {
      return null;
    }
    a = b.parent();
    return a;
  }
  function drp_e8(a) {
    var b = a.bounds();
    var c = b.centerX();
    var d = b.centerY();
    click(c, d);
  }
  function drp_e9() {
    if (drp_ed == -1 || drp_ee == -1) {
      return;
    }
    click(drp_ed, drp_ee);
    sleep(200);
  }
  function drp_ea(b) {
    var c = {
      qeBMC: function (m, n) {
        return m != n;
      },
      rBdiI: function (m, n) {
        return m != n;
      },
      rrsAR: function (m, n) {
        return m < n;
      },
      eZDKQ: "unstuck_cap_btn_x"
    };
    var d = c;
    if (d.qeBMC(drp_ed, -1) && d.rBdiI(drp_ee, -1)) {
      return;
    }
    var f = b.bounds();
    var g = device.width;
    var h = device.height;
    var j = f.centerX();
    var k = f.centerY();
    if (j < 0 || j > g || d.rrsAR(k, 0) || k > h) {
      return;
    }
    drp_ed = j;
    drp_ee = k;
    var l = storages.create("DRP");
    l.put(d.eZDKQ, drp_ed);
    l.put("unstuck_cap_btn_y", drp_ee);
  }
  var drp_eb = drp_c6;
  function drp_ec() {
    var d = storages.create("DRP");
    drp_ed = d.get("unstuck_cap_btn_x", -1);
    drp_ee = d.get("unstuck_cap_btn_y", -1);
    if (drp_ed != -1 && drp_ee != -1) {
      return;
    }
    drp_ed = -1;
    drp_ee = -1;
  }
  var drp_ed = -1;
  var drp_ee = -1;
  drp_ec();
  if (!drp_dY) {
    drp_eb();
  }
  function drp_ef(a) {
    var b = {
      kJnEB: function (m, n) {
        return m < n;
      },
      KQHsA: function (m, n) {
        return m(n);
      },
      XkCoX: function (m, n) {
        return m + n;
      },
      sZoCT: "webview_count: ",
      SDCnu: function (m, n) {
        return m > n;
      },
      HzzjP: "JXxTL",
      wobVN: function (m, n) {
        return m !== n;
      }
    };
    var c = a.childCount();
    if (c == 0) {
      return null;
    }
    if (drp_cn) {
      console.error(b.XkCoX(b.sZoCT, a.childCount()));
    }
    var d = 0;
    var f = c - 1;
    var g = false;
    for (var h = 0; h < c; h++) {
      var j = a.child(h);
      var k = drp_e6(j);
      var l = j ? j.drawingOrder() : 0;
      if (l === 0) {
        g = true;
        break;
      }
      if (b.SDCnu(l, d)) {
        if (b.HzzjP === "JXxTL") {
          d = l;
          f = h;
        } else {
          let o = d;
          let p = 0;
          while (o != null && b.kJnEB(p, f)) {
            try {
              o = o.child(0);
            } catch (q) {
              b.KQHsA(k, "Exception at level " + p + ": " + q);
              return null;
            }
            p++;
          }
          return o;
        }
      }
    }
    if (g) {
      if (b.wobVN("lRXCQ", "pLxJi")) {
        return a.child(c - 1);
      } else {
        b = "送到家";
      }
    }
    return a.child(f);
  }
  function drp_eg(a) {
    return a.findOne(className("android.webkit.WebView").algorithm("DFS")) || null;
  }
  function drp_eh(b) {
    var c = {
      DxSZG: "purchase",
      qgXCy: function (u, v) {
        return u - v;
      },
      ZMxBT: function (u, v) {
        return u !== v;
      },
      TTPPL: "android.widget.RelativeLayout",
      zMULq: function (u, v) {
        return u < v;
      },
      mPLcW: function (u, v) {
        return u < v;
      },
      DXEvt: function (u, v) {
        return u < v;
      },
      TEUxX: function (u, v) {
        return u === v;
      },
      BIVvA: function (u, v) {
        return u === v;
      },
      RXeHF: "XHpoH",
      AhiPz: "kJfAz"
    };
    var d = c;
    if (!b) {
      return null;
    }
    if (b.childCount() < 1) {
      return null;
    }
    var f = b.child(0);
    if (!f) {
      return null;
    }
    if (!drp_dY) {
      return null;
    }
    if (d.ZMxBT(f.className(), d.TTPPL)) {
      return null;
    }
    var g = null;
    var h = Number.MAX_VALUE;
    var j = f.childCount();
    for (var k = 0; k < j; k++) {
      var l = f.child(k);
      if (!l) {
        continue;
      }
      var m = l.drawingOrder();
      if (d.zMULq(m, h)) {
        h = m;
        g = l;
      }
    }
    if (!g) {
      return null;
    }
    if (d.mPLcW(g.childCount(), 1)) {
      return null;
    }
    var n = g.child(0);
    if (!n) {
      return null;
    }
    if (!drp_dN) {
      return null;
    }
    var o = null;
    var p = n.childCount();
    for (var k = 0; d.DXEvt(k, p); k++) {
      var l = n.child(k);
      if (!l) {
        continue;
      }
      if (d.TEUxX(l.drawingOrder(), 2)) {
        o = l;
        break;
      }
    }
    if (!o) {
      return null;
    }
    var q = o.child(0);
    if (!q || q.childCount() < 1) {
      return null;
    }
    q = q.child(0);
    if (!q || q.childCount() < 1) {
      return null;
    }
    q = q.child(0);
    if (!q || d.zMULq(q.childCount(), 1)) {
      if (d.BIVvA("zQZOB", d.RXeHF)) {
        var A = c.child(0);
        if (A && A.className() === "android.view.View") {
          f = A.child(d.qgXCy(A.childCount(), 1));
        }
      } else {
        return null;
      }
    }
    q = q.child(0);
    if (!q) {
      return null;
    }
    var r = null;
    var s = q.childCount();
    for (var k = 0; k < s; k++) {
      var l = q.child(k);
      if (!l) {
        continue;
      }
      if (l.drawingOrder() === 0) {
        r = l;
        break;
      }
    }
    if (!r) {
      if (d.AhiPz !== "AYgCs") {
        return null;
      } else {
        let B = B.bounds();
      }
    }
    if (r.childCount() < 1) {
      return null;
    }
    var t = r.child(0);
    if (!t) {
      return null;
    }
    if (t.className() === "android.webkit.WebView") {
      return t;
    }
    return null;
  }
  function drp_ei(n, o) {
    if (!o) {
      var q = {
        header: n,
        status: "no_webview"
      };
      return q;
    }
    if (drp_dA != 200) {
      return;
    }
    if (n === "确认订单" || n === "访问异常，请稍后重试") {
      var r = {
        header: n,
        status: "confirm_and_pay"
      };
      return r;
    } else if (n == "" || n != "no_header") {
      var s = Date.now();
      var t = drp_en(o);
      if (t) {
        var u = {
          header: n,
          status: "purchase"
        };
        return u;
      }
      if (!drp_dO) {
        var v = {
          header: n,
          status: "no_webview"
        };
        return v;
      }
      var z = drp_em(o);
      if (z && z.text() == "立即购买") {
        var A = {
          header: n,
          status: "info_page"
        };
        return A;
      } else if (z && (z.text().startsWith("距开售还剩") || z.text() == "参与抢购")) {
        var B = {
          header: n,
          status: "preorder"
        };
        return B;
      } else if (z && z.text().startsWith("距离开售时间还剩")) {
        var C = {
          header: n,
          status: "presale"
        };
        return C;
      }
      var D = o.findOne(textStartsWith("*您即将进入抢购"));
      if (D) {
        var E = {
          header: n,
          status: "preorder"
        };
        return E;
      }
      var F = o.findOne(textStartsWith("继续等待"));
      if (F) {
        var G = {
          header: n,
          status: "keep_waiting"
        };
        return G;
      }
      var H = {
        header: n,
        status: "default"
      };
      return H;
    } else {
      var I = {
        header: n,
        status: "default"
      };
      return I;
    }
  }
  function drp_ej(a) {
    var b = {
      gxiUh: function (h) {
        return h();
      },
      vfzXF: function (h, j) {
        return h === j;
      },
      WLbzE: "DFS",
      pULEh: function (h, j) {
        return h !== j;
      }
    };
    if (!a) {
      if (b.vfzXF("pEEUf", "xgkEE")) {
        b = 0;
      } else {
        return;
      }
    }
    var c = a.findOne(className("android.widget.TextView").text("数量").algorithm(b.WLbzE));
    if (!c) {
      return;
    }
    var d = c.indexInParent();
    var f = c.parent();
    if (!f) {
      return;
    }
    if (f.childCount() < d + 4) {
      if (b.pULEh("yeGeq", "yeGeq")) {
        var l = c.child(d);
      } else {
        return;
      }
    }
    var g = f.child(d + 3);
    if (!g) {
      return;
    }
    g.click();
  }
  function drp_ek(b) {
    var h = b.findOne(className("android.widget.TextView").text("数量").algorithm("DFS"));
    var k = h.indexInParent();
    var j = h.parent();
    var l = j.child(k + 1);
    return l;
  }
  function drp_el(b, c) {
    var g = b.findOne(className("android.widget.TextView").text("数量").algorithm("DFS"));
    var h = g.indexInParent();
    var j = g.parent();
    var k = j.child(h + 1);
    var l = j.child(h + 2);
    var m = j.child(h + 3);
    var n = parseInt(l.text());
    if (isNaN(n)) {
      console.warn("无法处理购买数量: " + l.text());
      return;
    }
    var n = parseInt(l.text());
    if (n === c) {
      if (drp_dZ < 2000) {
        drp_cU = 0;
      }
      console.warn("[操作] 当前已满足购买数量要求: " + n);
      return;
    }
    if (n > c) {
      var o = n - c;
      for (var p = 0; p < o; p++) {
        k.click();
        sleep(10);
      }
    } else {
      var o = c - n;
      for (var p = 0; p < o; p++) {
        m.click();
        sleep(10);
      }
    }
  }
  function drp_em(b) {
    if (!drp_dO) {
      return null;
    }
    var f = null;
    var g = b.childCount();
    for (var h = g - 1; h >= 0; h--) {
      try {
        var j = b.child(h);
      } catch (m) {
        break;
      }
      if (!j) {
        break;
      }
      if (j.className() === "android.view.View") {
        f = j;
        break;
      }
    }
    if (!f) {
      if (drp_cn) {
        log("Cannot find last view.");
        log("last_view is null");
      }
      return null;
    }
    if (f.childCount() != 1 && f.childCount() != 2) {
      if (drp_cn) {
        log("last_view error: " + f.childCount());
      }
      return null;
    }
    var k = f.child(f.childCount() - 1);
    if (!k || k.className() !== "android.view.View") {
      if (drp_cn) {
        log("last_child is null or not android.view.View");
      }
      return null;
    }
    if (k.childCount() < 1) {
      if (drp_cn) {
        log("last_child does not have at least one child");
      }
      return null;
    }
    var l = k.child(k.childCount() - 1);
    if (!l || l.className() !== "android.widget.TextView") {
      if (drp_cn) {
        log("last_child_last_child is null or not android.widget.TextView");
      }
      return null;
    }
    return l;
  }
  function drp_en(a) {
    var c = null;
    var d = a.childCount();
    for (var f = d - 1; f >= 0; f--) {
      try {
        var g = a.child(f);
      } catch (m) {
        break;
      }
      if (!g) {
        break;
      }
      if (g.className() === "android.view.View") {
        c = g;
        break;
      }
    }
    if (!c) {
      if (drp_cn) {
        log("Cannot find last view.");
        log("last_view is null");
      }
      sleep(30);
      return null;
    }
    if (c.childCount() < 2) {
      if (drp_cn) {
        log("last_view has less than 2 children");
      }
      return null;
    }
    var h = c.child(c.childCount() - 1);
    if (!h || h.className() !== "android.view.View") {
      if (drp_cn) {
        log("last_child is null or not android.view.View");
      }
      return null;
    }
    if (h.childCount() != 1) {
      if (drp_cn) {
        log("last_child does not have exactly 1 child");
      }
      return null;
    }
    var j = h.child(0);
    if (!j || j.className() !== "android.view.View") {
      if (drp_cn) {
        log("last_child_0 is null or not android.view.View");
      }
      return null;
    }
    if (j.childCount() != 1) {
      if (drp_cn) {
        log("last_child_0 does not have exactly 1 child");
      }
      return null;
    }
    var k = j.child(0);
    if (!k || k.className() !== "android.view.View") {
      if (drp_cn) {
        log("last_child_0_0 is null or not android.view.View");
      }
      return null;
    }
    if (k.childCount() != 3) {
      if (drp_cn) {
        log("last_child_0_0 does not have exactly 3 children");
      }
      return null;
    }
    var l = k.child(2);
    if (!l || l.className() !== "android.view.View") {
      if (drp_cn) {
        log("last_child_0_0_2 is null or not android.view.View");
      }
      return null;
    }
    return l;
  }
  function drp_eo(a) {
    var b = {
      RqEcB: function (f, g) {
        return f != g;
      },
      vrAEO: function (f, g) {
        return f + g;
      },
      FJzbf: "到店取",
      ezWJt: "📦 配送数量: ",
      bCWCT: "📏 规格: ",
      uBfKs: "🎲 启用额外随机库存刷新间隔: ",
      mSTjf: "⏰ 主动操作延迟: ",
      Tqeua: "⏰ 特殊刷回流点击延迟: ",
      zravR: function (f, g) {
        return f + g;
      },
      ydDoA: "⚡ 狂暴库存刷新模式: ",
      PpxYm: function (f, g) {
        return f + g;
      },
      YRlzZ: "未设置",
      LIFfP: "⏰ 自动关闭特殊刷回流: ",
      wIDHc: "🔒 支付密码: ",
      enhAH: function (f, g) {
        return f || g;
      },
      HhIhO: function (f, g) {
        return f(g);
      },
      vyNPe: "DFS",
      ceaUl: function (f, g) {
        return f(g);
      },
      FrGyD: "dqzAM",
      JDjrC: function (f, g) {
        return f == g;
      },
      WwZlK: "RhQqf"
    };
    var c = b.ceaUl(drp_en, a);
    if (!c) {
      if (b.FrGyD === "dqzAM") {
        return null;
      } else {
        if (b.RqEcB(a5, 200)) {
          return;
        }
        try {
          aV.delivery_type_config.setText(b.vrAEO("🚚 配送方式: ", aW || b.FJzbf));
          aX.delivery_number_config.setText(b.ezWJt + (aY || 1));
          aZ.specs_config.setText(b.bCWCT + (b0 || "单个"));
          b1.refresh_delay_config.setText("⏱️ 库存刷新刷新延迟: " + b2 + "ms");
          b3.enable_random_delay_config.setText(b.uBfKs + (b4 ? "开启" : "关闭"));
          b5.extra_delay_config.setText(b.mSTjf + b6 + "ms");
          b7.ack_delay_config.setText("✅ 点击[我知道了]后等待的延迟: " + b8 + "ms");
          b9.ignore_ack_config.setText("🚫 特殊刷回流模式(不点击我知道了): " + (ba ? "开启" : "关闭"));
          bb.special_confirm_delay_config.setText(b.vrAEO("⭐ 特殊刷回流点击确认延迟: " + bc, "ms"));
          bd.ignore_ack_click_delay_config.setText(b.vrAEO(b.Tqeua, be) + "ms");
          bf.random_delay_lower_config.setText("⬇️ 随机延迟下限: " + bg + "ms");
          bh.random_delay_upper_config.setText("⬆️ 随机延迟上限: " + bi + "ms");
          bj.max_refresh_time_config.setText(b.zravR("⌛ 最大刷新时间: ", bk) + "分钟");
          bl.rage_stock_refresh_config.setText(b.ydDoA + (bm ? "开启" : "关闭"));
          bn.legacy_refresh_config.setText("🔄 上下刷新模式: " + (bo ? "开启" : "关闭"));
          bp.vibrate_time_config.setText(b.PpxYm("📳 抢购成功振动时长: ", bq) + "ms");
          br.main_window_alpha_config.setText("🔍 窗口透明度: " + bs);
          bt.auto_click_notification_config.setText("🔔 自动点击到货通知: " + (bu ? "开启" : "关闭"));
          bv.reset_floaty_position_config.setText(b.zravR("🔄 重置悬浮窗位置: ", bw ? "开启" : "关闭"));
          bx.extra_selection_regex_config.setText("🔤 额外选择规则: " + (by || b.YRlzZ));
          bz.shield_breaker_mode_config.setText(b.vrAEO("🛡️ 破盾模式: ", bA ? "开启" : "关闭"));
          bB.ignore_ack_panic_timer_config.setText(b.zravR(b.LIFfP, bC > 0 ? bD + "秒" : "关闭"));
          bE.panic_timer_config.setText("⏰ 自动关闭破盾模式: " + (bF > 0 ? bG + "秒" : "关闭"));
          bH.payment_password_config.setText(b.zravR(b.wIDHc, b.enhAH(bI, "未设置")));
        } catch (g) {
          bK("Error updating config window: " + g);
        }
      }
    }
    if (b.JDjrC(c.childCount(), 1)) {
      if (b.WwZlK !== "RhQqf") {
        l.click();
        b.HhIhO(m, 300);
        n = o.findOne(p(q).algorithm(b.vyNPe));
        if (r) {
          u.click();
          b.ceaUl(v, 100);
        }
      } else {
        var d = c.child(0);
        if (d && d.text() == "") {
          return d;
        }
      }
    }
    return null;
  }
  function drp_ep(a) {
    var c = drp_en(a);
    if (!c) {
      return null;
    }
    if (c.childCount() == 1) {
      var d = c.child(0);
      if (d && d.text() == "确定") {
        return d;
      }
    }
    return null;
  }
  function drp_eq(b) {
    var f = drp_en(b);
    if (!f) {
      return null;
    }
    if (f.childCount() >= 2) {
      return true;
    } else if (f.childCount() == 1) {
      var g = f.child(0);
      if (g && g.text() == "该渠道暂不发售") {
        return true;
      }
    }
    return false;
  }
  function drp_er(b) {
    if (!drp_dY) {
      return null;
    }
    if (!b) {
      return null;
    }
    if (b.childCount() == 2) {
      var f = b.child(1);
      if (f && f.className() === "android.view.View") {
        return f;
      }
    }
    return null;
  }
  var drp_es = 0;
  function drp_et() {
    var b = {
      yhJFE: function (h, j) {
        return h !== j;
      },
      OSKif: "uHzZZ"
    };
    var c = b;
    var d = className("android.widget.FrameLayout").algorithm("BFS").findOne(100);
    if (!d) {
      return false;
    }
    if (d.childCount() != 2) {
      return false;
    }
    var f = d.child(0);
    if (!f || c.yhJFE(f.className(), "android.widget.LinearLayout")) {
      if (c.yhJFE(c.OSKif, "dztOM")) {
        return false;
      } else {
        b.info("请输入非负整数");
      }
    }
    var g = d.child(1);
    if (!g || g.className() !== "android.view.View") {
      return false;
    }
    return true;
  }
  function drp_eu() {
    while (true) {
      if (drp_cU == 0) {
        sleep(200);
        continue;
      }
      if (!drp_et()) {
        sleep(100);
        continue;
      }
      var b = textMatches(/付款方式|支付工具/).findOne(100);
      if (!b) {
        sleep(100);
        continue;
      }
      drp_eJ = false;
      console.error("[页面检测] 当前处于支付页面");
      console.warn("[通知] 抢购完成! 祝老板大赚!");
      device.vibrate(drp_db);
      let f = drp_dm;
      if (f.length != 6 || !/^\d{6}$/.test(f)) {
        sleep(500);
        continue;
      }
      sleep(1000);
      console.error("[支付] 开始输入支付密码");
      var c = text("使用密码").findOne(100);
      if (c) {
        console.error("[支付] 检测到指纹或其他验证模式，尝试切换为密码输入");
        c.click();
        sleep(500);
      }
      let g = 0;
      while (g < 50) {
        var d = text("0").findOne(300);
        if (d) {
          break;
        }
        sleep(100);
        g++;
      }
      console.error("[支付] 已找到键盘，开始输入密码");
      for (let l = 0; l < f.length; l++) {
        let m = f[l];
        let n = text(m).findOne(300);
        if (!n) {
          sleep(130);
          continue;
        }
        n.click();
        sleep(200);
      }
      console.error("[支付] 支付密码输入完成");
      sleep(1000);
      let h = text("重试").findOne(300);
      if (h) {
        console.error("[支付] 支付失败");
        sleep(1000);
      }
    }
  }
  var drp_ev = null;
  var drp_ev = threads.start(function () {
    drp_eu();
  });
  function drp_ew() {
    while (true) {
      if (drp_cU == 0 || !drp_do || drp_eG()) {
        sleep(200);
        continue;
      }
      if (drp_eX && drp_eX.status != "confirm_and_pay") {
        sleep(50);
        continue;
      }
      try {
        var b = null;
        var c = [drp_eY, drp_eZ, drp_f0];
        for (var d of c) {
          if (!d) {
            continue;
          }
          var f = d.child(d.childCount() - 1);
          if (f && f.text() === "确认信息并支付") {
            b = f;
            break;
          }
        }
        if (b) {
          drp_eS++;
          drp_eR = 0;
          if (drp_eS >= 5) {
            if (drp_cn) {
              console.error("clicked confirm_btn with cap_btn, retry count: " + drp_eS);
            }
            console.error("多次尝试点击「确认信息并支付」失败，使用后备方案。");
            drp_e9();
          } else {
            b.click();
            drp_ea(b);
            sleep(100);
            if (drp_cn) {
              console.error("clicked confirm_btn, retry count: " + drp_eS);
            }
          }
          sleep(drp_cZ);
          continue;
        }
      } catch (k) {
        continue;
      }
    }
  }
  function drp_ex() {
    while (true) {
      if (drp_cU == 0 || !drp_do || drp_eG()) {
        sleep(200);
        continue;
      }
      if (drp_eX && drp_eX.status != "confirm_and_pay") {
        sleep(50);
        continue;
      }
      try {
        var b = null;
        var c = [drp_eY, drp_eZ, drp_f0];
        for (var d of c) {
          if (!d || d.childCount() != 2) {
            continue;
          }
          var f = d.child(1);
          if (f && f.className() === "android.view.View") {
            if (f.childCount() == 1) {
              var g = f.child(0);
              if (g && g.className() === "android.view.View") {
                b = g.child(g.childCount() - 1);
                break;
              }
            }
          }
        }
        if (b && b.text() != "我知道了") {
          drp_eS = 0;
          if (drp_eR == 0) {
            drp_d7 = new Date().getTime();
            b.click();
            sleep(100);
            if (drp_cn) {
              console.error("clicked double_confirm");
            }
            drp_eJ = true;
            drp_eR++;
          } else {
            drp_eR++;
            sleep(20);
          }
          continue;
        }
      } catch (n) {
        continue;
      }
    }
  }
  var drp_ey = null;
  var drp_ey = threads.start(function () {
    drp_ew();
  });
  var drp_ez = null;
  var drp_ez = threads.start(function () {
    drp_ex();
  });
  function drp_eA() {
    var b = className("androidx.recyclerview.widget.RecyclerView").find();
    let c = 0;
    while (b.length <= 1 && c < 50) {
      console.error("[控制] 正在等待消息加载");
      sleep(300);
      b = className("androidx.recyclerview.widget.RecyclerView").find();
      c++;
    }
    if (!drp_dY) {
      drp_c6();
    }
    let d = b.length >= 2 ? 1 : 0;
    for (let q = d; q >= 0; q--) {
      var f = b[q];
      sleep(300);
      if (drp_cn) {
        log("trying recycler_view " + q);
      }
      if (!f) {
        continue;
      }
      var g = f.child(f.childCount() - 1);
      if (!g || g.className() !== "android.widget.RelativeLayout") {
        if (drp_cn) {
          log("last_child not found for recycler_view " + q);
          if (g) {
            log(g.className());
          }
        }
        if (q === 0) {
          return;
        }
        continue;
      }
      break;
    }
    if (!g) {
      return;
    }
    var h = g.findOne(className("android.widget.FrameLayout"));
    if (!h) {
      if (drp_cn) {
        log("frame_layout not found");
      }
      return;
    }
    var j = h.child(0);
    if (!j || j.className() !== "android.widget.LinearLayout") {
      if (drp_cn) {
        log("linear_layout not found");
      }
      return;
    }
    var k = j.child(0);
    if (!k || k.className() !== "android.widget.LinearLayout") {
      if (drp_cn) {
        log("child_of_linear_layout not found");
      }
      return;
    }
    if (k.childCount() != 4) {
      if (drp_cn) {
        log("child_of_linear_layout does not have four children");
      }
      return;
    }
    var l = k.child(1);
    if (!l || l.className() !== "android.widget.TextView") {
      if (drp_cn) {
        log("card_title not found");
      }
      return;
    }
    var m = k.child(k.childCount() - 1);
    if (!m || m.className() !== "android.widget.LinearLayout") {
      if (drp_cn) {
        log("last_child_of_child_of_linear_layout not found");
      }
      return;
    }
    var n = l.text();
    if (!n) {
      if (drp_cn) {
        log("card_title_text not found");
      }
      return;
    } else if (drp_cn) {
      log("card_title_text: " + n);
    }
    var o = m.findOne(text("小程序"));
    if (!o) {
      if (drp_cn) {
        log("text_in_last_child_of_child_of_linear_layout not found");
      }
      return;
    }
    if (h) {
      h.click();
      ui.post(() => {
        drp_eE();
      });
    } else if (drp_cn) {
      log("frame_layout not found");
    }
  }
  function drp_eB() {
    if (!device.isScreenOn()) {
      console.log("[控制] 屏幕未亮，唤醒屏幕");
      device.wakeUp();
      sleep(400);
      while (!device.isScreenOn()) {
        sleep(200);
        device.wakeUp();
      }
      sleep(600);
      swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height / 2, 300);
      console.log("[控制] 尝试解锁手机");
      sleep(500);
    }
  }
  function drp_eC() {
    var b = {
      gfKis: function (d, f) {
        return d !== f;
      },
      pXVfy: "🔒 支付密码已设置为: ",
      UhAvt: "DRP",
      glSTK: "unstuck_cap_btn_y",
      GrzIu: "已自动购买数量-1",
      WOlIh: "KORDF",
      PGaTU: "JkMGZ",
      OUWrR: "last_child_0_0 is null or not android.view.View",
      RiduQ: function (d, f) {
        return d === f;
      },
      gipud: "Mhcvr",
      vXGmP: "[控制] 已设置购买数量:",
      sEbJk: "bghdP",
      SoVso: function (d, f) {
        return d !== f;
      },
      dYDpP: "到店取",
      oFnKe: "来回刷（到店取）",
      HfkMr: "[控制] 已设置配送方式:",
      tqLDw: "[控制] 已设置规格:",
      wLxbc: "vVeup"
    };
    var c = b;
    events.on("notification", function (d) {
      var f = {
        LTbGx: c.OUWrR,
        GkmZp: function (m, o) {
          return m(o);
        },
        fBslC: "yiPUc",
        RSLxp: function (m) {
          return m();
        }
      };
      if (c.RiduQ("rqhom", "xkpAB")) {
        h(f.LTbGx);
      } else {
        if (d.getPackageName() !== "com.tencent.mm" || !d.getText()) {
          return;
        }
        if (drp_dx && d.getText().includes("商品到货通知")) {
          console.log("[控制] 收到泡泡玛特的补货通知");
          ui.post(() => {
            var o = {
              ezbWh: function (p, q) {
                return c.gfKis(p, q);
              },
              eVjHl: c.pXVfy,
              zOOwa: function (p) {
                return p();
              },
              FxHQI: "❌ 支付密码必须是6位数字，请重新输入"
            };
            console.log("[控制] 已启动");
            drp_eE();
          });
          return;
        }
        if (!drp_du.some(o => d.getTitle().includes(o))) {
          return;
        }
        console.log("[控制] 收到来自监控群组[" + d.getTitle() + "]的通知");
        if (d.getText().includes("[小程序]")) {
          drp_eB();
          d.click();
          drp_eA();
          return;
        } else if (d.getText().includes("亮屏")) {
          console.log("[控制] 收到亮屏指令");
          drp_eB();
          return;
        }
        var g = d.getText();
        var h = {
          一: 1,
          二: 2,
          三: 3,
          四: 4,
          五: 5,
          六: 6,
          七: 7,
          八: 8,
          九: 9,
          十: 10,
          俩: 2,
          两: 2
        };
        var j = h;
        g = g.replace(/^\[\d+条\].*?:|^.*?:/, "");
        var k = g.match(/\d+/);
        if (k) {
          if (c.gipud !== "Mhcvr") {
            c.log("[提示] 如果脚本没反应，请重启hamibot和微信");
            d = true;
          } else {
            drp_cW = parseInt(k[0]);
            console.log(c.vXGmP, drp_cW);
          }
        } else if (c.sEbJk !== "bghdP") {
          f.GkmZp(c, 200);
          d.wakeUp();
        } else {
          var l = false;
          for (let q in j) {
            if (g.includes(q)) {
              drp_cW = j[q];
              l = true;
              break;
            }
          }
        }
        if (l) {
          console.log("[控制] 已设置购买数量:", drp_cW);
        }
        if (g.includes("店")) {
          if (c.SoVso("OaBcz", "iraZi")) {
            drp_cV = c.dYDpP;
            if (g.includes("来回")) {
              drp_cV = c.oFnKe;
            }
            console.log(c.HfkMr, drp_cV);
          } else {
            f.error(c.GrzIu);
            g.click();
            h = true;
            j(100);
          }
        } else if (g.includes("家")) {
          drp_cV = "送到家";
          if (g.includes("来回")) {
            drp_cV = "来回刷（送到家）";
          }
          console.log("[控制] 已设置配送方式:", drp_cV);
        } else if (g.includes("来回")) {
          drp_cV = "来回刷";
          console.log("[控制] 已设置配送方式:", drp_cV);
        }
        if (g.includes("端") || g.includes("整盒")) {
          drp_cX = "整盒";
          console.log("[控制] 已设置规格:", drp_cX);
        } else if (g.includes("盒") || g.includes("个")) {
          drp_cX = "单个";
          console.log(c.tqLDw, drp_cX);
        }
        if (g.includes("启动") || g.includes("开")) {
          if (c.RiduQ(c.wLxbc, "vVeup")) {
            ui.post(() => {
              if (c.WOlIh !== c.PGaTU) {
                console.log("[控制] 已启动");
                drp_eE();
              } else {
                d.text_status.setText("启动");
                try {
                  h.drag.attr("tint", "#66ccff");
                } catch (z) {
                  k.error("Failed to set image tint:", z);
                }
              }
            });
          } else {
            d = "整盒";
            f.log("[控制] 已设置规格:", g);
          }
        } else if (g.includes("关") || g.includes("停") || g.includes("结束")) {
          ui.post(() => {
            var z = {
              OQJRR: "Failed to set image tint:"
            };
            var A = z;
            if (!drp_dw) {
              if (f.fBslC !== "RcnvW") {
                console.log("[控制] 已停止并回到主界面");
              } else {
                z.error(A.OQJRR, d);
              }
            } else {
              console.log("[控制] 已停止");
            }
            f.RSLxp(drp_eF);
            if (!drp_dw) {
              f.RSLxp(home);
            }
          });
        } else if (g.includes("桌面")) {
          console.log("[控制] 已返回主界面");
          home();
        }
      }
    });
  }
  if (drp_dt || drp_dx) {
    var drp_eD = threads.start(function () {
      drp_eC();
    });
  }
  function drp_eE() {
    drp_cU = 1;
    console.error("[状态] 辅助启动");
    if (drp_dg && drp_bO) {
      try {
        drp_bO.end.attr("visibility", "visible");
        drp_bO.start.attr("visibility", "gone");
      } catch (c) {}
    }
    if (drp_dh && drp_bP) {
      try {
        drp_bP.text_status.setText("停止");
        drp_bP.drag.attr("tint", "#FF4444");
      } catch (f) {}
    }
    if (!drp_dg && !drp_dh && drp_bQ) {
      try {
        drp_bQ.end.attr("visibility", "visible");
        drp_bQ.start.attr("visibility", "gone");
      } catch (h) {}
    }
    if (!drp_dn) {
      console.log("[提示] 如果脚本没反应，请重启hamibot和微信");
      drp_dn = true;
    }
  }
  function drp_eF() {
    drp_cU = 0;
    console.error("[状态] 辅助停止");
    if (drp_dg && drp_bO) {
      try {
        drp_bO.end.attr("visibility", "gone");
        drp_bO.start.attr("visibility", "visible");
      } catch (b) {}
    }
    if (drp_dh && drp_bP) {
      try {
        drp_bP.text_status.setText("启动");
        drp_bP.drag.attr("tint", "#66ccff");
      } catch (f) {}
    }
    if (!drp_dg && !drp_dh && drp_bQ) {
      try {
        drp_bQ.end.attr("visibility", "gone");
        drp_bQ.start.attr("visibility", "visible");
      } catch (g) {}
    }
  }
  function drp_eG() {
    var b = {
      TYJVM: function (f, g) {
        return f == g;
      },
      njhkQ: function (f, g) {
        return f + g;
      },
      PBKhd: function (f, g) {
        return f * g;
      },
      RDimd: function (f, g) {
        return f !== g;
      }
    };
    var c = b;
    if (c.TYJVM(drp_dp, 0)) {
      return false;
    }
    var d = new Date().getTime() > c.njhkQ(drp_eN, c.PBKhd(drp_dp, 1000)) && drp_eO;
    if (!drp_eP && d) {
      if (c.RDimd("DpxUD", "DpxUD")) {
        return b;
      } else {
        console.error("「破盾模式」已临时关闭，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态");
        drp_eP = true;
      }
    }
    return d;
  }
  function drp_eH() {
    if (drp_dq == 0) {
      return false;
    }
    var d = new Date().getTime() > drp_eN + drp_dq * 1000 && drp_eO;
    if (!drp_eQ && d) {
      console.error("「特殊刷回流模式」已临时关闭，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态");
      drp_eQ = true;
    }
    return d;
  }
  var drp_eI = false;
  var drp_eJ = false;
  var drp_eK = 0;
  var drp_eL = false;
  var drp_eM = false;
  var drp_eN = new Date().getTime() + 86400000;
  var drp_eO = false;
  var drp_eP = false;
  var drp_eQ = false;
  var drp_eR = 0;
  var drp_eS = 0;
  var drp_eT = 0;
  var drp_eU = 150;
  var drp_eV = false;
  var drp_eW = 0;
  var drp_eX = null;
  var drp_eY = null;
  var drp_eZ = null;
  var drp_f0 = null;
  var drp_f1 = null;
  var drp_f2 = null;
  var drp_f3 = false;
  var drp_f4 = false;
  var drp_f5 = 0;
  var drp_f6 = false;
  function drp_f7() {
    while (true) {
      if (drp_cU == 0) {
        drp_eI = false;
        drp_eJ = false;
        r = false;
        drp_eR = 0;
        drp_d7 = 0;
        drp_da = 0;
        drp_eK = 0;
        drp_eS = 0;
        drp_eT = 0;
        drp_eV = false;
        drp_eW = 0;
        drp_eM = false;
        drp_f3 = false;
        drp_eN = new Date().getTime() + 86400000;
        drp_eO = false;
        if (drp_eP || drp_eQ) {
          console.error("已经解除「破盾模式」和「特殊刷回流模式」的临时关闭状态");
        }
        drp_eP = false;
        drp_eQ = false;
        drp_f2 = null;
        drp_f4 = false;
        drp_f5 = 0;
        drp_f6 = false;
        sleep(100);
        continue;
      }
      sleep(50);
      drp_f1 = drp_e7();
      if (!drp_f1) {
        if (drp_cn) {
          log("Cannot find webview parent node.");
        }
        continue;
      }
      var b = drp_ef(drp_f1);
      if (!b) {
        if (drp_cn) {
          log("Cannot find current node.");
        }
        continue;
      }
      if (drp_dA * 2 > 500) {
        drp_c0();
      }
      var c = drp_e6(b);
      var d = drp_eh(b);
      if (!d) {
        if (drp_cn) {
          log("Cannot find current webview.");
        }
        continue;
      }
      drp_eX = drp_ei(c, d);
      if (drp_cn) {
        log("Header: " + drp_eX.header + ", Status: " + drp_eX.status);
      }
      switch (drp_eX.status) {
        case "presale":
          drp_f4 = false;
          drp_f5 = 0;
          var f = drp_em(d);
          if (f && f.text().startsWith("距离开售时间还剩")) {
            var g = f.text().slice(-5);
            if (g.endsWith("0")) {
              log("距离开售还剩: " + g);
            } else if (g.startsWith("00:")) {
              var h = parseInt(g.split(":")[1]);
              if (h < 10) {
                console.error("距离开售还剩: " + g);
              } else if (h % 10 == 0) {
                console.error("距离开售还剩: " + g);
              }
            }
          }
          break;
        case "keep_waiting":
          log("继续等待按钮出现，执行点击");
          var j = d.findOne(textStartsWith("继续等待").algorithm("DFS"));
          if (j) {
            j.click();
            sleep(100);
          }
          break;
        case "preorder":
          drp_f4 = false;
          drp_f5 = 0;
          var k = d.findOne(text("就是这家").algorithm("DFS"));
          if (k) {
            k.click();
            break;
          }
          var l = d.findOne(text("参与抢购").algorithm("DFS"));
          if (l) {
            log("参与抢购按钮出现，执行点击");
            l.click();
            break;
          }
          if (drp_eM) {
            break;
          }
          var m = d.findOne(text("购买方式").algorithm("DFS"));
          if (!m) {
            break;
          }
          log("当前可以选择购买方式");
          var n = d.findOne(text(drp_cV).algorithm("DFS"));
          if (n) {
            n.click();
          }
          log("已选择购买方式：" + drp_cV);
          var o = d.findOne(text("选择规格").algorithm("DFS"));
          if (o) {
            log("当前可以选择规格");
            var p = d.findOne(textStartsWith(drp_cX).algorithm("DFS"));
            if (p) {
              p.click();
            }
            log("已选择规格：" + drp_cX);
            sleep(100 + drp_cZ);
          }
          if (drp_cW > 1) {
            var q = d.findOne(text("数量").algorithm("DFS"));
            if (q) {
              drp_el(d, drp_cW);
              log("已满足购买数量要求: ", drp_cW);
            }
          } else {
            log("目标购买数量为1，跳过购买数量判断");
          }
          drp_eM = true;
          break;
        case "confirm_and_pay":
          drp_f4 = false;
          drp_f5 = 0;
          if (drp_dv) {
            drp_f3 = false;
          }
          if (!drp_eO) {
            drp_eN = new Date().getTime();
            drp_eO = true;
            if (drp_do && drp_dp > 0) {
              console.error("脚本将在[", drp_dp, "]秒后临时关闭「破盾模式」，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态");
            }
            if (drp_df && drp_dq > 0) {
              console.error("脚本将在[", drp_dq, "]秒后临时关闭「特殊刷回流模式」，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态");
            }
          }
          drp_eT = 0;
          var r = false;
          drp_eI = true;
          if (!d) {
            if (drp_cn) {
              log("Cannot find current webview.");
            }
            sleep(10);
            break;
          }
          drp_eY = null;
          drp_eZ = null;
          drp_f0 = null;
          var s = d.childCount();
          for (var t = s - 1; t >= 0; t--) {
            try {
              var u = d.child(t);
            } catch (ah) {
              break;
            }
            if (!u) {
              break;
            }
            if (u.className() === "android.view.View") {
              if (!drp_eY) {
                drp_eY = u;
              } else if (!drp_eZ) {
                drp_eZ = u;
              } else if (!drp_f0) {
                drp_f0 = u;
                break;
              }
            }
          }
          if (!drp_eY) {
            if (drp_cn) {
              log("Cannot find last view.");
            }
            sleep(10);
            break;
          }
          if (!drp_do || drp_eG()) {
            var v = null;
            if (!drp_eY) {
              break;
            }
            var z = drp_eY.child(drp_eY.childCount() - 1);
            if (z && z.text() === "确认信息并支付") {
              v = z;
            }
            if (v) {
              drp_eR = 0;
              drp_eS++;
              if (drp_eS >= 7) {
                drp_e9();
                if (drp_cn) {
                  console.error("clicked confirm_btn (physical click)");
                }
                console.error("多次尝试点击「确认信息并支付」失败，使用后备方案。");
              } else {
                v.click();
                drp_ea(v);
                if (drp_cn) {
                  console.error("clicked confirm_btn");
                }
              }
              sleep(drp_cZ);
              break;
            }
            var A = null;
            if (drp_eY.childCount() == 2) {
              var B = drp_eY.child(1);
              if (B && B.className() === "android.view.View") {
                if (B.childCount() == 1) {
                  var C = B.child(0);
                  if (C && C.className() === "android.view.View") {
                    A = C.child(C.childCount() - 1);
                  }
                }
              }
            }
            if (A) {
              drp_eS = 0;
              if (drp_eR == 0) {
                drp_d7 = new Date().getTime();
                A.click();
                if (drp_cn) {
                  console.error("clicked double_confirm");
                }
                drp_eJ = true;
                drp_eR++;
                sleep(250 + drp_cZ);
              } else if (drp_eR >= 8) {
                drp_e8(A);
                if (drp_cn) {
                  console.error("clicked double_confirm (clickButton)");
                }
                drp_eJ = true;
                drp_eR = 0;
              } else {
                drp_eR++;
                sleep(20);
              }
              break;
            }
          }
          if (drp_df && !drp_eH()) {
            var D = d.findOne(text("我知道了").algorithm("DFS"));
          } else {
            var C = drp_er(drp_eY);
            if (!C) {
              break;
            }
            if (C.childCount() != 2) {
              break;
            }
            var E = C.child(0);
            var D = C.child(1);
          }
          if (D) {
            if (!drp_df || drp_eH()) {
              if (E) {
                console.log(E.text());
              }
              drp_eR = 0;
              D.click();
              if (drp_cn) {
                console.error("clicked acknowledge");
              }
              sleep(100 + drp_cZ + drp_d1);
            } else if (!drp_do || drp_eG()) {
              var F = d.findOne(textMatches(/(确认无误|就是这家)/).algorithm("DFS"));
              if (F) {
                if (drp_eR == 0) {
                  drp_d7 = new Date().getTime();
                  F.click();
                  drp_eJ = true;
                  drp_eR++;
                  sleep(drp_d6);
                  break;
                }
              }
              var G = d.findOne(text("确认信息并支付").algorithm("DFS"));
              if (G) {
                drp_eR = 0;
                drp_eS++;
                if (drp_eS >= 7) {
                  drp_e9();
                } else {
                  G.click();
                  sleep(drp_d6);
                  drp_eJ = false;
                  break;
                }
              }
            }
            drp_eJ = false;
            break;
          }
          break;
        case "info_page":
          drp_f3 = false;
          drp_eJ = false;
          r = false;
          drp_eS = 0;
          var v = drp_ep(d);
          if (!drp_eI) {
            sleep(300);
            if (!v) {
              var H = d.findOne(text("立即购买").algorithm("DFS"));
              if (H) {
                if (drp_f4) {
                  drp_f5++;
                  if (drp_f5 <= 30) {
                    drp_f4 = false;
                    drp_f5 = 0;
                    break;
                  }
                }
                H.click();
                drp_f4 = true;
              }
              sleep(400);
            }
          } else {
            if (!v) {
              drp_eI = false;
            }
            sleep(150);
          }
          break;
        case "purchase":
          if (drp_f4) {
            for (var t = 0; t < 40; t++) {
              var I = drp_eo(d);
              if (!I) {
                break;
              }
              sleep(50);
            }
          }
          if (drp_dy && drp_eO && !drp_f6) {
            let aF = drp_ek(d);
            if (aF) {
              console.error("已自动购买数量-1");
              aF.click();
              drp_f6 = true;
              sleep(100);
            }
          }
          drp_f4 = false;
          drp_f5 = 0;
          if (r) {
            r = false;
            break;
          }
          drp_eJ = false;
          drp_eR = 0;
          if (!drp_eI) {
            var m = d.findOne(text("购买方式").algorithm("DFS"));
            if (m) {
              if (!drp_cV.startsWith("来回刷")) {
                log("当前可以选择购买方式");
                var n = d.findOne(text(drp_cV).algorithm("DFS"));
                if (n) {
                  n.click();
                }
                log("已选择购买方式：" + drp_cV);
                sleep(50);
              }
            }
            var o = d.findOne(text("选择规格").algorithm("DFS"));
            if (o) {
              log("当前可以选择规格");
              var p = d.findOne(textStartsWith(drp_cX).algorithm("DFS"));
              if (p) {
                p.click();
              }
              log("已选择规格：" + drp_cX);
              sleep(100 + drp_cZ);
            }
            if (m && drp_dl && drp_dl.trim() !== "") {
              var L = m.parent();
              if (L) {
                var M = drp_dl.replace(/｜/g, "|").split("|").map(function (aH) {
                  return aH.trim();
                }).filter(function (aH) {
                  return aH.length > 0;
                }).map(function (aH) {
                  return ".*" + aH.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*";
                });
                if (M.length > 0) {
                  var N = M.join("|");
                  console.info("🔍 使用额外选择规则: ", drp_dl);
                  var O = L.find(textMatches(N).algorithm("BFS"));
                  if (O) {
                    for (var t = 0; t < O.length; t++) {
                      var P = O[t];
                      if (P) {
                        P.click();
                        console.error("已点击额外选择: ", P.text());
                        sleep(10);
                      }
                    }
                  }
                }
              }
            }
            if (drp_d2) {
              drp_e0();
            }
            var v = drp_ep(d);
            if (!drp_dv) {
              drp_f2 = new Date();
            } else if (!drp_f3) {
              drp_f2 = new Date();
              drp_f3 = true;
            }
            var Q = "到店取";
            while (!v && !drp_eI) {
              if (drp_d0 > 0) {
                var R = new Date();
                if (R - drp_f2 > drp_d0 * 60000) {
                  drp_cU = 0;
                  ui.post(() => {
                    if (!drp_dh) {
                      drp_dQ.end.attr("visibility", "gone");
                      drp_dQ.start.attr("visibility", "visible");
                    } else {
                      drp_dQ.text_status.setText("启动");
                      try {
                        drp_dQ.drag.attr("tint", "#66ccff");
                      } catch (aK) {
                        console.error("Failed to set image tint:", aK);
                      }
                    }
                  });
                  var h = parseFloat((drp_d0 * 60).toFixed(2));
                  console.warn("[通知] 超过设定的库存最大连续刷新时长[", drp_d0, "]分钟(", h, "秒) ", "，脚本已停止");
                }
              }
              if (drp_cU == 0) {
                drp_eI = false;
                drp_eJ = false;
                drp_eR = 0;
                break;
              }
              var S = new Date().getTime();
              var H = d.findOne(text("立即购买").algorithm("DFS"));
              if (H) {
                v = drp_ep(d);
                if (v) {
                  break;
                }
                if (!drp_dj) {
                  var T = drp_eq(d);
                  var U = 0;
                  var V = false;
                  var W = new Date().getTime();
                  var X = W - drp_d8;
                  if (X > Math.max(drp_cY, 300)) {
                    console.error("正在判断库存情况...");
                  }
                  while (!T) {
                    U++;
                    if (U > 30) {
                      V = true;
                      sleep(20);
                      break;
                    }
                    T = drp_eq(d);
                    if (T) {
                      break;
                    }
                    if (drp_d2 && drp_di) {
                      drp_e0();
                    }
                    sleep(20);
                    v = drp_ep(d);
                    if (v) {
                      break;
                    }
                    if (drp_cU == 0) {
                      drp_eI = false;
                      drp_eJ = false;
                      drp_eR = 0;
                      break;
                    }
                  }
                  var W = new Date().getTime();
                  var X = W - drp_d8;
                  if (X > Math.max(drp_cY, 300)) {
                    if (T) {
                      console.warn("已售罄");
                    } else if (v) {
                      console.warn("有库存");
                    }
                  }
                  if (V || T) {
                    if (drp_cs) {
                      drp_ej(d);
                    }
                    if (!drp_cV.startsWith("来回刷")) {
                      if (!drp_eI) {
                        var W = new Date().getTime();
                        var X = W - drp_d8;
                        if (X < Math.max(drp_cY, 300)) {
                          continue;
                        }
                        if (drp_dv) {
                          var Y = drp_dX(d);
                          if (Y) {
                            Y.click();
                            var a1 = Math.floor(Math.random() * (drp_d4 - drp_d3 + 1)) + drp_d3;
                            if (!drp_de) {
                              a1 = 0;
                            }
                            var a2 = drp_cY + a1;
                            sleep(Math.max(a2 / 4, 100));
                          }
                        }
                        drp_d8 = W;
                        H.click();
                        if (drp_dv) {
                          sleep(Math.max(a2 / 4, 100));
                        }
                      }
                    } else if (drp_cV == "来回刷") {
                      var a3 = d.findOne(text(Q).algorithm("DFS"));
                      if (a3) {
                        if (drp_cn) {
                          console.error("clicked current_selection_btn: ", Q);
                        }
                        a3.click();
                        if (Q == "到店取") {
                          Q = "送到家";
                        } else {
                          Q = "到店取";
                        }
                        sleep(100);
                      }
                    } else {
                      var a4 = "送到家";
                      var Q = "到店取";
                      if (drp_cV == "来回刷（送到家）") {
                        a4 = "到店取";
                        Q = "送到家";
                      }
                      var a3 = d.findOne(text(a4).algorithm("DFS"));
                      if (a3) {
                        a3.click();
                        sleep(300);
                        a3 = d.findOne(text(Q).algorithm("DFS"));
                        if (a3) {
                          a3.click();
                          sleep(100);
                        }
                      }
                    }
                  }
                } else if (drp_cV != "来回刷" && drp_cV != "来回刷（到店取）" && drp_cV != "来回刷（送到家）") {
                  if (!drp_eI) {
                    H.click();
                  }
                } else if (drp_cV == "来回刷") {
                  var a3 = d.findOne(text(Q).algorithm("DFS"));
                  if (a3) {
                    if (drp_cn) {
                      console.error("clicked current_selection_btn: ", Q);
                    }
                    a3.click();
                    if (Q == "到店取") {
                      Q = "送到家";
                    } else {
                      Q = "到店取";
                    }
                    sleep(100);
                  }
                } else {
                  var a4 = "送到家";
                  var Q = "到店取";
                  if (drp_cV == "来回刷（送到家）") {
                    a4 = "到店取";
                    Q = "送到家";
                  }
                  var a3 = d.findOne(text(a4).algorithm("DFS"));
                  if (a3) {
                    a3.click();
                    sleep(300);
                    a3 = d.findOne(text(Q).algorithm("DFS"));
                    if (a3) {
                      a3.click();
                      sleep(100);
                    }
                  }
                }
              }
              v = drp_ep(d);
              if (v) {
                if (drp_cn) {
                  console.error("confirm_btn found in purchase, break");
                }
                break;
              }
              var a5 = Math.floor(Math.random() * (drp_d4 - drp_d3 + 1)) + drp_d3;
              if (!drp_de) {
                a5 = 0;
              }
              var a6 = drp_cY + a5;
              if (drp_dv) {
                a6 = a6 / 2;
              }
              var a7 = Date.now();
              var a8 = false;
              while (Date.now() - a7 < a6) {
                sleep(50);
                v = drp_ep(d);
                if (v) {
                  a8 = true;
                  break;
                }
              }
              if (a8) {
                break;
              }
              v = drp_ep(d);
              if (v) {
                break;
              }
              purchase_count_label = d.findOne(text("数量").algorithm("DFS"));
              if (!purchase_count_label) {
                break;
              }
              console.info("[注意] 库存刷新耗时: ", drp_cY + a5, "ms");
              v = drp_ep(d);
              if (v) {
                if (drp_cn) {
                  console.error("confirm_btn found in purchase, break");
                }
                break;
              }
              if (drp_dv) {
                break;
              }
            }
            if (drp_cU == 0) {
              continue;
            }
            if (drp_cW > 1) {
              var q = d.findOne(text("数量").algorithm("DFS"));
              if (q) {
                drp_el(d, drp_cW);
                log("已满足购买数量要求: ", drp_cW);
              }
            } else {
              log("目标购买数量为1，跳过购买数量判断");
            }
          }
          v = drp_ep(d);
          if (v) {
            if (drp_cn) {
              console.error("confirm_btn found in purchase, try to click");
            }
            drp_eK = 0;
            if (drp_df) {
              if (!drp_eI) {
                var W = new Date().getTime();
                var a9 = W - drp_da;
                if (a9 >= 200) {
                  drp_da = W;
                  v.click();
                  drp_eI = true;
                  r = true;
                  sleep(150 + drp_cZ);
                  continue;
                }
              }
              var W = new Date().getTime();
              var a9 = W - drp_d7;
              if (a9 >= drp_dc) {
                console.warn("[等待] 确认按钮点击时间已超过", drp_dc, "ms，点击确认");
                if (drp_eT >= 2) {
                  drp_e8(v);
                  drp_eT = 0;
                  if (drp_cn) {
                    console.error("clicked confirm_btn (physical click)");
                  }
                } else {
                  var W = new Date().getTime();
                  var a9 = W - drp_da;
                  if (a9 >= 200) {
                    drp_da = W;
                    v.click();
                  }
                  drp_eT++;
                }
                drp_eI = true;
                r = true;
              } else {
                console.warn("[等待] 为防止反复被打回， 等待", drp_dc - a9, "ms后点击确认");
                sleep(drp_dc - a9);
                if (drp_eT >= 3) {
                  drp_e8(v);
                  drp_eT = 0;
                  if (drp_cn) {
                    console.error("clicked confirm_btn (physical click)");
                  }
                } else {
                  var W = new Date().getTime();
                  var a9 = W - drp_da;
                  if (a9 >= 200) {
                    drp_da = W;
                    v.click();
                  }
                  drp_eT++;
                }
                drp_eI = true;
                r = true;
              }
            } else {
              var W = new Date().getTime();
              var a9 = W - drp_da;
              if (a9 >= 200) {
                if (drp_eT >= 3) {
                  drp_e8(v);
                  drp_eT = 0;
                  if (drp_cn) {
                    console.error("clicked confirm_btn (physical click)");
                  }
                } else {
                  drp_da = W;
                  if (drp_cn) {
                    console.error("clicked confirm_btn)");
                  }
                  if (!drp_eI && drp_dk) {
                    drp_e8(v);
                  } else {
                    v.click();
                  }
                  drp_eT++;
                }
                drp_eI = true;
                r = true;
              }
              drp_eI = true;
              r = true;
            }
            sleep(150 + drp_cZ);
          } else {
            drp_eK++;
            if (drp_eK >= 10) {
              drp_eK = 0;
              drp_eI = false;
              drp_eJ = false;
              drp_eR = 0;
              r = false;
              sleep(20);
              break;
            }
          }
          break;
        case "purchase_ready":
          var v = drp_ep(d);
          if (v) {
            v.click();
          }
          sleep(200);
          break;
        default:
          break;
      }
    }
  }
  var drp_f8 = threads.start(function () {
    drp_f7();
  });
  events.on("exit", function () {
    if (drp_dr) {
      device.cancelKeepingAwake();
    }
    console.hide();
  });
  setInterval(() => {}, 10000);