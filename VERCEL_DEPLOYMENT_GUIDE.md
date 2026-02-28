# 部署到 Vercel 完整指南

## ✅ 准备工作已完成

- ✅ GitHub 仓库已创建
- ✅ Supabase 账号已注册
- ✅ 数据库表已创建
- ✅ 环境变量已配置

---

## 🚀 开始部署到 Vercel

### 第 1 步：注册 Vercel 账号

1. 👉 访问：https://vercel.com
2. 👉 点击右上角 **"Sign Up"** 或 **"Log In"**
3. 👉 选择 **"Continue with GitHub"**（推荐）
4. 👉 授权 Vercel 访问您的 GitHub 账号
5. 👉 填写用户名（任意）

---

### 第 2 步：创建新项目

1. 登录 Vercel 后，点击 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 部分：
   - 找到您的仓库：`trail-running-fuel-calculator`
   - 点击 **"Import"** 按钮

---

### 第 3 步：配置项目

您会看到 **"Configure Project"** 页面：

#### 3.1 项目名称（保持默认或修改）
```
Project Name: trail-running-fuel-calculator
```

#### 3.2 Framework Preset（自动检测）
```
Framework Preset: Next.js
```

#### 3.3 Root Directory（保持默认）
```
Root Directory: ./
```

#### 3.4 构建命令（保持默认）
```
Build Command: npm run build
```

#### 3.5 输出目录（保持默认）
```
Output Directory: .next
```

---

### 第 4 步：配置环境变量 ⭐（最重要！）

滚动到 **"Environment Variables"** 部分，添加以下两个变量：

#### 变量 1：
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://qmycmkqdqeiczqifzuxb.supabase.co
Environment: All (Production, Preview, Development)
```

**添加步骤**：
1. 在 **"Name"** 输入框输入：`NEXT_PUBLIC_SUPABASE_URL`
2. 在 **"Value"** 输入框输入：`https://qmycmkqdqeiczqifzuxb.supabase.co`
3. 点击 **"Add"** 按钮

#### 变量 2：
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFteWNta3FkcWVpY3pxaWZ6dXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNjM4NzMsImV4cCI6MjA4NzgzOTg3M30.MUWA-ju6szRGj2oamYNCIyDCzXpAQ8WcvvHXIAGkFQI
Environment: All (Production, Preview, Development)
```

**添加步骤**：
1. 在 **"Name"** 输入框输入：`NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. 在 **"Value"** 输入框输入：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. 点击 **"Add"** 按钮

#### 检查环境变量：
确保两个变量都已添加，并且在 **"Environment"** 列显示为：
- `Production` ✅
- `Preview` ✅
- `Development` ✅

---

### 第 5 步：开始部署

1. 滚动到页面底部
2. 点击 **"Deploy"** 按钮
3. 等待部署完成（通常 1-3 分钟）

---

### 第 6 步：部署成功

部署成功后，您会看到：

#### 6.1 恭喜页面
显示 🎉 **"Congratulations!"**

#### 6.2 获取网站 URL
在页面顶部，您会看到类似这样的 URL：
```
https://trail-running-fuel-calculator.vercel.app
```

或者自定义域名：
```
https://你的项目名.vercel.app
```

**👉 点击这个链接访问您的网站！**

---

## 🔧 验证部署

访问您的网站 URL，检查：
- ✅ 页面正常加载
- ✅ 补给品列表显示
- ✅ 搜索功能正常
- ✅ 计算器功能正常

---

## 📱 分享给朋友

现在您可以把这个链接分享给朋友了！

**分享方式**：
- 直接复制 URL 发送给朋友
- 或者在 README.md 中添加链接

---

## 🔄 更新项目

每次您更新代码后：

1. 在本地提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "描述修改"
   git push
   ```

2. Vercel 会**自动检测**并重新部署
3. 几分钟后，网站自动更新

---

## 🎨 自定义域名（可选）

如果您想用自己的域名：

1. 在 Vercel 项目中，点击 **"Settings"** → **"Domains"**
2. 输入您的域名（如 `calculator.yourdomain.com`）
3. 按照提示配置 DNS

---

## 📊 监控和日志

在 Vercel 仪表板中：
- **"Deployments"**：查看所有部署历史
- **"Logs"**：查看网站日志
- **"Analytics"**：查看访问统计（免费套餐有限）

---

## ❓ 常见问题

### Q1: 部署失败怎么办？
**A**:
1. 点击失败的部署查看日志
2. 检查环境变量是否正确配置
3. 确保所有依赖都已安装

### Q2: 网站访问很慢？
**A**:
- 可能是 Supabase 连接问题
- 检查 Vercel 日志
- 可能需要优化数据库查询

### Q3: 如何修改环境变量？
**A**:
1. 在 Vercel 项目中，点击 **"Settings"** → **"Environment Variables"**
2. 修改或添加变量
3. 重新部署项目

### Q4: 免费套餐有什么限制？
**A**:
- ✅ 无限项目
- ✅ 100GB 带宽/月
- ✅ 自动 HTTPS
- ✅ Git 集成
- ⚠️ 无服务器函数有执行时间限制
- ⚠️ 部署会进入睡眠模式（访问时需要等待几秒）

---

## 🎉 完成！

现在您的越野赛能量补给计算器已经：
- ✅ 上传到 GitHub
- ✅ 部署到 Vercel
- ✅ 可以通过链接访问
- ✅ 可以分享给朋友

**恭喜！享受您的在线应用吧！** 🚀

---

## 📞 需要帮助？

如果遇到任何问题，随时告诉我！
