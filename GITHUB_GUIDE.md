# 越野赛能量补给计算器

一个基于 Next.js 16 + shadcn/ui 构建的越野赛能量补给计算和比赛补给规划工具。

## 功能特性

- 📊 **补给计算器**：计算能量、碳水、蛋白质、脂肪及微量元素（钠、钾、钙、镁）的总摄入量
- 🏃 **比赛补给规划**：基于比赛参数（距离、爬升、温度、体重、完赛时间）计算专业补给建议
- 📦 **56种主流补给品**：涵盖 Maurten、SiS、GU、康比特、迈胜等14个品牌
- 🔍 **智能搜索**：支持按名称和类型搜索补给品
- 🏷️ **品牌分组**：按品牌分组显示，便于浏览
- 🎨 **北欧/iOS 风格设计**：简洁优雅的 UI 设计

## 技术栈

- **框架**：Next.js 16 (App Router)
- **UI 库**：React 19 + shadcn/ui
- **语言**：TypeScript 5
- **样式**：Tailwind CSS 4
- **数据库**：Supabase (PostgreSQL)

## 开始使用

### 环境要求

- Node.js 18+
- pnpm 包管理器

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5000

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 项目结构

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   ├── supplements/   # 补给品 CRUD 接口
│   │   │   └── finalize-supplements/ # 数据初始化接口
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 主页面
│   │   └── globals.css        # 全局样式
│   ├── components/ui/         # shadcn/ui 组件
│   ├── lib/                   # 工具函数
│   └── storage/               # 存储层
│       └── database/          # 数据库相关
├── public/                    # 静态资源
└── package.json
```

## 补给品类型

- 能量胶 (26种)
- 能量粉 (11种)
- 电解质粉 (9种)
- 电解质胶囊 (6种)
- 蛋白粉 (1种)
- 运动饮料 (2种)
- 饮料 (1种)

## 品牌列表

Maurten、SiS、GU、Overstims、Amino Vital、康比特、迈胜、植电、肌鲣强、Win Sports、Precision、Naak、迪卡侬、宝矿力

## 比赛建议说明

- **能量摄入**：每小时 200-300 卡路里（适合普通跑者）
- **碳水摄入**：每小时 30-60 克（90克/小时仅适合精英运动员）
- **钠摄入**：每小时 500-1000 毫克
- **补水建议**：每小时 0.5-1 升水

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
