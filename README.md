<p align="center">
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js" alt="Vue 3">
  <img src="https://img.shields.io/badge/Vite-4-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/C++-17-00599C?logo=c%2B%2B" alt="C++17">
  <img src="https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Redis-7-DC382D?logo=redis" alt="Redis">
  <img src="https://img.shields.io/badge/Nginx-1.24-009639?logo=nginx" alt="Nginx">
</p>

<h1 align="center">⚡ XDOJ</h1>

<p align="center">
  <b>基于 Vue3 + C++ 的高性能在线评测系统</b>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#部署指南">部署指南</a>
</p>

---

## ✨ 功能特性

| 模块 | 功能描述 |
|------|---------|
| 🏠 **首页** | 系统公告、数据统计、快捷入口 |
| 📚 **题库** | 题目列表、难度筛选、标签分类、题目详情 |
| ⚙️ **测评** | 代码编辑（Monaco Editor）、多语言支持、实时判题、结果反馈 |
| 💬 **讨论** | 题目讨论区、评论互动、社区交流 |
| 🏆 **排名** | 用户排行榜、AC 统计、提交记录 |
| 🔐 **用户系统** | 注册登录、Token 认证、个人中心 |

---

## 🛠️ 技术栈

### 前端 (XDOJFE)
| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.x | 渐进式 JavaScript 框架 |
| Vite | 4.x | 下一代前端构建工具 |
| Element Plus | 2.x | UI 组件库 |
| Monaco Editor | 0.33 | 代码编辑器（VS Code 同款） |
| Axios | 1.x | HTTP 请求库 |

### 后端 (XDOJ)
| 技术 | 版本 | 说明 |
|------|------|------|
| C++ | 17 | 高性能判题核心与 API 服务 |
| CMake | 3.x | 跨平台构建系统 |
| MongoDB | 6.x | 文档型数据库（题目、用户、提交记录） |
| Redis | 7.x | 缓存、会话存储、判题队列 |
| Nginx | 1.24 | 反向代理、负载均衡、静态资源服务 |

---

## 📁 项目结构

```
OJ/
├── XDOJ/                          # 后端服务 (C++)
│   ├── build/                     # CMake 构建目录
│   ├── include/                   # 公共头文件
│   ├── lib/                       # 第三方库
│   ├── src/                       # 业务源代码
│   ├── test/                      # 单元测试
│   ├── CMakeLists.txt             # CMake 配置
│   └── ...
│
├── XDOJFE/                        # 前端应用 (Vue 3 + Vite)
│   ├── public/                    # 静态资源
│   ├── src/                       # 源代码
│   │   ├── components/            # 公共组件
│   │   ├── views/                 # 页面视图
│   │   ├── router/                # 路由配置
│   │   ├── api/                   # 接口封装
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── vite.config.js             # Vite 配置（含代理、Monaco 插件）
│
├── init.mongodb                   # MongoDB 数据库初始化
├── init-problem.mongodb           # 题目数据初始化
├── init-user.mongodb              # 用户数据初始化
├── init-statusrecord.mongodb      # 提交记录初始化
└── .gitignore                     # Git 忽略规则
```

> **注意**：`redis-plus-plus` 为 Git 子模块，已加入 `.gitignore`，克隆后需单独初始化。

---

## 🚀 快速开始

### 环境要求

| 依赖 | 最低版本 | 安装命令 (Ubuntu) |
|------|---------|-------------------|
| Node.js | 18.x | `apt install nodejs npm` |
| g++ | 11.x | `apt install build-essential` |
| CMake | 3.20+ | `apt install cmake` |
| MongoDB | 6.0 | 参见 [官方文档](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) |
| Redis | 7.0 | `apt install redis-server` |
| Nginx | 1.24 | `apt install nginx` |

### 1. 克隆项目

```bash
git clone https://github.com/Yaha0565/OJ.git
cd OJ
```

### 2. 初始化数据库

```bash
# 启动 MongoDB 服务
sudo systemctl start mongod

# 导入初始化数据
mongo < init.mongodb
mongo < init-problem.mongodb
mongo < init-user.mongodb
mongo < init-statusrecord.mongodb
```

### 3. 启动后端

```bash
cd XDOJ/build
cmake ..
make -j$(nproc)
./xdoj
```

后端服务默认运行在 `http://127.0.0.1:8081`

### 4. 启动前端

```bash
cd ../../XDOJFE
npm install --legacy-peer-deps
npm install --save-dev vite-plugin-monaco-editor@1.0.10 --legacy-peer-deps
npm run dev
```

前端开发服务器默认运行在 `http://localhost:8080`

### 5. 访问系统

打开浏览器访问：
```
http://127.0.0.1:8080
```

---

## 📦 部署指南

### 生产环境构建

```bash
cd XDOJFE
npm install --legacy-peer-deps
npm run build
```

构建产物将生成在 `XDOJFE/dist/` 目录，可通过 Nginx 部署：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/XDOJFE/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Docker 部署（推荐）

详见 [Docker 部署文档](#)（待补充）

---

## 📸 界面预览

| 首页 | 题库 | 测评 |
|:----:|:----:|:----:|
| 首页截图占位 | 题库截图占位 | 测评截图占位 |

| 讨论 | 排名 |
|:----:|:----:|
| 讨论截图占位 | 排名截图占位 |

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

---

<p align="center">
  Powered by XDOJ Team
</p>
<p>该README由AI生产</p>
