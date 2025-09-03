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
const hamibot = {
  env: {
    delivery: '到店取',
    specs_conf: '整盒',
    purchase_count_conf: '2',
    extra_selection_regex_conf: '',
    extra_delay_conf: '0',
    legacy_refresh_conf: false,
    rage_stock_refresh_conf: false,
    delay_conf: '400',
    sku_result_toast_conf: false,
    enable_random_delay_conf: true,
    random_delay_lower_conf: '20',
    random_delay_upper_conf: '100',
    max_refresh_time_conf: '0',
    ack_delay_conf: '0',
    panic_timer_conf: '6',
    ignore_ack_panic_timer_conf: '0',
    shield_breaker_mode_conf: false,
    ignore_ack_conf: false,
    ignore_ack_click_delay_conf: '200',
    special_confirm_delay_conf: '1750',
    auto_click_notification_conf: false,
    special_click_confirm_conf: false,
    click_new_notification_conf: false,
    main_window_alpha_conf: '',
    reset_floaty_position_conf: false,
    vibrate_time_conf: 1000,
    payment_password_conf: '',
    hide_console_conf: false,
    use_legacy_floaty_conf: false,
    use_minimal_floaty_conf: mainStorage.get('minimal', true),
    keep_screen_on_conf: false,
    run_on_boot_conf: false,
    notification_based_control_conf: mainStorage.get('notification', false),
    monitored_titles_conf: mainStorage.get('monitored', ''),
    debug_mode_conf: false,
    APP_ENV: 'production',
    USER_ID: '6EC49C78-CC9A-4FDD-AB79-582E139D6FE2',
    ROBOT_ID: '6EC49C78-CC9A-4FDD-AB79-582E139D6FE2',
    SCRIPT_ID: '6EC49C78-CC9A-4FDD-AB79-582E139D6FE2',
    TIMESTAMP: Date.now(),
    JWT_TOKEN: '6EC49C78-CC9A-4FDD-AB79-582E139D6FE2',
  },
  plan: {
    name: '单设备极速版',
    onFreeTrial: false,
    model: 'flatRate',
  },
  robotName: '哈哈哈',
  scriptName: '灭霸',
  postMessage: function () {},
  exit: function () {
    exit();
  },
};
const { use_legacy_floaty_conf: drp_bM, use_minimal_floaty_conf: drp_bN } =
  hamibot.env;
var drp_bO;
var drp_bP;
var drp_bQ;
var drp_bR;
if (drp_bM) {
  drp_bO = floaty.window(
    '\n                <vertical id="main_window" bg="#000000" alpha="0.9" w="100">\n                    <text id="title" text="灭霸" gravity="center" textColor="#66ccff" textStyle="bold" />\n                    <horizontal>\n                        <button id="start" text="运行" bg="#00FFFF" w="100" visibility="visible" />\n                        <button id="end" text="停止" bg="#FF0000" w="100" visibility="gone" />\n                    </horizontal>\n                    <button text="" bg="#111111" w="50" h="10" />\n                    <horizontal>\n                        <button id="type_settings" text="方式" bg="#66ccff" w="50" h="40" />\n                        <button id="number_settings" text="数量" bg="#f0ff0f" w="50" h="40" />\n                    </horizontal>\n                    <button text="" bg="#111111" w="50" h="10" />\n                    <horizontal>\n                        <button id="move_start" text="移动" bg="#f0ff0f" w="100" h="40" visibility="visible" />\n                        <button id="move_end" text="固定" bg="#00FFFF" w="100" h="40" visibility="gone" />\n                    </horizontal>\n                </vertical>\n                ',
  );
} else if (drp_bN) {
  drp_bP = floaty.rawWindow(
    '<frame>\n                    <img id="drag" src="file://./icon.jpeg" circle="true" tint="#66ccff" bg="#00000000" padding="2" w="75" h="75" />\n                    <text id="text_status" text="启动" textColor="#FFFFFF" textSize="14sp" layout_gravity="center" gravity="center" bg="#00000000" />\n                </frame>',
  );
} else {
  drp_bQ = floaty.window(
    '<vertical id="main_window" bg="#000000" alpha="0.9" w="100">\n                    <text id="title" text="灭霸" gravity="center" textColor="#66ccff" textStyle="bold" />\n                    <horizontal>\n                        <button id="start" text="运行" bg="#00FFFF" w="100" visibility="visible" />\n                        <button id="end" text="停止" bg="#FF0000" w="100" visibility="gone" />\n                    </horizontal>\n                    <button text="" bg="#111111" w="50" h="3" />\n                    <horizontal>\n                        <button id="config_settings" text="配置" bg="#66ccff" w="100" h="40" />\n                    </horizontal>\n                    <button text="" bg="#111111" w="50" h="3" />\n                    <horizontal>\n                        <button id="move_start" text="移动" bg="#f0ff0f" w="100" h="40" visibility="visible" />\n                        <button id="move_end" text="固定" bg="#00FFFF" w="100" h="40" visibility="gone" />\n                    </horizontal>\n                </vertical>',
  );
}
drp_bR = floaty.rawWindow(
  `<vertical id=\"config_main\" bg=\"#000000\" alpha=\"0.95\" padding=\"10\" w=\"1px\" h=\"1px\">\n                <text text=\"⚙️ 临时配置设置\" gravity=\"center\" textColor=\"#66ccff\" textStyle=\"bold\" textSize=\"18\" />\n                <button text=\"关闭\" id=\"close_config\" bg=\"#F44336\" w=\"*\" h=\"40\" margin=\"0 10\" />\n                <button text=\"本地配置预设\" id=\"preset_config\" bg=\"#FFD700\" w=\"*\" h=\"40\" />\n                <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n                <scroll>\n                    <vertical>\n                        <button id=\"delivery_type_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"delivery_number_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"specs_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"extra_selection_regex_config\" text=\"\" bg=\"#66ccff\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n\n                        <button id=\"refresh_delay_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"legacy_refresh_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"enable_random_delay_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"random_delay_lower_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"random_delay_upper_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"max_refresh_time_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"rage_stock_refresh_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"payment_password_config\" text=\"\" bg=\"#4CAF50\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n\n\n                        <button id=\"extra_delay_config\" text=\"\" bg=\"#2196F3\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"ack_delay_config\" text=\"\" bg=\"#2196F3\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n\n                        <button id=\"ignore_ack_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"special_confirm_delay_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"ignore_ack_click_delay_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"shield_breaker_mode_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"ignore_ack_panic_timer_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"panic_timer_config\" text=\"\" bg=\"#E91E63\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"10\" h=\"10\" />\n                        \n\n                        <button id=\"vibrate_time_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"main_window_alpha_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"auto_click_notification_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                        <button text=\"\" bg=\"#111111\" w=\"*\" h=\"5\" />\n                        <button id=\"reset_floaty_position_config\" text=\"\" bg=\"#3F51B5\" w=\"*\" h=\"50\" />\n                    </vertical>\n                </scroll>\n            </vertical>`,
);
var drp_bS = 'Ada lovelace';
var drp_bT = 'See it, say it, sorted.';
var drp_bU = "King's Cross";
var drp_bV;
var drp_bW;
var drp_bX;
var drp_bY;
var drp_bZ;
var drp_c0;
var drp_c1;
var drp_c2 = 'Never Settle.';
var drp_c2 =
  'lGTW1pMWlUUXVKTWJGZ1Y0aFF2ZllreUdIYnJaL2pJbFYwMFBncmdnUUVYZEJNNjdICkRUYWpqczVUSGJ4eTNIMENCU0pGNVI2WXBTdk9Ed25GeDBOdjN3T2R1TVDMzFQNm2JmeVZadnpRT2JuWGd1V3ptUEVxTE9PZ3lqd05mZWEwQW8zU295S2YxU3FoRW1YQ3ZwZHRDbkJJam9jTUZPNk9QR1VUVGE2Q1AgUT54dH4gRFpIUk9zdU5GTk5vSzluV08hdko4aTFpVFF1Sk1iRmdWNGhRdmZZa3lHSGJyWi9qSWxWMDBQZ3JnZ1FFWGRCTTY3SApEVGFqanM1VEhieHkzSDBDQlNKRjVSNllwU3ZPRHduRngwTnYzd09kdUwvTFlLMXJrN0RB' +
  drp_c2;
var drp_c3 = 'Practice makes perfect.';
drp_c3 = '47cf4380-5bda-40a3-9ab3-74e0cdd5b079';
function drp_c4(a, b) {
  var a = a + 10000;
  drp_bV = hamibot;
  drp_bW = hamibot;
  drp_bX = drp_bW.exit;
  drp_c0 = exit;
  drp_c1 = exit;
  drp_c2 =
    'VTNwU1ZVMTZSazVWVlZaRVRYcEdVVTV0Y0RGalJrWnNVVlpPYUdScmJ6Uk5helF5WVdwS05WZFhaRFpWTWtwdFpWWmFZV1J1Y0ZKVU1rcDFWMGRrTVZZemNIUlZSVlo0VkVVNVVGb3piSEZrTURWdFdsZEZkMUZYT0hwVk1qazFVekpaZUZVelJtOVNWekZaVVROYWQxcElVa1JpYTBwS1lXMDVhbFJWV2xCT2F6bFJVakZXVlZaSFJUSlJNVUZuVlZRMU5HUklOR2RTUm5CSlZXczVlbVJWTlVkVWF6VjJVM3BzZFZZd09IaGxSelV4VW0xMFZFd3hXWEpVUm14SFZGY3hjRTFYYkZWVldGWkxWRmRLUjFveFdUQmhSa1l5V214c2NtVlZaRWxaYmtwaFRESndTbUpHV1hkTlJrSnVZMjFrYmxWVlZsbGFSVXBPVG1wa1NVTnJVbFZaVjNCeFkzcFdWVk5IU2pSbFZFNUpUVVZPUTFVd2NFZE9Wa2t5VjFoQ1ZHUnJPVVZrTWpWSFpVUkNUMlJxVGpOVU1sSXhWRU01VFZkVmMzaGpiWE16VWtWRlBRPT0=';
  drp_c3 = '42f93ddc-1c6f-40fc-82d7-5578a4596cd7';
}
for (let drp_eV = 0; drp_eV < 5; drp_eV++) {
  drp_c4(drp_eV, auto);
}
var drp_c5 = drp_bX;
auto.waitFor();
console.error('[无障碍] 状态正常');
function drp_c6() {
  drp_bY = drp_bV.env;
  drp_bZ = drp_bY;
  drp_c2 =
    'U3pSVU16Rk5VVVZETXpGUU5tcDFjRkZsUVZOaGRrbzRNazQyYWpKNVdXZDZVMkptZVZaYWRucFJUMkp1V0dkMVYzcHRVRVZ4VEU5UFozbHFkMDVtWldFd1FXOHpVMjk1UzJZeFUzRm9SVzFZUTNad1pIUkRia0pKYW05alRVWlBOazlRUjFWVVZHRTJRMUFnVVQ1NGRINGdSRnBJVWs5emRVNUdUazV2U3psdVYwOHhlRzUxUm10VEwxWXJURmxHVFcxcE1XbFVVWFZLVFdKR1oxWTBhRkYyWmxscmVVZElZbkphTDJwSmJGWXdNRkJuY21kblVVVllaRUpOTmpkSUNrUlVZV3BxY3pWVVNHSjRlVE5JTUVOQ1UwcEdOVkkyV1hCVGRrOUVkMjVHZURCT2RqTjNUMlIxVEM5TVdVc3hjbXMzUkVFPQ==';
  drp_c3 = 'd2143c10-f1e5-4fe1-8055-0d07a77b63da';
}
drp_c6();
const {
  delivery: drp_c7,
  specs_conf: drp_c8,
  purchase_count_conf: drp_c9,
  type_conf: drp_ca,
  extra_delay_conf: drp_cb,
  delay_conf: drp_cc,
  enable_random_delay_conf: drp_cd,
  random_delay_lower_conf: drp_ce,
  random_delay_upper_conf: drp_cf,
  max_refresh_time_conf: drp_cg,
  auto_click_notification_conf: drp_ch,
  click_new_notification_conf: drp_ci,
  hide_console_conf: drp_cj,
  disable_click: drp_ck,
  ack_delay_conf: drp_cl,
  debug_mode_conf: drp_cm,
  ignore_ack_conf: drp_cn,
  main_window_alpha_conf: drp_co,
  reset_floaty_position_conf: drp_cp,
  ignore_ack_click_delay_conf: drp_cq,
  sku_result_toast_conf: drp_cr,
  rage_stock_refresh_conf: drp_cs,
  vibrate_time_conf: drp_ct,
  special_confirm_delay_conf: drp_cu,
  special_click_confirm_conf: drp_cv,
  extra_selection_regex_conf: drp_cw,
  payment_password_conf: drp_cx,
  shield_breaker_mode_conf: drp_cy,
  panic_timer_conf: drp_cz,
  ignore_ack_panic_timer_conf: drp_cA,
  keep_screen_on_conf: drp_cB,
  run_on_boot_conf: drp_cC,
  notification_based_control_conf: drp_cD,
  monitored_titles_conf: drp_cE,
  legacy_refresh_conf: drp_cF,
} = drp_bY;
const { onFreeTrial: drp_cG } = drp_bV.plan;
var drp_cH = drp_cG;
const drp_cI = new Date(drp_bY.TIMESTAMP);
const drp_cJ = new Date();
const drp_cK = Math.abs(drp_cJ - drp_cI);
const drp_cL = 60000;
var drp_bS;
var drp_bT;
var drp_bU;
if (drp_cK > drp_cL) {
  sleep(4000);
  exit();
} else {
  drp_bS = drp_bV.scriptId;
  drp_bT = drp_bV.scriptName;
  drp_bU = drp_bV.plan.name;
  drp_c3 = '2507cf26-ae50-4db9-8bd7-215be2663501';
}
function drp_cM() {
  drp_bZ = drp_bY.JWT_TOKEN;
  drp_c3 = '57901f92-ae0f-41d1-aabd-8e7a4d3200cd';
  return drp_bZ + drp_bS + drp_bU;
}
var drp_cN;
var drp_cO;
var drp_cP;
drp_bZ = drp_bS;
drp_bZ = drp_bS + drp_bU;
drp_cN = drp_cM();
drp_cO = http;
drp_cP = http.get;
drp_c2 =
  'N0lRcHJuVDdyNXlMZkpId01Ub1RERWZaaGFUNEhXTGtKc2xYRUJYNWFMVkQ0ckpxTUZEdTRNTGV2N3FOcFRWck9HMnBtb2hyV1hWekFBbmxRWFhtSDdmNGFLZjNLZ2RUQ0V6c2A5SnU7OCxQPiQxVz83QT5XLzdmMTJxb2ZaOXd1K280dVliSGxpdnExRWxlY053Qk5YelIwazZRejBrbjdUYS9CMm9SNklZRkNIczlmRkxkUk8wWmlRMG5JK2dnCmYxSzQ4QlZkZUh1MENyd3E3Z1RZdEd4TWxJWU1zZmNqQk1JWU5ySmR1V2hPMy95aVZkdUI=';
if (!drp_bY.JWT_TOKEN) {
  drp_c1();
} else {
  drp_c2 = base64.decode(drp_c2);
}
if (!drp_cj) {
  console.show();
}
var drp_cQ = 0;
var drp_cR = drp_c7 || '到店取';
var drp_cS = parseInt(drp_c9) || 1;
var drp_cT = drp_c8 || '单个';
var drp_cU = parseInt(drp_cc) || 300;
var drp_cV = parseInt(drp_cb) || 0;
var drp_cW = parseFloat(drp_cg) || 0;
var drp_cX = parseInt(drp_cl) || 0;
var drp_cY = drp_ch || false;
var drp_cZ = Math.max(parseInt(drp_ce) || 10, 1);
var drp_d0 = Math.max(parseInt(drp_cf) || 150, 1);
var drp_d1 = Math.min(Math.max(parseFloat(drp_co) || 0.9, 0), 1);
var drp_d2 = parseInt(drp_cq) || 200;
var drp_d3 = 0;
var drp_d4 = 0;
var drp_d5 = 0;
var drp_d6 = Date.now();
var drp_d7 = parseInt(drp_ct) || 3000;
var drp_d8 = parseInt(drp_cu) || 1750;
var drp_d9 = drp_cp || false;
var drp_da = drp_cd || false;
var drp_db = drp_cn || false;
var drp_dc = drp_bM || false;
var drp_dd = drp_bN || false;
var drp_de = drp_ci || false;
var drp_df = drp_cs || false;
var drp_dg = drp_cv || false;
var drp_dh = drp_cw || '';
var drp_di = drp_cx || '';
var drp_dj = false;
var drp_dk = drp_cy || false;
var drp_dl = drp_cz || 0;
var drp_dm = drp_cA || 0;
var drp_dn = drp_cB || false;
var drp_do = drp_cC || false;
var drp_dp = drp_cD || false;
var drp_dq = drp_cE || '';
var drp_dr = drp_cF || false;
drp_dq = drp_dq.split(/[,，]/);
if (drp_dp) {
  try {
    events.observeNotification();
    console.error('[控制] 正在监听微信消息通知');
    console.error('[控制] 正在监控的群组: ' + drp_dq.join(', '));
  } catch (drp_eW) {
    console.error('[控制] 监听微信消息失败，请确认已开启hamibot的通知读取权限');
  }
}
if (drp_do) {
  console.info('[提示] 脚本已设置为开机自启动');
}
if (drp_dn) {
  device.keepScreenOn(7200000000);
  console.info('[提示] 屏幕已保持常亮');
}
function drp_ds() {
  if (drp_bZ) {
    return 200;
  } else {
    return 1210;
  }
}
var drp_dt;
var drp_du;
var drp_dv;
drp_dv = 'Bear';
drp_du = drp_dv;
drp_du =
  'https://internal.alibaba.com/verify/2507cf26-ae50-4db9-8bd7-215be2663501/response';
function drp_dw(a, b, c) {
  let d = a.substring(c, c + 16);
  let f = a.substring(c + 16);
  return aes.decrypt(f, b, d);
}
function drp_dx() {
  return 'https://internal.alibaba.com/verify/2507cf26-ae50-4db9-8bd7-215be2663501/response';
}
function drp_dy() {
  return drp_dw(drp_c2, drp_c3, drp_ds() / 2);
}
drp_dv += 'er ';
drp_du = drp_dy();
var drp_dz;
var drp_dA;
var drp_dB;
function drp_dC() {
  try {
    drp_du = base64.decode(drp_du);
    let g = {};
    var c =
      'yRFxy902vYq9Kotiy4bU6LIWIx1TlMc07SKjZNXIeV3wAkXEMhzvwlY9y1ekT6C7dp4rvWSlAnUbAMeFOrXUq87xvFnA4U4ftGg3TRLG0{SV{tEy,:m*PNMHFupL79ugesPUPOHhOw==';
    var d = drp_dw(c, drp_c3, drp_ds() / 2);
    g[d] = drp_dv + drp_bZ;
    var f = {
      headers: g,
    };
    if (drp_cG) {
      drp_dj = false;
    }
    drp_dt = 200;
    return true;
  } catch (j) {}
}
var drp_dD = 'hamibot.exit();';
function drp_dE() {
  var a = Math.floor(Math.random() * 100);
  drp_dz = a;
  var b = 'hamibot.exit();';
  drp_dz = drp_dt;
  drp_dA = drp_dt;
  drp_dB = drp_dt;
}
drp_dE();
let drp_dF = drp_dC();
if (!drp_dF) {
  drp_ds();
  drp_bX();
} else if (drp_cP) {
  let drp_eX = console;
}
var drp_dG = drp_dF;
console.info('[欢迎使用] 灭霸 辅助脚本');
if (drp_cG) {
  drp_cU = 1000;
} else {
}
if (drp_dt / 2 != 100) {
  drp_bX();
}
if (!drp_dG) {
  drp_c5();
}
var drp_dH = drp_dG;
if (drp_dc) {
  var drp_dI = storages.create('DRP');
  var drp_dJ = drp_bO;
  drp_dJ.main_window.attr('alpha', drp_d1);
  function drp_eY() {
    drp_cQ = 1;
    drp_dJ.end.attr('visibility', 'visible');
    drp_dJ.start.attr('visibility', 'gone');
  }
  function drp_eZ() {
    drp_cQ = 0;
    drp_dJ.end.attr('visibility', 'gone');
    drp_dJ.start.attr('visibility', 'visible');
  }
  drp_dJ.start.click(function () {
    drp_eY();
    console.error('[状态] 辅助脚本启动');
    if (!drp_dj) {
      console.log('[提示] 如果脚本没反应，请重启灭霸和微信');
      drp_dj = true;
      if (!drp_dG) {
        drp_c5();
      }
    }
  });
  drp_dJ.end.click(function () {
    drp_eZ();
    console.error('[状态] 辅助脚本停止');
  });
  drp_dJ.move_start.click(function () {
    drp_dJ.setAdjustEnabled(true);
    drp_dJ.move_start.attr('visibility', 'gone');
    drp_dJ.move_end.attr('visibility', 'visible');
  });
  drp_dJ.move_end.click(function () {
    drp_dJ.setAdjustEnabled(false);
    drp_dJ.move_start.attr('visibility', 'visible');
    drp_dJ.move_end.attr('visibility', 'gone');
    var d = drp_dJ.getX();
    var f = drp_dJ.getY();
    drp_dI.put('floaty_position_x', d);
    drp_dI.put('floaty_position_y', f);
    console.warn('[提示] 悬浮窗位置已记录');
  });
  drp_dJ.type_settings.click(function () {
    'ui';

    const b = [
      '送到家',
      '到店取',
      '来回刷',
      '来回刷（到店取）',
      '来回刷（送到家）',
    ];
    var c = b.indexOf(drp_cR);
    dialogs.singleChoice('请选择配送方案', b, c).then((d) => {
      switch (d) {
        case 0:
          drp_cR = '送到家';
          break;
        case 1:
          drp_cR = '到店取';
          break;
        case 2:
          drp_cR = '来回刷';
          break;
        case 3:
          drp_cR = '来回刷（到店取）';
          break;
        case 4:
          drp_cR = '来回刷（送到家）';
          break;
      }
      console.info('目前的购买方案为: ', drp_cR);
      console.info('如果已在运行状态，请停止后重新运行');
    });
  });
  drp_dJ.number_settings.click(function () {
    'ui';

    const d = ['1', '2', '手动输入'];
    dialogs.singleChoice('请选择购买数量', d).then((f) => {
      var g = {
        ZuuIt: function (h, j) {
          return h(j);
        },
        vPbHe: '目前的购买数量为: ',
      };
      if (f === 2) {
        dialogs.rawInput('请输入购买数量', drp_cS).then((h) => {
          var k = {
            zRctT: '密码格式错误',
          };
          if (parseInt(h) > 0) {
            drp_cS = g.ZuuIt(parseInt, h);
            console.info(g.vPbHe, drp_cS);
            console.info('如果已在运行状态，请停止后重新运行');
          } else {
            console.info('请输入正整数, [', h, ']不符合规范');
          }
        });
      } else {
        drp_cS = f + 1;
        console.info('目前的购买数量为: ', drp_cS);
        console.info('如果已在运行状态，请停止后重新运行');
      }
    });
  });
  var drp_dK = drp_dI.get('floaty_position_x');
  var drp_dL = drp_dI.get('floaty_position_y');
  var drp_dM = device.width / 2 + 100;
  var drp_dN = drp_dJ.getY() + 100;
  if (drp_do) {
    ui.post(() => {
      drp_eY();
    });
  }
  if (
    typeof drp_dK === 'number' &&
    typeof drp_dL === 'number' &&
    drp_dK >= 0 &&
    drp_dK + 100 <= device.width
  ) {
    console.warn('[提示] 悬浮窗位置已读取');
    drp_dJ.setPosition(drp_dK, drp_dL);
  } else {
    drp_dJ.setPosition(drp_dM, drp_dN);
  }
} else {
  var drp_dI = storages.create('DRP');
  if (drp_dd) {
    var drp_dJ = drp_bP;
    drp_dJ.setTouchable(true);
    var drp_cQ = 0;
    let drp_ff;
    let drp_fg;
    let drp_fh;
    let drp_fi;
    let drp_fj = 0;
    const drp_fk = 200;
    const drp_fl = 600;
    const drp_fm = 10;
    let drp_fn;
    let drp_fo = false;
    drp_dJ.drag.setOnTouchListener(function (a, b) {
      switch (b.getAction()) {
        case b.ACTION_DOWN:
          drp_ff = b.getRawX();
          drp_fg = b.getRawY();
          drp_fh = drp_dJ.getX();
          drp_fi = drp_dJ.getY();
          drp_fj = new Date().getTime();
          drp_fn = setTimeout(() => {
            var h = {
              ruSHR: function (j) {
                return j();
              },
            };
            drp_fo = true;
            drp_fp();
          }, drp_fl);
          return true;
        case b.ACTION_MOVE:
          let d = b.getRawX() - drp_ff;
          let f = b.getRawY() - drp_fg;
          drp_dJ.setPosition(drp_fh + d, drp_fi + f);
          if (Math.abs(d) > drp_fm || Math.abs(f) > drp_fm) {
            clearTimeout(drp_fn);
            drp_fo = false;
          }
          return true;
        case b.ACTION_UP:
          let g = new Date().getTime();
          if (g - drp_fj < drp_fk) {
            drp_fq();
            drp_fo = false;
            clearTimeout(drp_fn);
          }
          return true;
      }
      return false;
    });
    function drp_fp() {
      try {
        if (!drp_dO) {
          drp_dO = drp_fa();
          var b = String(device.width * 0.8) + 'px';
          var c = String(device.height * 0.8) + 'px';
          drp_dO.config_main.attr('w', b);
          drp_dO.config_main.attr('h', c);
          sleep(500);
        }
        drp_fd();
      } catch (f) {
        log('Error in config button click: ' + f);
      }
    }
    function drp_fq() {
      var b = {
        PMcuP: 'card_title_text not found',
        TYFng: 'tint',
        aimkM: '#66ccff',
        UxEFU: 'Failed to set image tint:',
        elqHk: function (d, f) {
          return d !== f;
        },
        XGYMa: 'Kzwff',
        GRtkx: '[提示] 如果脚本没反应，请重启灭霸和微信',
        HqNTt: '#FF4444',
      };
      var c = b;
      if (drp_cQ == 1) {
        console.error('[状态] 辅助脚本停止');
        drp_dJ.text_status.setText('启动');
        try {
          drp_dJ.drag.attr(c.TYFng, c.aimkM);
        } catch (d) {
          console.error(c.UxEFU, d);
        }
        drp_cQ = 0;
      } else {
        console.error('[状态] 辅助脚本启动');
        if (!drp_dj) {
          if (c.elqHk('Kzwff', c.XGYMa)) {
            f = g;
            h = j;
          } else {
            console.log(c.GRtkx);
            drp_dj = true;
          }
        }
        drp_dJ.text_status.setText('停止');
        try {
          drp_dJ.drag.attr(c.TYFng, c.HqNTt);
        } catch (h) {
          console.error(c.UxEFU, h);
        }
        drp_cQ = 1;
      }
    }
    if (drp_do) {
      ui.post(() => {
        drp_fq();
      });
    }
  } else {
    var drp_dJ = drp_bQ;
    drp_dJ.main_window.attr('alpha', drp_d1);
    function drp_fr() {
      drp_cQ = 1;
      drp_dJ.end.attr('visibility', 'visible');
      drp_dJ.start.attr('visibility', 'gone');
    }
    if (drp_do) {
      ui.post(() => {
        drp_fr();
      });
    }
    function drp_fs() {
      drp_cQ = 0;
      drp_dJ.end.attr('visibility', 'gone');
      drp_dJ.start.attr('visibility', 'visible');
    }
    drp_dJ.start.click(function () {
      drp_fr();
      console.error('[状态] 辅助脚本启动');
      if (!drp_dj) {
        console.log('[提示] 如果脚本没反应，请重启灭霸和微信');
        drp_dj = true;
      }
    });
    drp_dJ.end.click(function () {
      drp_fs();
      console.error('[状态] 辅助脚本停止');
    });
    drp_dJ.move_start.click(function () {
      drp_dJ.setAdjustEnabled(true);
      drp_dJ.move_start.attr('visibility', 'gone');
      drp_dJ.move_end.attr('visibility', 'visible');
    });
    drp_dJ.move_end.click(function () {
      drp_dJ.setAdjustEnabled(false);
      drp_dJ.move_start.attr('visibility', 'visible');
      drp_dJ.move_end.attr('visibility', 'gone');
      var g = drp_dJ.getX();
      var h = drp_dJ.getY();
      drp_dI.put('floaty_position_x', g);
      drp_dI.put('floaty_position_y', h);
      console.warn('[提示] 悬浮窗位置已记录');
    });
  }
  var drp_dO = null;
  var drp_dP = false;
  function drp_f0() {
    var b = {
      purchase_type: drp_cR,
      purchase_count: drp_cS,
      specs: drp_cT,
      refresh_delay: drp_cU,
      enable_random_delay: drp_da,
      extra_delay: drp_cV,
      ack_delay: drp_cX,
      ignore_ack: drp_db,
      special_confirm_delay: drp_d8,
      ignore_ack_click_delay: drp_d2,
      random_refresh_delay_lower: drp_cZ,
      random_refresh_delay_upper: drp_d0,
      max_refresh_time: drp_cW,
      rage_stock_refresh: drp_df,
      legacy_refresh: drp_dr,
      vibrate_time: drp_d7,
      main_window_alpha: drp_d1,
      auto_click_notification: drp_cY,
      reset_floaty_position: drp_d9,
      extra_selection_regex: drp_dh,
      payment_password: drp_di,
      shield_breaker_mode: drp_dk,
      panic_timer: drp_dl,
    };
    return b;
  }
  function drp_f1(b) {
    drp_cR = b.purchase_type;
    drp_cS = b.purchase_count;
    drp_cT = b.specs;
    drp_cU = b.refresh_delay;
    drp_da = b.enable_random_delay;
    drp_cV = b.extra_delay;
    drp_cX = b.ack_delay;
    drp_db = b.ignore_ack;
    drp_d8 = b.special_confirm_delay;
    drp_d2 = b.ignore_ack_click_delay;
    drp_cZ = b.random_refresh_delay_lower;
    drp_d0 = b.random_refresh_delay_upper;
    drp_cW = b.max_refresh_time;
    drp_df = b.rage_stock_refresh;
    drp_dr = b.legacy_refresh !== undefined ? b.legacy_refresh : false;
    drp_d7 = b.vibrate_time;
    drp_d1 = b.main_window_alpha;
    drp_cY = b.auto_click_notification;
    drp_d9 = b.reset_floaty_position;
    drp_dh =
      b.extra_selection_regex !== undefined ? b.extra_selection_regex : '';
    drp_di = b.payment_password !== undefined ? b.payment_password : '';
    drp_dk =
      b.shield_breaker_mode !== undefined ? b.shield_breaker_mode : false;
    drp_dl = b.panic_timer !== undefined ? b.panic_timer : 0;
    if (drp_dJ && drp_dJ.main_window) {
      drp_dJ.main_window.attr('alpha', drp_d1);
    }
  }
  function drp_f2(a) {
    var c = drp_f0();
    var d = drp_f5(a);
    drp_dI.put('preset_' + a, JSON.stringify(c));
    console.info('📁 配置已保存到 ' + d + ' (槽位 ' + a + ')');
    toast('配置已保存到 ' + d);
  }
  function drp_f3(a) {
    var c = drp_dI.get('preset_' + a);
    if (c) {
      try {
        var d = JSON.parse(c);
        var f = drp_f5(a);
        drp_f1(d);
        drp_fe();
        console.info('📁 配置已从 ' + f + ' (槽位 ' + a + ') 加载');
        toast('配置已从 ' + f + ' 加载');
        return true;
      } catch (g) {
        console.error('加载预设失败: ' + g);
        toast('加载预设失败');
        return false;
      }
    }
    return false;
  }
  function drp_f4(b) {
    var f = drp_dI.get('preset_' + b);
    return f && f.length > 0;
  }
  function drp_f5(b) {
    var f = drp_dI.get('preset_name_' + b);
    return f || '预设 ' + b;
  }
  function drp_f6(b, c) {
    if (c && c.trim().length > 0) {
      drp_dI.put('preset_name_' + b, c.trim());
    } else {
      drp_dI.remove('preset_name_' + b);
    }
  }
  function drp_f7(a) {
    var c = drp_f5(a);
    drp_dI.remove('preset_' + a);
    drp_dI.remove('preset_name_' + a);
    console.info('🗑️ 已删除预设: ' + c + ' (槽位 ' + a + ')');
    toast('已删除预设: ' + c);
  }
  function drp_f8() {
    drp_fc();
    var b = [];
    for (var c = 1; c <= 5; c++) {
      var d = drp_f4(c);
      var f = drp_f5(c);
      var g = d ? ' ✓' : ' (空)';
      var h = d ? '📁' : '📂';
      b.push(h + ' ' + f + g);
    }
    b.push('🔙 返回配置');
    dialogs.select('选择预设槽位', b).then((k) => {
      if (k === -1) {
        drp_fb();
        return;
      }
      if (k === 5) {
        drp_fb();
        return;
      }
      var n = k + 1;
      drp_f9(n);
    });
  }
  function drp_f9(a) {
    var b = {
      tUGnr: 'FRwDS',
      Tsjin: function (h, j) {
        return h(j);
      },
      GaBgH: function (h, j) {
        return h + j;
      },
      pmUYN: '📂 加载此预设',
      ZguTx: function (h, j) {
        return h === j;
      },
      jCmrF: ' 吗？\n\n⚠️ 此操作不可恢复',
      mCPzQ: '💾 保存当前配置',
    };
    var c = drp_f4(a);
    var d = b.Tsjin(drp_f5, a);
    var f = [];
    f.push(b.mCPzQ);
    f.push('✏️ 重命名预设');
    if (c) {
      f.push(b.pmUYN);
      f.push('🗑️ 删除此预设');
    }
    f.push('🔙 返回预设列表');
    var g = d + (c ? ' ✓' : ' (空)');
    dialogs.select(g, f).then((h) => {
      var j = {
        womiv: function (o) {
          return o();
        },
        jdWpI: b.tUGnr,
        JdgRI: function (o, p) {
          return b.Tsjin(o, p);
        },
        pSzzp: '📝 预设 ',
        GMKDw: function (o, p) {
          return o(p);
        },
      };
      if (h === -1) {
        drp_f8();
        return;
      }
      var k = f[h];
      if (k === '💾 保存当前配置') {
        dialogs
          .confirm(
            '确认保存',
            b.GaBgH(b.GaBgH('确定要将当前配置保存到 ', d), ' 吗？') +
              (c ? '\n\n⚠️ 这将覆盖现有配置' : ''),
          )
          .then((o) => {
            if (o) {
              drp_f2(a);
            }
            j.womiv(drp_fb);
          });
      } else if (k === b.pmUYN) {
        dialogs
          .confirm(
            '确认加载',
            '确定要加载 ' + d + ' 的配置吗？\n\n⚠️ 当前配置将被覆盖',
          )
          .then((o) => {
            if (j.jdWpI === 'ddhbs') {
              if (l !== null) {
                u = v.trim();
                if (z.length > 0) {
                  E.info('🔤 额外选择规则已设置为: ', F);
                } else {
                  G.info('🔤 额外选择规则已清空');
                }
                D();
              }
              t();
            } else {
              if (o) {
                drp_f3(a);
              }
              drp_fb();
            }
          });
      } else if (k === '✏️ 重命名预设') {
        if (b.ZguTx('MmQls', 'cifgO')) {
          c.text_status.setText('停止');
          d.drag.attr('tint', '#FF4444');
        } else {
          var l = drp_f5(a);
          var m = '预设 ' + a;
          var n = l === m ? '' : l;
          dialogs.rawInput('重命名预设（留空恢复默认）', n, '').then((p) => {
            if (p !== null) {
              drp_f6(a, p);
              var q = p && p.trim().length > 0 ? p.trim() : m;
              console.info(j.pSzzp + a + ' 已重命名为: ' + q);
              j.GMKDw(toast, '预设已重命名为: ' + q);
            }
            drp_f9(a);
          });
        }
      } else if (k === '🗑️ 删除此预设') {
        dialogs.confirm('确认删除', '确定要删除 ' + d + b.jCmrF).then((p) => {
          if (p) {
            drp_f7(a);
          }
          j.womiv(drp_f8);
        });
      } else {
        drp_f8();
      }
    });
  }
  function drp_fa() {
    try {
      drp_dO = drp_bR;
      if (!drp_dO) {
        return;
      }
      drp_dO.setPosition(-10000, -10000);
      drp_dO.setTouchable(false);
      drp_dP = false;
    } catch (b) {
      log('Error creating config window: ' + b);
      drp_dO = null;
      return;
    }
    drp_dO.ignore_ack_config.click(function () {
      drp_db = !drp_db;
      console.info('🚫 特殊刷回流模式已设置为: ', drp_db ? '开启' : '关闭');
      drp_fe();
    });
    drp_dO.delivery_type_config.click(function () {
      drp_fc();
      dialogs
        .select('请选择配送方案', [
          '送到家',
          '到店取',
          '来回刷',
          '来回刷（到店取）',
          '来回刷（送到家）',
        ])
        .then((c) => {
          if (c !== -1) {
            switch (c) {
              case 0:
                drp_cR = '送到家';
                break;
              case 1:
                drp_cR = '到店取';
                break;
              case 2:
                drp_cR = '来回刷';
                break;
              case 3:
                drp_cR = '来回刷（到店取）';
                break;
              case 4:
                drp_cR = '来回刷（送到家）';
                break;
            }
            console.info('配送方案已设置为: ', drp_cR);
            drp_fe();
          }
          drp_fb();
        });
    });
    drp_dO.delivery_number_config.click(function () {
      drp_fc();
      const f = ['1', '2', '手动输入'];
      dialogs.singleChoice('请选择购买数量', f).then((g) => {
        if (g === 2) {
          dialogs.rawInput('请输入购买数量', drp_cS).then((j) => {
            if (parseInt(j) > 0) {
              drp_cS = parseInt(j);
              console.info('购买数量已设置为: ', drp_cS);
              drp_fe();
            } else {
              console.info('请输入正整数, [', j, ']不符合规范');
            }
            drp_fb();
          });
        } else {
          drp_cS = g + 1;
          console.info('购买数量已设置为: ', drp_cS);
          drp_fe();
          drp_fb();
        }
      });
    });
    drp_dO.specs_config.click(function () {
      var c = {
        luXet: function (d, f) {
          return d(f);
        },
        xYMeI: 'WTUJx',
        JVjEQ: 'bXHRj',
        nWmfd: function (d, f) {
          return d === f;
        },
      };
      drp_fc();
      dialogs.select('请选择规格', ['单个', '整盒']).then((d) => {
        var f = {
          zuzBc: function (g, h) {
            return c.luXet(g, h);
          },
          eEtxB: function (g, h) {
            return g + h;
          },
          BDVCt: 'Error showing config window: ',
        };
        if (c.xYMeI !== 'jDzMn') {
          if (d !== -1) {
            if (c.JVjEQ !== 'bXHRj') {
              d.error('您目前使用的是本脚本的付费版, 功能将不会受到限制!');
              f.error('非常感谢您的支持! 目前脚本将全速运行!');
              g.error('有任何问题或功能建议，欢迎您发工单');
            } else {
              drp_cT = c.nWmfd(d, 0) ? '单个' : '整盒';
              console.info('规格已设置为: ', drp_cT);
              drp_fe();
            }
          }
          drp_fb();
        } else {
          f.zuzBc(c, f.eEtxB(f.BDVCt, d));
        }
      });
    });
    drp_dO.refresh_delay_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入库存刷新延迟 (毫秒)', drp_cU).then((c) => {
        var d = parseInt(c);
        if (d >= 0) {
          if (drp_cG) {
            drp_cU = 1000;
            console.log('🚫 试用期不支持修改库存刷新延迟');
          } else {
            drp_cU = d;
            console.info('⏱️ 库存刷新延迟已设置为: ', drp_cU + 'ms');
          }
          drp_fe();
        } else {
          console.info('请输入非负整数');
        }
        drp_fb();
      });
    });
    drp_dO.enable_random_delay_config.click(function () {
      drp_da = !drp_da;
      console.info(
        '🎲 启用额外随机库存刷新间隔已设置为: ',
        drp_da ? '开启' : '关闭',
      );
      drp_fe();
    });
    drp_dO.extra_delay_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入主动操作延迟 (毫秒)', drp_cV).then((c) => {
        var d = parseInt(c);
        if (d >= 0) {
          drp_cV = d;
          console.info('主动操作延迟已设置为: ', drp_cV + 'ms');
          drp_fe();
        } else {
          console.info('请输入非负整数');
        }
        drp_fb();
      });
    });
    drp_dO.ack_delay_config.click(function () {
      drp_fc();
      dialogs
        .rawInput('请输入点击[我知道了]后等待的延迟 (毫秒)', drp_cX)
        .then((d) => {
          var f = parseInt(d);
          if (f >= 0) {
            drp_cX = f;
            console.info(
              '✅ 点击[我知道了]后等待的延迟已设置为: ',
              drp_cX + 'ms',
            );
            drp_fe();
          } else {
            console.info('请输入非负整数');
          }
          drp_fb();
        });
    });
    drp_dO.special_confirm_delay_config.click(function () {
      var c = {
        EoKMi: function (d, f) {
          return d(f);
        },
        AjbXu: 'daGJb',
        WjNQd: function (d) {
          return d();
        },
        HIFfv: '请输入非负整数',
      };
      drp_fc();
      dialogs
        .rawInput('请输入特殊刷回流点击确认延迟 (毫秒)', drp_d8)
        .then((d) => {
          var f = {
            XFfJx: function (h, j) {
              return c.EoKMi(h, j);
            },
            NEthO: function (h, j) {
              return h + j;
            },
          };
          if (c.AjbXu === c.AjbXu) {
            var g = parseInt(d);
            if (g >= 0) {
              drp_d8 = g;
              console.info(
                '⭐ 特殊刷回流点击确认延迟已设置为: ',
                drp_d8 + 'ms',
              );
              c.WjNQd(drp_fe);
            } else {
              console.info(c.HIFfv);
            }
            drp_fb();
          } else {
            f.XFfJx(c, f.NEthO('Error updating config window: ', d));
          }
        });
    });
    drp_dO.ignore_ack_click_delay_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入特殊刷回流点击延迟 (毫秒)', drp_d2).then((d) => {
        var f = parseInt(d);
        if (f >= 0) {
          drp_d2 = f;
          console.info('⏰ 特殊刷回流点击延迟已设置为: ', drp_d2 + 'ms');
          drp_fe();
        } else {
          console.info('请输入非负整数');
        }
        drp_fb();
      });
    });
    drp_dO.random_delay_lower_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入随机延迟下限 (毫秒)', drp_cZ).then((d) => {
        var f = parseInt(d);
        if (f >= 1) {
          drp_cZ = f;
          console.info('⬇️ 随机延迟下限已设置为: ', drp_cZ + 'ms');
          drp_fe();
        } else {
          console.info('请输入大于0的整数');
        }
        drp_fb();
      });
    });
    drp_dO.random_delay_upper_config.click(function () {
      var c = {
        JvIew: function (d, f) {
          return d >= f;
        },
        EImom: '⬆️ 随机延迟上限已设置为: ',
        ZEnHL: function (d) {
          return d();
        },
      };
      drp_fc();
      dialogs.rawInput('请输入随机延迟上限 (毫秒)', drp_d0).then((d) => {
        var f = parseInt(d);
        if (c.JvIew(f, 1)) {
          drp_d0 = f;
          console.info(c.EImom, drp_d0 + 'ms');
          c.ZEnHL(drp_fe);
        } else {
          console.info('请输入大于0的整数');
        }
        drp_fb();
      });
    });
    drp_dO.max_refresh_time_config.click(function () {
      var c = {
        dZhzq: function (d, f) {
          return d >= f;
        },
        jotkO: function (d) {
          return d();
        },
      };
      drp_fc();
      dialogs.rawInput('请输入最大刷新时间 (分钟)', drp_cW).then((d) => {
        var f = parseFloat(d);
        if (c.dZhzq(f, 0)) {
          drp_cW = f;
          console.info('最大刷新时间已设置为: ', drp_cW + '分钟');
          c.jotkO(drp_fe);
        } else {
          console.info('请输入非负数');
        }
        drp_fb();
      });
    });
    drp_dO.rage_stock_refresh_config.click(function () {
      drp_df = !drp_df;
      console.info('⚡ 狂暴库存刷新模式已设置为: ', drp_df ? '开启' : '关闭');
      drp_fe();
    });
    drp_dO.legacy_refresh_config.click(function () {
      var c = {
        BAXzX: function (f, g) {
          return f + g;
        },
      };
      var d = c;
      drp_dr = !drp_dr;
      console.info('🔄 上下刷新模式已设置为: ', drp_dr ? '开启' : '关闭');
      drp_fe();
    });
    drp_dO.vibrate_time_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入抢购成功振动时长 (毫秒)', drp_d7).then((d) => {
        var f = parseInt(d);
        if (f >= 0) {
          drp_d7 = f;
          console.info('抢购成功振动时长已设置为: ', drp_d7 + 'ms');
          drp_fe();
        } else {
          console.info('请输入非负整数');
        }
        drp_fb();
      });
    });
    drp_dO.main_window_alpha_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入窗口透明度 (0.0-1.0)', drp_d1).then((c) => {
        var f = parseFloat(c);
        if (f >= 0 && f <= 1) {
          drp_d1 = f;
          drp_dJ.main_window.attr('alpha', drp_d1);
          console.info('🔍 窗口透明度已设置为: ', drp_d1);
          drp_fe();
        } else {
          console.info('请输入0.0到1.0之间的数值');
        }
        drp_fb();
      });
    });
    drp_dO.auto_click_notification_config.click(function () {
      drp_cY = !drp_cY;
      console.info('🔔 自动点击到货通知已设置为: ', drp_cY ? '开启' : '关闭');
      drp_fe();
    });
    drp_dO.reset_floaty_position_config.click(function () {
      drp_d9 = !drp_d9;
      console.info('🔄 重置悬浮窗位置已设置为: ', drp_d9 ? '开启' : '关闭');
      drp_fe();
    });
    drp_dO.extra_selection_regex_config.click(function () {
      drp_fc();
      dialogs
        .rawInput(
          '请输入额外选择规则 (支持 | 或 ｜ 分隔，如: A组|7.29｜黑)',
          drp_dh || '',
        )
        .then((c) => {
          if (c !== null) {
            drp_dh = c.trim();
            if (drp_dh.length > 0) {
              console.info('🔤 额外选择规则已设置为: ', drp_dh);
            } else {
              console.info('🔤 额外选择规则已清空');
            }
            drp_fe();
          }
          drp_fb();
        });
    });
    drp_dO.shield_breaker_mode_config.click(function () {
      drp_dk = !drp_dk;
      console.info('🛡️ 破盾模式已设置为: ', drp_dk ? '开启' : '关闭');
      drp_fe();
    });
    drp_dO.ignore_ack_panic_timer_config.click(function () {
      drp_fc();
      dialogs
        .rawInput('请输入自动关闭特殊刷回流时间 (秒，0表示关闭)', drp_dm)
        .then((d) => {
          var f = parseInt(d);
          if (f >= 0) {
            drp_dm = f;
            if (drp_dm > 0) {
              console.info(
                '⏰ 自动关闭特殊刷回流时间已设置为: ',
                drp_dm + '秒',
              );
            } else {
              console.info('⏰ 自动关闭特殊刷回流已关闭');
            }
            drp_fe();
          } else {
            console.info('请输入非负整数');
          }
          drp_fb();
        });
    });
    drp_dO.panic_timer_config.click(function () {
      drp_fc();
      dialogs
        .rawInput('请输入自动关闭破盾模式时间 (秒，0表示关闭)', drp_dl)
        .then((d) => {
          var g = parseInt(d);
          if (g >= 0) {
            drp_dl = g;
            if (drp_dl > 0) {
              console.info('⏰ 自动关闭破盾模式时间已设置为: ', drp_dl + '秒');
            } else {
              console.info('⏰ 自动关闭破盾模式已关闭');
            }
            drp_fe();
          } else {
            console.info('请输入非负整数');
          }
          drp_fb();
        });
    });
    drp_dO.payment_password_config.click(function () {
      drp_fc();
      dialogs.rawInput('请输入6位支付密码', drp_di || '').then((c) => {
        if (c !== null) {
          let d = c.trim();
          if (d.length === 6 && /^\d{6}$/.test(d)) {
            drp_di = d;
            console.info('🔒 支付密码已设置为: ', drp_di);
            drp_fe();
          } else {
            console.error('❌ 支付密码必须是6位数字，请重新输入');
            dialogs.alert('密码格式错误', '支付密码必须是6位数字，请重新设置');
          }
        }
        drp_fb();
      });
    });
    drp_dO.close_config.click(function () {
      drp_fc();
    });
    drp_dO.preset_config.click(function () {
      drp_f8();
    });
    return drp_dO;
  }
  function drp_fb() {
    if (drp_dO && !drp_dP) {
      try {
        ui.post(() => {
          var h = Math.floor(device.width * 0.8) + 'px';
          var j = Math.floor(device.height * 0.8) + 'px';
          drp_dO.config_main.attr('w', h);
          drp_dO.config_main.attr('h', j);
          var h = device.width * 0.8 || device.width * 0.8;
          var j = device.height * 0.8 || device.height * 0.8;
          var l = Math.floor(device.width / 2 - h / 2);
          var k = Math.floor(device.height / 2 - j / 2);
          drp_dO.setPosition(l, k);
          drp_dO.setTouchable(true);
          drp_dP = true;
        });
        drp_fe();
      } catch (c) {
        log('Error showing config window: ' + c);
      }
    }
  }
  function drp_fc() {
    if (drp_dO && drp_dP) {
      try {
        ui.post(() => {
          drp_dO.setPosition(-10000, -10000);
          drp_dO.setTouchable(false);
          drp_dP = false;
        });
      } catch (d) {
        log('Error hiding config window: ' + d);
      }
    }
  }
  function drp_fd() {
    try {
      if (drp_dP) {
        drp_fc();
      } else {
        drp_fb();
      }
    } catch (c) {
      log('Error toggling config window: ' + c);
    }
  }
  function drp_fe() {
    if (drp_dO) {
      if (drp_dt != 200) {
        return;
      }
      try {
        drp_dO.delivery_type_config.setText(
          '🚚 配送方式: ' + (drp_cR || '到店取'),
        );
        drp_dO.delivery_number_config.setText('📦 配送数量: ' + (drp_cS || 1));
        drp_dO.specs_config.setText('📏 规格: ' + (drp_cT || '单个'));
        drp_dO.refresh_delay_config.setText(
          '⏱️ 库存刷新刷新延迟: ' + drp_cU + 'ms',
        );
        drp_dO.enable_random_delay_config.setText(
          '🎲 启用额外随机库存刷新间隔: ' + (drp_da ? '开启' : '关闭'),
        );
        drp_dO.extra_delay_config.setText('⏰ 主动操作延迟: ' + drp_cV + 'ms');
        drp_dO.ack_delay_config.setText(
          '✅ 点击[我知道了]后等待的延迟: ' + drp_cX + 'ms',
        );
        drp_dO.ignore_ack_config.setText(
          '🚫 特殊刷回流模式(不点击我知道了): ' + (drp_db ? '开启' : '关闭'),
        );
        drp_dO.special_confirm_delay_config.setText(
          '⭐ 特殊刷回流点击确认延迟: ' + drp_d8 + 'ms',
        );
        drp_dO.ignore_ack_click_delay_config.setText(
          '⏰ 特殊刷回流点击延迟: ' + drp_d2 + 'ms',
        );
        drp_dO.random_delay_lower_config.setText(
          '⬇️ 随机延迟下限: ' + drp_cZ + 'ms',
        );
        drp_dO.random_delay_upper_config.setText(
          '⬆️ 随机延迟上限: ' + drp_d0 + 'ms',
        );
        drp_dO.max_refresh_time_config.setText(
          '⌛ 最大刷新时间: ' + drp_cW + '分钟',
        );
        drp_dO.rage_stock_refresh_config.setText(
          '⚡ 狂暴库存刷新模式: ' + (drp_df ? '开启' : '关闭'),
        );
        drp_dO.legacy_refresh_config.setText(
          '🔄 上下刷新模式: ' + (drp_dr ? '开启' : '关闭'),
        );
        drp_dO.vibrate_time_config.setText(
          '📳 抢购成功振动时长: ' + drp_d7 + 'ms',
        );
        drp_dO.main_window_alpha_config.setText('🔍 窗口透明度: ' + drp_d1);
        drp_dO.auto_click_notification_config.setText(
          '🔔 自动点击到货通知: ' + (drp_cY ? '开启' : '关闭'),
        );
        drp_dO.reset_floaty_position_config.setText(
          '🔄 重置悬浮窗位置: ' + (drp_d9 ? '开启' : '关闭'),
        );
        drp_dO.extra_selection_regex_config.setText(
          '🔤 额外选择规则: ' + (drp_dh || '未设置'),
        );
        drp_dO.shield_breaker_mode_config.setText(
          '🛡️ 破盾模式: ' + (drp_dk ? '开启' : '关闭'),
        );
        drp_dO.ignore_ack_panic_timer_config.setText(
          '⏰ 自动关闭特殊刷回流: ' + (drp_dm > 0 ? drp_dm + '秒' : '关闭'),
        );
        drp_dO.panic_timer_config.setText(
          '⏰ 自动关闭破盾模式: ' + (drp_dl > 0 ? drp_dl + '秒' : '关闭'),
        );
        drp_dO.payment_password_config.setText(
          '🔒 支付密码: ' + (drp_di || '未设置'),
        );
      } catch (f) {
        log('Error updating config window: ' + f);
      }
    }
  }
  if (!drp_dd) {
    drp_dJ.config_settings.click(function () {
      ui.post(() => {
        try {
          if (!drp_dO) {
            drp_dO = drp_fa();
            drp_fe();
            var b = String(device.width * 0.8) + 'px';
            var c = String(device.height * 0.8) + 'px';
            drp_dO.config_main.attr('w', b);
            drp_dO.config_main.attr('h', c);
            sleep(500);
          }
          drp_fd();
        } catch (d) {
          log('Error in config button click: ' + d);
        }
      });
    });
  }
  var drp_dK = drp_dI.get('floaty_position_x');
  var drp_dL = drp_dI.get('floaty_position_y');
  var drp_dM = device.width / 2 + 100;
  var drp_dN = drp_dJ.getY() + 100;
  if (
    typeof drp_dK === 'number' &&
    typeof drp_dL === 'number' &&
    drp_dK >= 0 &&
    drp_dK + 100 <= device.width &&
    !drp_d9
  ) {
    console.warn('[提示] 悬浮窗位置已读取');
    drp_dJ.setPosition(drp_dK, drp_dL);
  } else {
    console.warn('[提示] 已使用默认悬浮窗位置');
    drp_dJ.setPosition(drp_dM, drp_dN);
  }
  var drp_dO = drp_fa();
}
function drp_dQ(a) {
  var c = a.findOne(text('购买方式'));
  if (!c) {
    console.log('Exit button not found');
    return null;
  }
  var d = c.parent();
  if (!d) {
    console.log('Parent1 not found');
    return null;
  }
  var f = d.parent();
  if (!f) {
    console.log('Parent2 not found');
    return null;
  }
  var g = f.parent();
  if (!g) {
    console.log('Exit button parent not found');
    return null;
  }
  var h = g.child(0);
  if (!h) {
    console.log('Exit button child not found');
    return null;
  }
  if (h.className() !== 'android.widget.Image') {
    console.log('Exit button child is not an Image');
    return null;
  }
  return h;
}
var drp_dR = drp_dH;
var drp_dS = 1984;
function drp_dT() {
  var d = className('android.widget.TextView').text('到货通知').findOne(50);
  if (d) {
    console.warn('[操作] 已点击到货通知按钮');
    d.click();
  }
}
var drp_dU =
  'yRFxy902vYq9Kotiy4bU6LIWIx1TlMc07SKjZNXIeV3wAkXEMhzvwlY9y1ekT6C7dp4rvWSlAnUbAMeFOrXUq87xvFnA4U4ftGg3TRLG0{SV{tEy,:m*PNMHFupL79ugesPUPOHhOw==';
drp_dS = drp_dS + drp_dt;
function drp_dV(b, c) {
  let g = b;
  let h = 0;
  while (g != null && h < c) {
    try {
      g = g.child(0);
    } catch (k) {
      log('Exception at level ' + h + ': ' + k);
      return null;
    }
    h++;
  }
  return g;
}
var drp_dW = drp_dS != 1984;
var drp_dX = threads;
function drp_dY(a) {
  var c = {
    HZXTs: function (h, j) {
      return h(j);
    },
    yYGrM: function (h) {
      return h();
    },
    HvOFk: '请输入非负整数',
    JSHnS: function (h, j) {
      return h !== j;
    },
    PGCZe: 'FpoGy',
    KGacf: function (h, j) {
      return h + j;
    },
    qZknf: function (h, j) {
      return h != j;
    },
    EupyD: 'qpKQF',
    ijZcd: function (h, j) {
      return h < j;
    },
    teJhu: 'IMEwJ',
  };
  var d = null;
  var f = a;
  for (var g = 0; g < 13; g++) {
    if (f == null) {
      break;
    }
    if (f.className() === 'android.widget.RelativeLayout') {
      if (c.JSHnS(c.PGCZe, 'XXOMn')) {
        d = f;
      } else {
        b.error('clicked confirm_btn (physical click)');
      }
    }
    f = f && f.parent();
  }
  if (c.KGacf(drp_dt, 1) != 201) {
    drp_c0();
  }
  if (c.qZknf(d, null)) {
    if (c.EupyD !== 'iycDp') {
      f = d;
      for (var g = 0; c.ijZcd(g, 2); g++) {
        if (f == null) {
          break;
        }
        f = f.parent();
      }
      if (f != null) {
        if (c.teJhu === 'owDBD') {
          b.drag.attr('tint', '#FF4444');
        } else {
          let k = f.bounds();
        }
      } else {
        log('Top node is null after going up 3 parents.');
      }
    } else {
      b.log('Exit button not found');
      return null;
    }
  } else {
    log('No RelativeLayout found in 13 levels.');
  }
  return f;
}
if (!drp_dW) {
  drp_dX.start(function () {
    while (true) {
      drp_cQ = 0;
    }
  });
}
function drp_dZ(a) {
  if (!a) {
    return 'no_header';
  }
  if (a.childCount() === 0) {
    return 'no_header';
  }
  var c = a.child(0);
  if (!c) {
    return 'no_header';
  }
  if (c.className() !== 'android.widget.RelativeLayout') {
    return 'no_header';
  }
  var d = c.children();
  if (!d || d.length === 0) {
    return '';
  }
  if (drp_dS - 1984 != 200) {
    return 'no_header';
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
    return '';
  }
  var l = g && g.childCount() > 0 ? g.child(0) : null;
  if (!l) {
    return '';
  }
  var m = l.findOne(className('android.widget.TextView').algorithm('BFS'));
  if (!m) {
    return '';
  }
  return m.text();
}
function drp_e0() {
  var d = className('android.widget.RelativeLayout')
    .algorithm('BFS')
    .findOne(100);
  if (!d) {
    return null;
  }
  if (!d.parent()) {
    return null;
  }
  var f = d.parent();
  if (!f) {
    return null;
  }
  if (!f.parent()) {
    return null;
  }
  d = f.parent();
  return d;
}
function drp_e1(a) {
  var c = a.bounds();
  var d = c.centerX();
  var f = c.centerY();
  click(d, f);
}
function drp_e2() {
  if (drp_e6 == -1 || drp_e7 == -1) {
    return;
  }
  click(drp_e6, drp_e7);
  sleep(200);
}
function drp_e3(b) {
  if (drp_e6 != -1 && drp_e7 != -1) {
    return;
  }
  var j = b.bounds();
  var k = device.width;
  var n = device.height;
  var l = j.centerX();
  var m = j.centerY();
  if (l < 0 || l > k || m < 0 || m > n) {
    return;
  }
  drp_e6 = l;
  drp_e7 = m;
  var h = storages.create('DRP');
  h.put('unstuck_cap_btn_x', drp_e6);
  h.put('unstuck_cap_btn_y', drp_e7);
}
var drp_e4 = drp_c5;
function drp_e5() {
  var d = storages.create('DRP');
  drp_e6 = d.get('unstuck_cap_btn_x', -1);
  drp_e7 = d.get('unstuck_cap_btn_y', -1);
  if (drp_e6 != -1 && drp_e7 != -1) {
    return;
  }
  drp_e6 = -1;
  drp_e7 = -1;
}
var drp_e6 = -1;
var drp_e7 = -1;
drp_e5();
if (!drp_dR) {
  drp_e4();
}
function drp_e8(b) {
  var c = {
    yDKnl: 'android.view.View',
    ecgFs: function (o, p) {
      return o - p;
    },
    FFRIf: 'webview_count: ',
    TTyOl: function (o, p) {
      return o - p;
    },
    kIULs: function (o, p) {
      return o !== p;
    },
    xRajd: 'snFbb',
  };
  var d = c;
  var f = b.childCount();
  if (f == 0) {
    return null;
  }
  if (drp_cm) {
    console.error(d.FFRIf + b.childCount());
  }
  var g = 0;
  var h = d.TTyOl(f, 1);
  var j = false;
  for (var k = 0; k < f; k++) {
    var l = b.child(k);
    var m = drp_dZ(l);
    var n = l ? l.drawingOrder() : 0;
    if (n === 0) {
      j = true;
      break;
    }
    if (n > g) {
      g = n;
      h = k;
    }
  }
  if (j) {
    if (d.kIULs(d.xRajd, 'snFbb')) {
      var p = c.child(0);
      if (p && p.className() === d.yDKnl) {
        f = p.child(d.ecgFs(p.childCount(), 1));
      }
    } else {
      return b.child(f - 1);
    }
  }
  return b.child(h);
}
function drp_e9(b) {
  return (
    b.findOne(className('android.webkit.WebView').algorithm('DFS')) || null
  );
}
function drp_ea(a) {
  if (!a) {
    return null;
  }
  if (a.childCount() < 1) {
    return null;
  }
  var c = a.child(0);
  if (!c) {
    return null;
  }
  if (!drp_dR) {
    return null;
  }
  if (c.className() !== 'android.widget.RelativeLayout') {
    return null;
  }
  var d = null;
  var f = Number.MAX_VALUE;
  var g = c.childCount();
  for (var h = 0; h < g; h++) {
    var j = c.child(h);
    if (!j) {
      continue;
    }
    var k = j.drawingOrder();
    if (k < f) {
      f = k;
      d = j;
    }
  }
  if (!d) {
    return null;
  }
  if (d.childCount() < 1) {
    return null;
  }
  var l = d.child(0);
  if (!l) {
    return null;
  }
  if (!drp_dG) {
    return null;
  }
  var m = null;
  var n = l.childCount();
  for (var h = 0; h < n; h++) {
    var j = l.child(h);
    if (!j) {
      continue;
    }
    if (j.drawingOrder() === 2) {
      m = j;
      break;
    }
  }
  if (!m) {
    return null;
  }
  var o = m.child(0);
  if (!o || o.childCount() < 1) {
    return null;
  }
  o = o.child(0);
  if (!o || o.childCount() < 1) {
    return null;
  }
  o = o.child(0);
  if (!o || o.childCount() < 1) {
    return null;
  }
  o = o.child(0);
  if (!o) {
    return null;
  }
  var p = null;
  var q = o.childCount();
  for (var h = 0; h < q; h++) {
    var j = o.child(h);
    if (!j) {
      continue;
    }
    if (j.drawingOrder() === 0) {
      p = j;
      break;
    }
  }
  if (!p) {
    return null;
  }
  if (p.childCount() < 1) {
    return null;
  }
  var r = p.child(0);
  if (!r) {
    return null;
  }
  if (r.className() === 'android.webkit.WebView') {
    return r;
  }
  return null;
}
function drp_eb(n, o) {
  var p = {
    MQsmy: function (J) {
      return J();
    },
    yCLOU: function (J, K) {
      return J - K;
    },
    bPXoW: function (J, K) {
      return J(K);
    },
    ZHCaP: function (J, K) {
      return J === K;
    },
    IGqzM: function (J, K) {
      return J !== K;
    },
    AxpZq: 'CRnqA',
    nkPin: function (J, K) {
      return J === K;
    },
    gSrir: 'confirm_and_pay',
    FIlEi: function (J, K) {
      return J == K;
    },
    dhpTI: 'purchase',
    GBrnI: function (J, K) {
      return J(K);
    },
    pMIli: '距开售还剩',
    VSnYw: 'KUigt',
    cstzh: 'RGQvp',
    Rbmhh: function (J, K) {
      return J !== K;
    },
    UHHVV: 'weluN',
    TRvjW: 'preorder',
    rHWNv: 'default',
  };
  if (!o) {
    if (p.ZHCaP('nQVou', 'nQVou')) {
      var q = {
        header: n,
        status: 'no_webview',
      };
      return q;
    } else {
      E = G;
      if (H > 0) {
        q.info('⏰ 自动关闭破盾模式时间已设置为: ', r + '秒');
      } else {
        s.info('⏰ 自动关闭破盾模式已关闭');
      }
      p.MQsmy(p);
    }
  }
  if (drp_dt != 200) {
    if (p.IGqzM('HDebz', p.AxpZq)) {
      return;
    } else {
      A.observeNotification();
      B.error('[控制] 正在监听微信消息通知');
      C.error('[控制] 正在监控的群组: ' + E.join(', '));
    }
  }
  if (p.nkPin(n, '确认订单') || n === '访问异常，请稍后重试') {
    var r = {
      header: n,
      status: p.gSrir,
    };
    return r;
  } else if (p.FIlEi(n, '') || n != 'no_header') {
    var s = Date.now();
    var t = drp_ef(o);
    if (t) {
      var u = {
        header: n,
        status: p.dhpTI,
      };
      return u;
    }
    if (!drp_dH) {
      var v = {
        header: n,
        status: 'no_webview',
      };
      return v;
    }
    var z = p.GBrnI(drp_ee, o);
    if (z && p.FIlEi(z.text(), '立即购买')) {
      var A = {
        header: n,
        status: 'info_page',
      };
      return A;
    } else if (z && (z.text().startsWith(p.pMIli) || z.text() == '参与抢购')) {
      if (p.IGqzM(p.VSnYw, p.cstzh)) {
        var B = {
          header: n,
          status: 'preorder',
        };
        return B;
      } else {
        u = v.child(0);
      }
    } else if (z && z.text().startsWith('距离开售时间还剩')) {
      if (p.Rbmhh(p.UHHVV, 'AYIjI')) {
        var C = {
          header: n,
          status: 'presale',
        };
        return C;
      } else {
        switch (T.getAction()) {
          case ax.ACTION_DOWN:
            ay = az.getRawX();
            aA = aB.getRawY();
            aC = aD.getX();
            aE = aF.getY();
            aG = new aH().getTime();
            aI = aJ(() => {
              ba = true;
              bb();
            }, aM);
            return true;
          case aN.ACTION_MOVE:
            let N = p.yCLOU(aO.getRawX(), aP);
            let O = p.yCLOU(aQ.getRawY(), aR);
            aS.setPosition(aT + N, aU + O);
            if (aV.abs(N) > aW || aX.abs(O) > aY) {
              ba(bb);
              bc = false;
            }
            return true;
          case b2.ACTION_UP:
            let P = new b3().getTime();
            if (P - b4 < b5) {
              bd();
              be = false;
              p.bPXoW(bf, bg);
            }
            return true;
        }
        return false;
      }
    }
    var D = o.findOne(textStartsWith('*您即将进入抢购'));
    if (D) {
      var E = {
        header: n,
        status: p.TRvjW,
      };
      return E;
    }
    var F = o.findOne(textStartsWith('继续等待'));
    if (F) {
      var G = {
        header: n,
        status: 'keep_waiting',
      };
      return G;
    }
    var H = {
      header: n,
      status: 'default',
    };
    return H;
  } else {
    var I = {
      header: n,
      status: p.rHWNv,
    };
    return I;
  }
}
function drp_ec(b) {
  var c = {
    IGixv: function (k, l) {
      return k !== l;
    },
    oAUXj: 'android.widget.TextView',
  };
  var d = c;
  if (!b) {
    if (d.IGixv('QMnof', 'AGFQr')) {
      return;
    } else {
      f.warn('[提示] 悬浮窗位置已读取');
      g.setPosition(h, j);
    }
  }
  var f = b.findOne(className(d.oAUXj).text('数量').algorithm('DFS'));
  if (!f) {
    return;
  }
  var g = f.indexInParent();
  var h = f.parent();
  if (!h) {
    return;
  }
  if (h.childCount() < g + 4) {
    if (d.IGixv('UJXZP', 'BEmVz')) {
      return;
    } else {
      c.click();
      d(10);
    }
  }
  var j = h.child(g + 3);
  if (!j) {
    return;
  }
  j.click();
}
function drp_ed(a, b) {
  var d = a.findOne(
    className('android.widget.TextView').text('数量').algorithm('DFS'),
  );
  var f = d.indexInParent();
  var g = d.parent();
  var h = g.child(f + 1);
  var j = g.child(f + 2);
  var k = g.child(f + 3);
  var l = parseInt(j.text());
  if (isNaN(l)) {
    console.warn('无法处理购买数量: ' + j.text());
    return;
  }
  var l = parseInt(j.text());
  if (l === b) {
    if (drp_dS < 2000) {
      drp_cQ = 0;
    }
    console.warn('[操作] 当前已满足购买数量要求: ' + l);
    return;
  }
  if (l > b) {
    var m = l - b;
    for (var n = 0; n < m; n++) {
      h.click();
      sleep(10);
    }
  } else {
    var m = b - l;
    for (var n = 0; n < m; n++) {
      k.click();
      sleep(10);
    }
  }
}
function drp_ee(b) {
  var c = {
    OKyAH: 'clicked current_selection_btn: ',
    MARfj: function (m, n) {
      return m >= n;
    },
    IklUJ: 'Cannot find last view.',
    OgbNg: function (m, n) {
      return m === n;
    },
    NHlor: 'MGvYv',
    KPEOL: function (m, n) {
      return m + n;
    },
    dduCc: 'last_view error: ',
    KpzEC: function (m, n) {
      return m !== n;
    },
    Zamdz: 'last_child is null or not android.view.View',
    JXJJw: function (m, n) {
      return m !== n;
    },
  };
  var d = c;
  if (!drp_dH) {
    return null;
  }
  var f = null;
  var g = b.childCount();
  for (var h = g - 1; d.MARfj(h, 0); h--) {
    try {
      var j = b.child(h);
    } catch (m) {
      break;
    }
    if (!j) {
      break;
    }
    if (j.className() === 'android.view.View') {
      f = j;
      break;
    }
  }
  if (!f) {
    if (drp_cm) {
      log(d.IklUJ);
      log('last_view is null');
    }
    return null;
  }
  if (f.childCount() != 1 && f.childCount() != 2) {
    if (d.OgbNg(d.NHlor, 'MGvYv')) {
      if (drp_cm) {
        log(d.KPEOL(d.dduCc, f.childCount()));
      }
      return null;
    } else {
      return '';
    }
  }
  var k = f.child(f.childCount() - 1);
  if (!k || d.KpzEC(k.className(), 'android.view.View')) {
    if (drp_cm) {
      log(d.Zamdz);
    }
    return null;
  }
  if (k.childCount() < 1) {
    if (drp_cm) {
      log('last_child does not have at least one child');
    }
    return null;
  }
  var l = k.child(k.childCount() - 1);
  if (!l || d.JXJJw(l.className(), 'android.widget.TextView')) {
    if (drp_cm) {
      log('last_child_last_child is null or not android.widget.TextView');
    }
    return null;
  }
  return l;
}
function drp_ef(a) {
  var b = {
    rJaoV: function (m, n) {
      return m(n);
    },
    yVKBc: function (m, n) {
      return m(n);
    },
    UnZPV: '请输入0.0到1.0之间的数值',
    zIzwL: function (m) {
      return m();
    },
    fFqfW: '[提示] 如果脚本没反应，请重启hamibot和微信',
    rCNCb: '到店取',
    WlyNl: 'YXdCL',
    kGpSz: 'android.view.View',
    grZlC: function (m, n) {
      return m(n);
    },
    sOpTS: 'Cannot find last view.',
    SxUgA: function (m, n) {
      return m < n;
    },
    ZnDXw: 'last_view has less than 2 children',
    NKhdX: 'iPteE',
    RDZJW: 'last_child does not have exactly 1 child',
    ohnqs: 'last_child_0 is null or not android.view.View',
    TRvkZ: function (m, n) {
      return m != n;
    },
    WZEjK: function (m, n) {
      return m !== n;
    },
    JjmqK: 'lFBHK',
  };
  var c = null;
  var d = a.childCount();
  for (var f = d - 1; f >= 0; f--) {
    try {
      if (b.WlyNl === 'PFANx') {
        return null;
      } else {
        var g = a.child(f);
      }
    } catch (n) {
      break;
    }
    if (!g) {
      break;
    }
    if (g.className() === b.kGpSz) {
      c = g;
      break;
    }
  }
  if (!c) {
    if (drp_cm) {
      b.grZlC(log, b.sOpTS);
      log('last_view is null');
    }
    sleep(30);
    return null;
  }
  if (b.SxUgA(c.childCount(), 2)) {
    if (drp_cm) {
      log(b.ZnDXw);
    }
    return null;
  }
  var h = c.child(c.childCount() - 1);
  if (!h || h.className() !== 'android.view.View') {
    if (drp_cm) {
      log('last_child is null or not android.view.View');
    }
    return null;
  }
  if (h.childCount() != 1) {
    if (b.NKhdX !== 'iPteE') {
      b.rJaoV(d, f.max(g / 4, 100));
    } else {
      if (drp_cm) {
        log(b.RDZJW);
      }
      return null;
    }
  }
  var j = h.child(0);
  if (!j || j.className() !== b.kGpSz) {
    if (drp_cm) {
      log(b.ohnqs);
    }
    return null;
  }
  if (b.TRvkZ(j.childCount(), 1)) {
    if (drp_cm) {
      log('last_child_0 does not have exactly 1 child');
    }
    return null;
  }
  var k = j.child(0);
  if (!k || b.WZEjK(k.className(), 'android.view.View')) {
    if (drp_cm) {
      log('last_child_0_0 is null or not android.view.View');
    }
    return null;
  }
  if (k.childCount() != 3) {
    if (drp_cm) {
      log('last_child_0_0 does not have exactly 3 children');
    }
    return null;
  }
  var l = k.child(2);
  if (!l || b.WZEjK(l.className(), 'android.view.View')) {
    if (b.JjmqK !== 'Feomq') {
      if (drp_cm) {
        log('last_child_0_0_2 is null or not android.view.View');
      }
      return null;
    } else {
      if (d) {
        h.cancelKeepingAwake();
      }
      g.hide();
    }
  }
  return l;
}
function drp_eg(b) {
  var f = drp_ef(b);
  if (!f) {
    return null;
  }
  if (f.childCount() == 1) {
    var g = f.child(0);
    if (g && g.text() == '确定') {
      return g;
    }
  }
  return null;
}
function drp_eh(b) {
  var f = drp_ef(b);
  if (!f) {
    return null;
  }
  if (f.childCount() >= 2) {
    return true;
  } else if (f.childCount() == 1) {
    var g = f.child(0);
    if (g && g.text() == '该渠道暂不发售') {
      return true;
    }
  }
  return false;
}
function drp_ei(b) {
  if (!drp_dR) {
    return null;
  }
  if (!b) {
    return null;
  }
  if (b.childCount() == 2) {
    var f = b.child(1);
    if (f && f.className() === 'android.view.View') {
      return f;
    }
  }
  return null;
}
var drp_ej = 0;
function drp_ek() {
  while (true) {
    if (drp_cQ == 0) {
      sleep(200);
      continue;
    }
    if (drp_eQ === null) {
      drp_ej++;
    } else {
      drp_ej = 0;
      sleep(100);
      continue;
    }
    if (!drp_ey && drp_ej < 3) {
      sleep(100);
      continue;
    }
    var b = textMatches(/付款方式|支付工具/).findOne(50);
    if (!b) {
      sleep(100);
      continue;
    }
    drp_ey = false;
    console.error('[页面检测] 当前处于支付页面');
    console.warn('[通知] 抢购完成! 祝老板大赚!');
    device.vibrate(drp_d7);
    let d = drp_di;
    if (d.length != 6 || !/^\d{6}$/.test(d)) {
      sleep(500);
      continue;
    }
    sleep(600);
    console.error('[支付] 开始输入支付密码');
    let f = 0;
    while (f < 50) {
      var c = text('0').findOne(300);
      if (c) {
        break;
      }
      sleep(100);
      f++;
    }
    console.error('[支付] 已找到键盘，开始输入密码');
    for (let m = 0; m < d.length; m++) {
      let n = d[m];
      let o = text(n).findOne(300);
      if (!o) {
        sleep(130);
        continue;
      }
      o.click();
      sleep(200);
    }
    console.error('[支付] 支付密码输入完成');
    sleep(1000);
    let g = text('重试').findOne(300);
    if (g) {
      console.error('[支付] 支付失败');
      sleep(1000);
    }
  }
}
var drp_el = null;
var drp_el = threads.start(function () {
  drp_ek();
});
function drp_em() {
  while (true) {
    if (drp_cQ == 0 || !drp_dk || drp_ev()) {
      sleep(200);
      continue;
    }
    if (drp_eM && drp_eM.status != 'confirm_and_pay') {
      sleep(50);
      continue;
    }
    try {
      var b = null;
      var c = [drp_eN, drp_eO, drp_eP];
      for (var d of c) {
        if (!d) {
          continue;
        }
        var f = d.child(d.childCount() - 1);
        if (f && f.text() === '确认信息并支付') {
          b = f;
          break;
        }
      }
      if (b) {
        drp_eH++;
        drp_eG = 0;
        if (drp_eH >= 5) {
          if (drp_cm) {
            console.error(
              'clicked confirm_btn with cap_btn, retry count: ' + drp_eH,
            );
          }
          console.error('多次尝试点击「确认信息并支付」失败，使用后备方案。');
          drp_e2();
        } else {
          b.click();
          drp_e3(b);
          sleep(100);
          if (drp_cm) {
            console.error('clicked confirm_btn, retry count: ' + drp_eH);
          }
        }
        sleep(drp_cV);
        continue;
      }
    } catch (l) {
      continue;
    }
  }
}
function drp_en() {
  while (true) {
    if (drp_cQ == 0 || !drp_dk || drp_ev()) {
      sleep(200);
      continue;
    }
    if (drp_eM && drp_eM.status != 'confirm_and_pay') {
      sleep(50);
      continue;
    }
    try {
      var b = null;
      var c = [drp_eN, drp_eO, drp_eP];
      for (var d of c) {
        if (!d || d.childCount() != 2) {
          continue;
        }
        var f = d.child(1);
        if (f && f.className() === 'android.view.View') {
          if (f.childCount() == 1) {
            var g = f.child(0);
            if (g && g.className() === 'android.view.View') {
              b = g.child(g.childCount() - 1);
              break;
            }
          }
        }
      }
      if (b && b.text() != '我知道了') {
        drp_eH = 0;
        if (drp_eG == 0) {
          drp_d3 = new Date().getTime();
          b.click();
          sleep(100);
          if (drp_cm) {
            console.error('clicked double_confirm');
          }
          drp_ey = true;
          drp_eG++;
        } else {
          drp_eG++;
          sleep(20);
        }
        continue;
      }
    } catch (n) {
      continue;
    }
  }
}
var drp_eo = null;
var drp_eo = threads.start(function () {
  drp_em();
});
var drp_ep = null;
var drp_ep = threads.start(function () {
  drp_en();
});
function drp_eq() {
  var b = className('androidx.recyclerview.widget.RecyclerView').find();
  let c = 0;
  while (b.length <= 1 && c < 50) {
    console.error('[控制] 正在等待消息加载');
    sleep(300);
    b = className('androidx.recyclerview.widget.RecyclerView').find();
    c++;
  }
  if (!drp_dR) {
    drp_c5();
  }
  let d = b.length >= 2 ? 1 : 0;
  for (let p = d; p >= 0; p--) {
    var f = b[p];
    sleep(300);
    if (drp_cm) {
      log('trying recycler_view ' + p);
    }
    if (!f) {
      continue;
    }
    var g = f.child(f.childCount() - 1);
    if (!g || g.className() !== 'android.widget.RelativeLayout') {
      if (drp_cm) {
        log('last_child not found for recycler_view ' + p);
        if (g) {
          log(g.className());
        }
      }
      if (p === 0) {
        return;
      }
      continue;
    }
    break;
  }
  if (!g) {
    return;
  }
  var h = g.findOne(className('android.widget.FrameLayout'));
  if (!h) {
    if (drp_cm) {
      log('frame_layout not found');
    }
    return;
  }
  var j = h.child(0);
  if (!j || j.className() !== 'android.widget.LinearLayout') {
    if (drp_cm) {
      log('linear_layout not found');
    }
    return;
  }
  var k = j.child(0);
  if (!k || k.className() !== 'android.widget.LinearLayout') {
    if (drp_cm) {
      log('child_of_linear_layout not found');
    }
    return;
  }
  if (k.childCount() != 4) {
    if (drp_cm) {
      log('child_of_linear_layout does not have four children');
    }
    return;
  }
  var l = k.child(1);
  if (!l || l.className() !== 'android.widget.TextView') {
    if (drp_cm) {
      log('card_title not found');
    }
    return;
  }
  var m = k.child(k.childCount() - 1);
  if (!m || m.className() !== 'android.widget.LinearLayout') {
    if (drp_cm) {
      log('last_child_of_child_of_linear_layout not found');
    }
    return;
  }
  var n = l.text();
  if (!n) {
    if (drp_cm) {
      log('card_title_text not found');
    }
    return;
  } else if (drp_cm) {
    log('card_title_text: ' + n);
  }
  var o = m.findOne(text('小程序'));
  if (!o) {
    if (drp_cm) {
      log('text_in_last_child_of_child_of_linear_layout not found');
    }
    return;
  }
  if (h) {
    h.click();
    ui.post(() => {
      drp_et();
    });
  } else if (drp_cm) {
    log('frame_layout not found');
  }
}
function drp_er() {
  events.on('notification', function (b) {
    if (b.getPackageName() !== 'com.tencent.mm' || !b.getText()) {
      return;
    }
    if (!drp_dq.some((m) => b.getTitle().includes(m))) {
      return;
    }
    console.log('[控制] 收到来自监控群组[' + b.getTitle() + ']的通知');
    if (b.getText().includes('[小程序]')) {
      if (!device.isScreenOn()) {
        console.log('[控制] 屏幕未亮，唤醒屏幕');
        device.wakeUp();
        sleep(400);
        while (!device.isScreenOn()) {
          sleep(200);
          device.wakeUp();
        }
        swipe(
          device.width / 2,
          device.height * 0.8,
          device.width / 2,
          device.height / 2,
          300,
        );
        console.log('[控制] 尝试解锁手机');
        sleep(500);
        b.click();
      } else {
        b.click();
      }
      drp_eq();
      return;
    }
    var f = b.getText();
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
      两: 2,
    };
    f = f.replace(/^\[\d+条\].*?:|^.*?:/, '');
    var j = f.match(/\d+/);
    if (j) {
      drp_cS = parseInt(j[0]);
      console.log('[控制] 已设置购买数量:', drp_cS);
    } else {
      var k = false;
      for (let p in h) {
        if (f.includes(p)) {
          drp_cS = h[p];
          k = true;
          break;
        }
      }
    }
    if (k) {
      console.log('[控制] 已设置购买数量:', drp_cS);
    }
    if (f.includes('店')) {
      drp_cR = '到店取';
      console.log('[控制] 已设置配送方式:', drp_cR);
    } else if (f.includes('家')) {
      drp_cR = '送到家';
      console.log('[控制] 已设置配送方式:', drp_cR);
    }
    if (f.includes('端') || f.includes('整盒')) {
      drp_cT = '整盒';
      console.log('[控制] 已设置规格:', drp_cT);
    } else if (f.includes('盒') || f.includes('个')) {
      drp_cT = '单个';
      console.log('[控制] 已设置规格:', drp_cT);
    }
    if (f.includes('启动') || f.includes('开')) {
      ui.post(() => {
        console.log('[控制] 已启动');
        drp_et();
      });
    } else if (f.includes('关') || f.includes('停') || f.includes('结束')) {
      ui.post(() => {
        console.log('[控制] 已停止并回到主界面');
        drp_eu();
        home();
      });
    }
  });
}
if (drp_dp) {
  var drp_es = threads.start(function () {
    drp_er();
  });
}
function drp_et() {
  drp_cQ = 1;
  console.error('[状态] 辅助启动');
  if (drp_dc && drp_bO) {
    try {
      drp_bO.end.attr('visibility', 'visible');
      drp_bO.start.attr('visibility', 'gone');
    } catch (d) {}
  }
  if (drp_dd && drp_bP) {
    try {
      drp_bP.text_status.setText('停止');
      drp_bP.drag.attr('tint', '#FF4444');
    } catch (g) {}
  }
  if (!drp_dc && !drp_dd && drp_bQ) {
    try {
      drp_bQ.end.attr('visibility', 'visible');
      drp_bQ.start.attr('visibility', 'gone');
    } catch (h) {}
  }
  if (!drp_dj) {
    console.log('[提示] 如果脚本没反应，请重启hamibot和微信');
    drp_dj = true;
  }
}
function drp_eu() {
  drp_cQ = 0;
  console.error('[状态] 辅助停止');
  if (drp_dc && drp_bO) {
    try {
      drp_bO.end.attr('visibility', 'gone');
      drp_bO.start.attr('visibility', 'visible');
    } catch (d) {}
  }
  if (drp_dd && drp_bP) {
    try {
      drp_bP.text_status.setText('启动');
      drp_bP.drag.attr('tint', '#66ccff');
    } catch (f) {}
  }
  if (!drp_dc && !drp_dd && drp_bQ) {
    try {
      drp_bQ.end.attr('visibility', 'gone');
      drp_bQ.start.attr('visibility', 'visible');
    } catch (g) {}
  }
}
function drp_ev() {
  if (drp_dl == 0) {
    return false;
  }
  var d = new Date().getTime() > drp_eC + drp_dl * 1000 && drp_eD;
  if (!drp_eE && d) {
    console.error(
      '「破盾模式」已临时关闭，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态',
    );
    drp_eE = true;
  }
  return d;
}
function drp_ew() {
  var b = {
    MXsMI: '请输入非负数',
    FrGcV: function (f, g) {
      return f == g;
    },
    fxEdt: 'HUahx',
    nHNDR: function (f, g) {
      return f + g;
    },
    DtLjE: function (f, g) {
      return f && g;
    },
  };
  var c = b;
  if (c.FrGcV(drp_dm, 0)) {
    if (c.fxEdt !== c.fxEdt) {
      b.info(c.MXsMI);
    } else {
      return false;
    }
  }
  var d = new Date().getTime() > c.nHNDR(drp_eC, drp_dm * 1000) && drp_eD;
  if (c.DtLjE(!drp_eF, d)) {
    console.error(
      '「特殊刷回流模式」已临时关闭，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态',
    );
    drp_eF = true;
  }
  return d;
}
var drp_ex = false;
var drp_ey = false;
var drp_ez = 0;
var drp_eA = false;
var drp_eB = false;
var drp_eC = new Date().getTime() + 86400000;
var drp_eD = false;
var drp_eE = false;
var drp_eF = false;
var drp_eG = 0;
var drp_eH = 0;
var drp_eI = 0;
var drp_eJ = 150;
var drp_eK = false;
var drp_eL = 0;
var drp_eM = null;
var drp_eN = null;
var drp_eO = null;
var drp_eP = null;
var drp_eQ = null;
var drp_eR = null;
var drp_eS = false;
function drp_eT() {
  while (true) {
    if (drp_cQ == 0) {
      drp_ex = false;
      drp_ey = false;
      r = false;
      drp_eG = 0;
      drp_d3 = 0;
      drp_d6 = 0;
      drp_ez = 0;
      drp_eH = 0;
      drp_eI = 0;
      drp_eK = false;
      drp_eL = 0;
      drp_eB = false;
      drp_eS = false;
      drp_eC = new Date().getTime() + 86400000;
      drp_eD = false;
      if (drp_eE || drp_eF) {
        console.error('已经解除「破盾模式」和「特殊刷回流模式」的临时关闭状态');
      }
      drp_eE = false;
      drp_eF = false;
      drp_eR = null;
      sleep(100);
      continue;
    }
    sleep(50);
    drp_eQ = drp_e0();
    if (!drp_eQ) {
      if (drp_cm) {
        log('Cannot find webview parent node.');
      }
      continue;
    }
    var b = drp_e8(drp_eQ);
    if (!b) {
      if (drp_cm) {
        log('Cannot find current node.');
      }
      continue;
    }
    if (drp_dt * 2 > 500) {
      drp_c0();
    }
    var c = drp_dZ(b);
    var d = drp_ea(b);
    if (!d) {
      if (drp_cm) {
        log('Cannot find current webview.');
      }
      continue;
    }
    drp_eM = drp_eb(c, d);
    if (drp_cm) {
      log('Header: ' + drp_eM.header + ', Status: ' + drp_eM.status);
    }
    switch (drp_eM.status) {
      case 'presale':
        var f = drp_ee(d);
        if (f && f.text().startsWith('距离开售时间还剩')) {
          var g = f.text().slice(-5);
          if (g.endsWith('0')) {
            log('距离开售还剩: ' + g);
          } else if (g.startsWith('00:')) {
            var h = parseInt(g.split(':')[1]);
            if (h < 10) {
              console.error('距离开售还剩: ' + g);
            } else if (h % 10 == 0) {
              console.error('距离开售还剩: ' + g);
            }
          }
        }
        break;
      case 'keep_waiting':
        log('继续等待按钮出现，执行点击');
        var j = d.findOne(textStartsWith('继续等待').algorithm('DFS'));
        if (j) {
          j.click();
          sleep(100);
        }
        break;
      case 'preorder':
        var k = d.findOne(text('就是这家').algorithm('DFS'));
        if (k) {
          k.click();
          break;
        }
        var l = d.findOne(text('参与抢购').algorithm('DFS'));
        if (l) {
          log('参与抢购按钮出现，执行点击');
          l.click();
          break;
        }
        if (drp_eB) {
          break;
        }
        var m = d.findOne(text('购买方式').algorithm('DFS'));
        if (!m) {
          break;
        }
        log('当前可以选择购买方式');
        var n = d.findOne(text(drp_cR).algorithm('DFS'));
        if (n) {
          n.click();
        }
        log('已选择购买方式：' + drp_cR);
        var o = d.findOne(text('选择规格').algorithm('DFS'));
        if (o) {
          log('当前可以选择规格');
          var p = d.findOne(textStartsWith(drp_cT).algorithm('DFS'));
          if (p) {
            p.click();
          }
          log('已选择规格：' + drp_cT);
          sleep(100 + drp_cV);
        }
        if (drp_cS > 1) {
          var q = d.findOne(text('数量').algorithm('DFS'));
          if (q) {
            drp_ed(d, drp_cS);
            log('已满足购买数量要求: ', drp_cS);
          }
        } else {
          log('目标购买数量为1，跳过购买数量判断');
        }
        drp_eB = true;
        break;
      case 'confirm_and_pay':
        if (drp_dr) {
          drp_eS = false;
        }
        if (!drp_eD) {
          drp_eC = new Date().getTime();
          drp_eD = true;
          if (drp_dk && drp_dl > 0) {
            console.error(
              '脚本将在[',
              drp_dl,
              ']秒后临时关闭「破盾模式」，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态',
            );
          }
          if (drp_db && drp_dm > 0) {
            console.error(
              '脚本将在[',
              drp_dm,
              ']秒后临时关闭「特殊刷回流模式」，暂停脚本后再启动（不需要重启脚本）即可解除关闭状态',
            );
          }
        }
        drp_eI = 0;
        var r = false;
        drp_ex = true;
        if (!d) {
          if (drp_cm) {
            log('Cannot find current webview.');
          }
          sleep(10);
          break;
        }
        drp_eN = null;
        drp_eO = null;
        drp_eP = null;
        var s = d.childCount();
        for (var t = s - 1; t >= 0; t--) {
          try {
            var u = d.child(t);
          } catch (ad) {
            break;
          }
          if (!u) {
            break;
          }
          if (u.className() === 'android.view.View') {
            if (!drp_eN) {
              drp_eN = u;
            } else if (!drp_eO) {
              drp_eO = u;
            } else if (!drp_eP) {
              drp_eP = u;
              break;
            }
          }
        }
        if (!drp_eN) {
          if (drp_cm) {
            log('Cannot find last view.');
          }
          sleep(10);
          break;
        }
        if (!drp_dk || drp_ev()) {
          var v = null;
          if (!drp_eN) {
            break;
          }
          var z = drp_eN.child(drp_eN.childCount() - 1);
          if (z && z.text() === '确认信息并支付') {
            v = z;
          }
          if (v) {
            drp_eG = 0;
            drp_eH++;
            if (drp_eH >= 7) {
              drp_e2();
              if (drp_cm) {
                console.error('clicked confirm_btn (physical click)');
              }
              console.error(
                '多次尝试点击「确认信息并支付」失败，使用后备方案。',
              );
            } else {
              v.click();
              drp_e3(v);
              if (drp_cm) {
                console.error('clicked confirm_btn');
              }
            }
            sleep(drp_cV);
            break;
          }
          var A = null;
          if (drp_eN.childCount() == 2) {
            var B = drp_eN.child(1);
            if (B && B.className() === 'android.view.View') {
              if (B.childCount() == 1) {
                var C = B.child(0);
                if (C && C.className() === 'android.view.View') {
                  A = C.child(C.childCount() - 1);
                }
              }
            }
          }
          if (A) {
            drp_eH = 0;
            if (drp_eG == 0) {
              drp_d3 = new Date().getTime();
              A.click();
              if (drp_cm) {
                console.error('clicked double_confirm');
              }
              drp_ey = true;
              drp_eG++;
              sleep(250 + drp_cV);
            } else if (drp_eG >= 8) {
              drp_e1(A);
              if (drp_cm) {
                console.error('clicked double_confirm (clickButton)');
              }
              drp_ey = true;
              drp_eG = 0;
            } else {
              drp_eG++;
              sleep(20);
            }
            break;
          }
        }
        if (drp_db && !drp_ew()) {
          var D = d.findOne(text('我知道了').algorithm('DFS'));
        } else {
          var C = drp_ei(drp_eN);
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
          if (!drp_db || drp_ew()) {
            if (E) {
              console.log(E.text());
            }
            drp_eG = 0;
            D.click();
            if (drp_cm) {
              console.error('clicked acknowledge');
            }
            sleep(100 + drp_cV + drp_cX);
          } else if (!drp_dk || drp_ev()) {
            var F = d.findOne(
              textMatches(/(确认无误|就是这家)/).algorithm('DFS'),
            );
            if (F) {
              if (drp_eG == 0) {
                drp_d3 = new Date().getTime();
                F.click();
                drp_ey = true;
                drp_eG++;
                sleep(drp_d2);
                break;
              }
            }
            var G = d.findOne(text('确认信息并支付').algorithm('DFS'));
            if (G) {
              drp_eG = 0;
              drp_eH++;
              if (drp_eH >= 7) {
                drp_e2();
              } else {
                G.click();
                sleep(drp_d2);
                drp_ey = false;
                break;
              }
            }
          }
          drp_ey = false;
          break;
        }
        break;
      case 'info_page':
        drp_eS = false;
        drp_ey = false;
        r = false;
        drp_eH = 0;
        var v = drp_eg(d);
        if (!drp_ex) {
          sleep(300);
          if (!v) {
            var H = d.findOne(text('立即购买').algorithm('DFS'));
            if (H) {
              H.click();
            }
            sleep(400);
          }
        } else {
          if (!v) {
            drp_ex = false;
          }
          sleep(150);
        }
        break;
      case 'purchase':
        if (r) {
          r = false;
          break;
        }
        drp_ey = false;
        drp_eG = 0;
        if (!drp_ex) {
          var m = d.findOne(text('购买方式').algorithm('DFS'));
          if (m) {
            if (!drp_cR.startsWith('来回刷')) {
              log('当前可以选择购买方式');
              var n = d.findOne(text(drp_cR).algorithm('DFS'));
              if (n) {
                n.click();
              }
              log('已选择购买方式：' + drp_cR);
              sleep(50);
            }
          }
          var o = d.findOne(text('选择规格').algorithm('DFS'));
          if (o) {
            log('当前可以选择规格');
            var p = d.findOne(textStartsWith(drp_cT).algorithm('DFS'));
            if (p) {
              p.click();
            }
            log('已选择规格：' + drp_cT);
            sleep(100 + drp_cV);
          }
          if (m && drp_dh && drp_dh.trim() !== '') {
            var I = m.parent();
            if (I) {
              var J = drp_dh
                .replace(/｜/g, '|')
                .split('|')
                .map(function (ax) {
                  return ax.trim();
                })
                .filter(function (ax) {
                  return ax.length > 0;
                })
                .map(function (ax) {
                  return (
                    '.*' + ax.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.*'
                  );
                });
              if (J.length > 0) {
                var K = J.join('|');
                console.info('🔍 使用额外选择规则: ', drp_dh);
                var L = I.find(textMatches(K).algorithm('BFS'));
                if (L) {
                  for (var t = 0; t < L.length; t++) {
                    var M = L[t];
                    if (M) {
                      M.click();
                      console.error('已点击额外选择: ', M.text());
                      sleep(10);
                    }
                  }
                }
              }
            }
          }
          if (drp_cY) {
            drp_dT();
          }
          var v = drp_eg(d);
          if (!drp_dr) {
            drp_eR = new Date();
          } else if (!drp_eS) {
            drp_eR = new Date();
            drp_eS = true;
          }
          var N = '到店取';
          while (!v && !drp_ex) {
            if (drp_cW > 0) {
              var O = new Date();
              if (O - drp_eR > drp_cW * 60000) {
                drp_cQ = 0;
                ui.post(() => {
                  if (!drp_dd) {
                    drp_dJ.end.attr('visibility', 'gone');
                    drp_dJ.start.attr('visibility', 'visible');
                  } else {
                    drp_dJ.text_status.setText('启动');
                    try {
                      drp_dJ.drag.attr('tint', '#66ccff');
                    } catch (aD) {
                      console.error('Failed to set image tint:', aD);
                    }
                  }
                });
                var h = parseFloat((drp_cW * 60).toFixed(2));
                console.warn(
                  '[通知] 超过设定的库存最大连续刷新时长[',
                  drp_cW,
                  ']分钟(',
                  h,
                  '秒) ',
                  '，脚本已停止',
                );
              }
            }
            if (drp_cQ == 0) {
              drp_ex = false;
              drp_ey = false;
              drp_eG = 0;
              break;
            }
            var P = new Date().getTime();
            var H = d.findOne(text('立即购买').algorithm('DFS'));
            if (H) {
              v = drp_eg(d);
              if (v) {
                break;
              }
              if (!drp_df) {
                var Q = drp_eh(d);
                var R = 0;
                var S = false;
                var T = new Date().getTime();
                var U = T - drp_d4;
                if (U > Math.max(drp_cU, 300)) {
                  console.error('正在判断库存情况...');
                }
                while (!Q) {
                  R++;
                  if (R > 30) {
                    S = true;
                    sleep(20);
                    break;
                  }
                  Q = drp_eh(d);
                  if (Q) {
                    break;
                  }
                  if (drp_cY && drp_de) {
                    drp_dT();
                  }
                  sleep(20);
                  v = drp_eg(d);
                  if (v) {
                    break;
                  }
                  if (drp_cQ == 0) {
                    drp_ex = false;
                    drp_ey = false;
                    drp_eG = 0;
                    break;
                  }
                }
                var T = new Date().getTime();
                var U = T - drp_d4;
                if (U > Math.max(drp_cU, 300)) {
                  if (Q) {
                    console.warn('已售罄');
                  } else if (v) {
                    console.warn('有库存');
                  }
                }
                if (S || Q) {
                  if (drp_cr) {
                    drp_ec(d);
                  }
                  if (!drp_cR.startsWith('来回刷')) {
                    if (!drp_ex) {
                      var T = new Date().getTime();
                      var U = T - drp_d4;
                      if (U < Math.max(drp_cU, 300)) {
                        continue;
                      }
                      if (drp_dr) {
                        var V = drp_dQ(d);
                        if (V) {
                          V.click();
                          var Z =
                            Math.floor(Math.random() * (drp_d0 - drp_cZ + 1)) +
                            drp_cZ;
                          if (!drp_da) {
                            Z = 0;
                          }
                          var Y = drp_cU + Z;
                          sleep(Math.max(Y / 4, 100));
                        }
                      }
                      drp_d4 = T;
                      H.click();
                      if (drp_dr) {
                        sleep(Math.max(Y / 4, 100));
                      }
                    }
                  } else if (drp_cR == '来回刷') {
                    var a0 = d.findOne(text(N).algorithm('DFS'));
                    if (a0) {
                      if (drp_cm) {
                        console.error('clicked current_selection_btn: ', N);
                      }
                      a0.click();
                      if (N == '到店取') {
                        N = '送到家';
                      } else {
                        N = '到店取';
                      }
                      sleep(100);
                    }
                  } else {
                    var a1 = '送到家';
                    var N = '到店取';
                    if (drp_cR == '来回刷（送到家）') {
                      a1 = '到店取';
                      N = '送到家';
                    }
                    var a0 = d.findOne(text(a1).algorithm('DFS'));
                    if (a0) {
                      a0.click();
                      sleep(300);
                      a0 = d.findOne(text(N).algorithm('DFS'));
                      if (a0) {
                        a0.click();
                        sleep(100);
                      }
                    }
                  }
                }
              } else if (
                drp_cR != '来回刷' &&
                drp_cR != '来回刷（到店取）' &&
                drp_cR != '来回刷（送到家）'
              ) {
                if (!drp_ex) {
                  H.click();
                }
              } else if (drp_cR == '来回刷') {
                var a0 = d.findOne(text(N).algorithm('DFS'));
                if (a0) {
                  if (drp_cm) {
                    console.error('clicked current_selection_btn: ', N);
                  }
                  a0.click();
                  if (N == '到店取') {
                    N = '送到家';
                  } else {
                    N = '到店取';
                  }
                  sleep(100);
                }
              } else {
                var a1 = '送到家';
                var N = '到店取';
                if (drp_cR == '来回刷（送到家）') {
                  a1 = '到店取';
                  N = '送到家';
                }
                var a0 = d.findOne(text(a1).algorithm('DFS'));
                if (a0) {
                  a0.click();
                  sleep(300);
                  a0 = d.findOne(text(N).algorithm('DFS'));
                  if (a0) {
                    a0.click();
                    sleep(100);
                  }
                }
              }
            }
            v = drp_eg(d);
            if (v) {
              if (drp_cm) {
                console.error('confirm_btn found in purchase, break');
              }
              break;
            }
            var a2 = Math.floor(Math.random() * (drp_d0 - drp_cZ + 1)) + drp_cZ;
            if (!drp_da) {
              a2 = 0;
            }
            var a3 = drp_cU + a2;
            if (drp_dr) {
              a3 = a3 / 2;
            }
            var a4 = Date.now();
            var a5 = false;
            while (Date.now() - a4 < a3) {
              sleep(50);
              v = drp_eg(d);
              if (v) {
                a5 = true;
                break;
              }
            }
            if (a5) {
              break;
            }
            v = drp_eg(d);
            if (v) {
              break;
            }
            purchase_count_label = d.findOne(text('数量').algorithm('DFS'));
            if (!purchase_count_label) {
              break;
            }
            console.info('[注意] 库存刷新耗时: ', drp_cU + a2, 'ms');
            v = drp_eg(d);
            if (v) {
              if (drp_cm) {
                console.error('confirm_btn found in purchase, break');
              }
              break;
            }
            if (drp_dr) {
              break;
            }
          }
          if (drp_cQ == 0) {
            continue;
          }
          if (drp_cS > 1) {
            var q = d.findOne(text('数量').algorithm('DFS'));
            if (q) {
              drp_ed(d, drp_cS);
              log('已满足购买数量要求: ', drp_cS);
            }
          } else {
            log('目标购买数量为1，跳过购买数量判断');
          }
        }
        v = drp_eg(d);
        if (v) {
          if (drp_cm) {
            console.error('confirm_btn found in purchase, try to click');
          }
          drp_ez = 0;
          if (drp_db) {
            if (!drp_ex) {
              var T = new Date().getTime();
              var a6 = T - drp_d6;
              if (a6 >= 200) {
                drp_d6 = T;
                v.click();
                drp_ex = true;
                r = true;
                sleep(150 + drp_cV);
                continue;
              }
            }
            var T = new Date().getTime();
            var a6 = T - drp_d3;
            if (a6 >= drp_d8) {
              console.warn(
                '[等待] 确认按钮点击时间已超过',
                drp_d8,
                'ms，点击确认',
              );
              if (drp_eI >= 2) {
                drp_e1(v);
                drp_eI = 0;
                if (drp_cm) {
                  console.error('clicked confirm_btn (physical click)');
                }
              } else {
                var T = new Date().getTime();
                var a6 = T - drp_d6;
                if (a6 >= 200) {
                  drp_d6 = T;
                  v.click();
                }
                drp_eI++;
              }
              drp_ex = true;
              r = true;
            } else {
              console.warn(
                '[等待] 为防止反复被打回， 等待',
                drp_d8 - a6,
                'ms后点击确认',
              );
              sleep(drp_d8 - a6);
              if (drp_eI >= 3) {
                drp_e1(v);
                drp_eI = 0;
                if (drp_cm) {
                  console.error('clicked confirm_btn (physical click)');
                }
              } else {
                var T = new Date().getTime();
                var a6 = T - drp_d6;
                if (a6 >= 200) {
                  drp_d6 = T;
                  v.click();
                }
                drp_eI++;
              }
              drp_ex = true;
              r = true;
            }
          } else {
            var T = new Date().getTime();
            var a6 = T - drp_d6;
            if (a6 >= 200) {
              if (drp_eI >= 3) {
                drp_e1(v);
                drp_eI = 0;
                if (drp_cm) {
                  console.error('clicked confirm_btn (physical click)');
                }
              } else {
                drp_d6 = T;
                if (drp_cm) {
                  console.error('clicked confirm_btn');
                }
                if (!drp_ex && drp_dg) {
                  drp_e1(v);
                } else {
                  v.click();
                }
                drp_eI++;
              }
              drp_ex = true;
              r = true;
            }
            drp_ex = true;
            r = true;
          }
          sleep(150 + drp_cV);
        } else {
          drp_ez++;
          if (drp_ez >= 10) {
            drp_ez = 0;
            drp_ex = false;
            drp_ey = false;
            drp_eG = 0;
            r = false;
            sleep(20);
            break;
          }
        }
        break;
      case 'purchase_ready':
        var v = drp_eg(d);
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
var drp_eU = threads.start(function () {
  drp_eT();
});

try {
  const preset1 = drp_dI.get('preset_1');
  if (preset1) {
    if (drp_f1(JSON.parse(preset1))) {
      console.info('[预设] 预设配置已自动应用');
    }
  }
} catch (error) {}

events.on('exit', function () {
  if (drp_dn) {
    device.cancelKeepingAwake();
  }
  console.hide();
});
setInterval(() => {}, 10000);
