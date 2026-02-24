# FirstDraft

FirstDraft 是一个基于 Electron 和 Vue 3 构建的现代论文写作工具，旨在为学术写作提供流畅的所见即所得（WYSIWYG）体验，并结合 Typst 强大的排版能力，输出高质量的 PDF 文档。

## ✨ 功能特性

- **所见即所得编辑**: 基于 Tiptap 编辑器，提供类似 Word 的流畅写作体验。
- **专业排版**: 集成 Typst 排版引擎，自动生成学术级排版的 PDF。
- **多格式支持**:
  - 💾 自定义 `.paper` 项目格式（基于 Zip 的容器格式）。
  - 📄 导出 PDF (通过 Typst)。
  - 📝 导出 Word (.docx)。
- **学术功能**:
  - 📚 参考文献管理与引用。
  - 🧮 数学公式支持 (KaTeX)。
  - 🖼️ 图片插入与管理。
- **版本控制**: 内置版本历史记录，方便回溯修改。
- **国际化**: 支持中文和英文界面。

## 🛠️ 技术栈

- **核心框架**: [Electron](https://www.electronjs.org/) + [Vue 3](https://vuejs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **编辑器**: [Tiptap](https://tiptap.dev/) (Headless wrapper for ProseMirror)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **排版引擎**: [Typst](https://typst.app/)
- **文件处理**: 
  - `adm-zip`: 处理 `.paper` 压缩包。
  - `docx`: 生成 Word 文档。
- **图标库**: [Lucide Vue](https://lucide.dev/)

## 🚀 开发指南

### 环境要求

- Node.js (推荐 v18 或更高版本)
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```
这将同时启动 Vite 开发服务器和 Electron 应用窗口。

### 构建应用

```bash
pnpm build
```
构建产物将输出到 `dist` 目录。

### 代码检查与修复

```bash
pnpm check      # 类型检查
pnpm lint       # ESLint 检查
pnpm lint:fix   # 自动修复 Lint 问题
```

## 📂 项目结构

```
├── electron/           # Electron 主进程代码
│   ├── main/           # 主进程入口及业务逻辑 (文件处理, Typst 调用等)
│   └── preload/        # 预加载脚本
├── src/                # Vue 渲染进程代码
│   ├── components/     # UI 组件 (编辑器, 侧边栏等)
│   ├── extensions/     # Tiptap 编辑器扩展
│   ├── pages/          # 页面视图
│   ├── lib/            # 通用工具函数
│   └── types/          # TypeScript 类型定义
├── resources/          # 静态资源 (包含 Typst 二进制文件)
└── papers/             # 示例或测试用的 .paper 文件
```

## 📄 文件格式说明

FirstDraft 使用自定义的 `.paper` 格式保存项目。这实际上是一个 Zip 压缩包，包含：
- `content.json`: 存储文档结构、元数据和引用信息。
- `assets/`: 存储文档中使用的图片等资源文件。

## 📝 架构概览

- **主进程 (Main)**: 负责系统级操作，如文件读写、调用 Typst 二进制进行编译、生成 Word 文档。
- **渲染进程 (Renderer)**: 负责 UI 展示和用户交互，维护编辑器状态。
- **通信**: 主进程和渲染进程通过 Electron IPC 进行通信。

## 📄 License

[MIT](LICENSE)
