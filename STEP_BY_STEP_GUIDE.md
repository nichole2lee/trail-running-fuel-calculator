# 一步一步上传项目到 GitHub 指南

## 步骤 1：检查 Git 是否已安装

打开终端（Terminal 或 PowerShell），输入：

```bash
git --version
```

**如果显示版本号**（如 `git version 2.x.x`）→ 继续步骤 2
**如果显示 "command not found"** → 需要先安装 Git：
- Windows: 访问 https://git-scm.com/download/win 下载安装
- Mac: 在终端输入 `xcode-select --install`

---

## 步骤 2：检查当前目录

确保您在项目目录中。输入：

```bash
pwd
```

应该显示类似：`/workspace/projects` 或您的项目路径

如果不在项目目录，使用 `cd` 进入：

```bash
cd /workspace/projects
```

---

## 步骤 3：检查是否有 .git 文件夹

输入：

```bash
ls -la | grep git
```

**如果有 `.git` 文件夹**：
- 说明已经初始化了 Git 仓库
- 继续步骤 4

**如果没有 `.git` 文件夹**：
- 需要先初始化 Git 仓库
- 输入：`git init`
- 看到 "Initialized empty Git repository..." 就成功了

---

## 步骤 4：查看当前 Git 状态

输入：

```bash
git status
```

这会显示所有未跟踪的文件和已修改的文件。

---

## 步骤 5：添加所有文件到 Git

输入：

```bash
git add .
```

**说明**：
- `.` 表示当前目录下的所有文件
- 这会根据 `.gitignore` 规则自动排除不需要的文件（如 node_modules、.env 等）

---

## 步骤 6：查看已暂存的文件（可选）

输入：

```bash
git status
```

您会看到文件前面有绿色的 "new file" 或 "modified"，说明已添加成功。

---

## 步骤 7：创建首次提交

输入：

```bash
git commit -m "feat: 初始化越野赛能量补给计算器项目"
```

**说明**：
- `-m` 后面是提交信息
- 提交信息要简洁明了
- 看到类似 "X files changed, Y insertions(+)" 就成功了

---

## 步骤 8：在 GitHub 创建新仓库

### 8.1 登录 GitHub

访问：https://github.com 并登录您的账号

### 8.2 创建新仓库

1. 点击右上角的 **+** 按钮
2. 选择 **New repository**
3. 填写仓库信息：
   - **Repository name**: `trail-running-fuel-calculator`
   - **Description**: 越野赛能量补给计算器 - 基于 Next.js 16 + shadcn/ui
   - 选择 **Public** 或 **Private**
4. **重要**：不要勾选以下选项：
   - ☐ Add a README file
   - ☐ Add .gitignore
   - ☐ Choose a license
5. 点击绿色的 **Create repository** 按钮

### 8.3 复制仓库 URL

创建成功后，您会看到一个页面，找到：
```
…or push an existing repository from the command line
```

下面的 HTTPS URL 类似这样：
```
https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git
```

**复制这个 URL**（点击右边的复制按钮）

---

## 步骤 9：添加远程仓库

回到终端，输入：

```bash
git remote add origin https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git
```

**注意**：将 `YOUR_USERNAME` 替换为您的 GitHub 用户名

例如，如果您的用户名是 `zhangsan`：
```bash
git remote add origin https://github.com/zhangsan/trail-running-fuel-calculator.git
```

---

## 步骤 10：验证远程仓库

输入：

```bash
git remote -v
```

应该显示：
```
origin  https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git (fetch)
origin  https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git (push)
```

---

## 步骤 11：重命名主分支为 main（如果需要）

首先查看当前分支名：

```bash
git branch
```

**如果显示 `master`**：
```bash
git branch -M main
```

**如果已经显示 `main`**：跳过此步骤

---

## 步骤 12：推送到 GitHub

输入：

```bash
git push -u origin main
```

**说明**：
- `push`: 推送代码
- `-u`: 设置上游分支（后续只需 `git push`）
- `origin`: 远程仓库名
- `main`: 分支名

**首次推送可能需要登录**：
- 输入 GitHub 用户名
- 输入 Personal Access Token（不是密码！）
  - 如何获取 token：https://github.com/settings/tokens

---

## 步骤 13：验证上传成功

推送成功后，刷新 GitHub 仓库页面，您应该看到：
- ✅ 所有项目文件
- ✅ README.md
- ✅ package.json
- ✅ src/ 文件夹
- ✅ public/ 文件夹

---

## 步骤 14：配置环境变量（重要！）

### 14.1 确认 .gitignore 正确

检查 `.gitignore` 文件包含以下内容：
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

这确保敏感信息不会上传到 GitHub。

### 14.2 在本地创建 .env.local

创建文件：
```bash
nano .env.local
```
或使用任何文本编辑器创建

添加内容：
```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

保存并退出。

### 14.3 不要提交 .env.local

运行：
```bash
git status
```

确认 `.env.local` 没有出现在未跟踪文件中（因为它在 .gitignore 中）

---

## 步骤 15：后续如何更新代码

每次修改代码后，按以下步骤提交：

```bash
# 1. 查看修改的文件
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述您的修改"

# 4. 推送到 GitHub
git push
```

---

## 常见问题解答

### Q1: 推送时提示 "Authentication failed"
**A**: 需要使用 Personal Access Token，不是密码
- 访问：https://github.com/settings/tokens
- 点击 "Generate new token (classic)"
- 选择权限：repo（全部勾选）
- 复制生成的 token（只显示一次，请妥善保存）

### Q2: 推送时提示 "refusing to merge unrelated histories"
**A**: 使用强制推送（慎用）
```bash
git push -u origin main --force
```

### Q3: 如何删除 GitHub 仓库？
**A**:
1. 进入仓库页面
2. 点击 Settings
3. 滚动到底部
4. 找到 "Danger Zone"
5. 点击 "Delete this repository"

### Q4: 如何克隆仓库到另一台电脑？
**A**:
```bash
git clone https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git
cd trail-running-fuel-calculator
pnpm install
```

---

## 下一步：部署到 Vercel（可选）

上传成功后，您可以部署到 Vercel：

1. 访问：https://vercel.com
2. 点击 "Add New Project"
3. 导入 GitHub 仓库
4. 配置环境变量：
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
5. 点击 "Deploy"
6. 等待几分钟，获得可访问的 URL

---

## 总结

完成的步骤：
1. ✅ 检查 Git 安装
2. ✅ 进入项目目录
3. ✅ 初始化 Git 仓库
4. ✅ 添加文件
5. ✅ 创建提交
6. ✅ 创建 GitHub 仓库
7. ✅ 添加远程仓库
8. ✅ 推送代码
9. ✅ 配置环境变量

现在您的项目已经成功上传到 GitHub 了！🎉
