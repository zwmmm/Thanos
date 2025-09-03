# test.js vs a.js 快速参考

## 🚀 快速修改指南

### 从 a.js 创建 test.js

```bash
# 1. 复制原文件
cp a.js test.js

# 2. 在开头添加加密模块 (第1-55行)
# 3. 修改关键参数
# 4. 运行语法检查
node -c test.js
```

### 从 test.js 创建 a.js

```bash
# 1. 复制修改版文件
cp test.js a.js

# 2. 删除加密模块 (第1-55行)
# 3. 恢复原始参数
# 4. 运行语法检查
node -c a.js
```

去掉 http 鉴权
```js
    var f = {
      headers: g
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

## 🔑 关键参数对照表

| 参数类型 | a.js | test.js | 修改说明 |
|----------|------|---------|----------|
| **脚本名称** | `"Dr. PopMart"` | `"灭霸"` | 修改UI标题 |
| **机器人名** | `"得行波斯猫"` | `"哈哈哈"` | 修改机器人标识 |
| **用户ID** | `688744643e902cb80571ee82` | `6EC49C78-CC9A-4FDD-AB79-582E139D6FE2` | 更新用户身份 |
| **时间戳** | `"2025-09-03 22:07:44"` | `Date.now()` | 动态时间戳 |

## 📝 必须修改的文件位置

### test.js 第1-55行 (加密模块)
```javascript
importClass(java.security.SecureRandom);
importClass(java.security.MessageDigest);
// ... 其他Java类导入
let aes = {};
// ... AES加密函数
```

### test.js 第60-110行 (配置参数)
```javascript
const hamibot = {
  env: {
    // 修改这些参数
    USER_ID: '你的新ID',
    ROBOT_ID: '你的新ID', 
    SCRIPT_ID: '你的新ID',
    robotName: '你的机器人名',
    scriptName: '你的脚本名'
  }
}
```

### test.js 第120-140行 (UI文本)
```javascript
// 修改窗口标题
text="你的标题"

// 修改按钮文本
text="你的按钮文本"
```

## ⚠️ 注意事项

1. **不要删除加密模块** - 这是test.js的核心功能
2. **保持语法正确** - 每次修改后运行 `node -c test.js`
3. **备份原文件** - 修改前先备份
4. **测试功能** - 在Hamibot环境中测试

## 🛠️ 常用修改命令

```bash
# 语法检查
node -c test.js

# 查找特定文本
grep -n "Dr. PopMart" test.js

# 替换文本
sed -i 's/Dr. PopMart/灭霸/g' test.js
```

## 🔍 快速查找关键词

| 关键词 | 说明 | 文件位置 |
|--------|------|----------|
| `Dr. PopMart` | 原版标题 | a.js |
| `灭霸` | 修改版标题 | test.js |
| `得行波斯猫` | 原版机器人名 | a.js |
| `哈哈哈` | 修改版机器人名 | test.js |
| `importClass` | 加密模块 | test.js 第1行 |
| `aes.encrypt` | AES加密 | test.js 第12行 |
