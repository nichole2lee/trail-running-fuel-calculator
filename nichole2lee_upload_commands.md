# 给 nichole2lee 的定制化上传命令

## 📋 您的信息
- GitHub 用户名：nichole2lee
- 仓库 URL：https://github.com/nichole2lee/trail-running-fuel-calculator.git

---

## 🚀 执行以下命令（按顺序复制粘贴）

### 命令 1：初始化 Git 仓库

```bash
git init
```

**预期输出**：
```
Initialized empty Git repository in /workspace/projects/.git/
```

---

### 命令 2：添加所有文件到 Git

```bash
git add .
```

**预期输出**：
（无输出，或显示一些文件添加信息）

---

### 命令 3：创建首次提交

```bash
git commit -m "feat: 初始化越野赛能量补给计算器项目"
```

**预期输出**：
```
[main (root-commit) X files changed, Y insertions(+)]
 create mode 100644 package.json
 create mode 100644 src/app/page.tsx
 ...
```

---

### 命令 4：添加远程仓库

```bash
git remote add origin https://github.com/nichole2lee/trail-running-fuel-calculator.git
```

**预期输出**：
（无输出）

---

### 命令 5：验证远程仓库（可选）

```bash
git remote -v
```

**预期输出**：
```
origin  https://github.com/nichole2lee/trail-running-fuel-calculator.git (fetch)
origin  https://github.com/nichole2lee/trail-running-fuel-calculator.git (push)
```

---

### 命令 6：设置主分支为 main

```bash
git branch -M main
```

**预期输出**：
（无输出）

---

### 命令 7：推送到 GitHub ⭐

```bash
git push -u origin main
```

**如果这是首次推送**，系统会提示：
```
Username: nichole2lee
Password: [输入您的 Personal Access Token]
```

**⚠️ 重要**：
- Username: 输入 `nichole2lee`
- Password: 输入您的 GitHub Personal Access Token（不是登录密码）

**如何获取 Token**：
1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限（全部）
4. 点击 "Generate token"
5. 复制生成的 token（只显示一次！）

**预期输出**：
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Delta compression using up to X threads.
Compressing objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
Total X (delta Y), reused 0 (delta 0)
To https://github.com/nichole2lee/trail-running-fuel-calculator.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## ✅ 验证上传成功

推送完成后：

1. **打开浏览器**，访问：https://github.com/nichole2lee/trail-running-fuel-calculator
2. **刷新页面**
3. **您应该看到**：
   - ✅ README.md 文件
   - ✅ package.json 文件
   - ✅ src/ 文件夹
   - ✅ public/ 文件夹
   - ✅ 所有项目文件

---

## 🔧 后续如何更新代码

每次修改代码后，执行以下 3 个命令：

```bash
git add .
git commit -m "描述您的修改"
git push
```

**示例**：
```bash
git add .
git commit -m "fix: 修复搜索功能的显示问题"
git push
```

---

## 📝 创建本地环境变量文件

项目需要 Supabase 配置才能正常运行。创建 `.env.local` 文件：

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
EOF
```

**注意**：`.env.local` 文件不会被上传到 GitHub（已在 .gitignore 中排除）

---

## 🎉 完成！

现在您的项目已经成功上传到 GitHub 了！

仓库地址：https://github.com/nichole2lee/trail-running-fuel-calculator

---

## 🚀 下一步：部署到 Vercel（推荐）

1. 访问：https://vercel.com
2. 登录并点击 "Add New Project"
3. 选择 GitHub 仓库：`trail-running-fuel-calculator`
4. 配置环境变量：
   ```
   NEXT_PUBLIC_SUPABASE_URL = 你的Supabase项目URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY = 你的Supabase匿名密钥
   ```
5. 点击 "Deploy"
6. 等待几分钟，获得可访问的网站 URL

---

## ❓ 遇到问题？

### 问题 1：提示 "Authentication failed"
**解决**：确保使用 Personal Access Token，不是密码

### 问题 2：提示 "remote origin already exists"
**解决**：先删除再添加
```bash
git remote remove origin
git remote add origin https://github.com/nichole2lee/trail-running-fuel-calculator.git
```

### 问题 3：推送很慢或卡住
**解决**：
```bash
git config --global http.postBuffer 524288000
git push -u origin main
```

### 问题 4：想要完全重新开始
**解决**：
```bash
rm -rf .git
git init
# 然后从命令 1 开始重新执行
```

---

## 📞 需要帮助？

如果遇到任何问题，随时告诉我！
