# 快速上传命令（复制粘贴即可执行）

## 准备工作

在 GitHub 创建仓库后，获取仓库 URL（替换下面的 YOUR_USERNAME）：

```
https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git
```

## 执行以下命令（按顺序）

### 1. 检查并初始化 Git

```bash
git init
```

### 2. 添加所有文件

```bash
git add .
```

### 3. 创建首次提交

```bash
git commit -m "feat: 初始化越野赛能量补给计算器项目"
```

### 4. 添加远程仓库（替换 YOUR_USERNAME）

```bash
git remote add origin https://github.com/YOUR_USERNAME/trail-running-fuel-calculator.git
```

### 5. 重命名主分支

```bash
git branch -M main
```

### 6. 推送到 GitHub

```bash
git push -u origin main
```

---

## 如果遇到问题

### 查看当前状态
```bash
git status
```

### 查看远程仓库
```bash
git remote -v
```

### 查看当前分支
```bash
git branch
```

---

## 后续更新代码（每次修改后执行）

```bash
git add .
git commit -m "描述修改内容"
git push
```

---

## 需要记住的关键点

1. **替换 `YOUR_USERNAME`** 为您的 GitHub 用户名
2. **首次推送可能需要认证**：使用 GitHub 用户名和 Personal Access Token
3. **不要提交 `.env` 文件**：已在 .gitignore 中排除
4. **推送成功后**：在 GitHub 页面刷新即可看到文件
