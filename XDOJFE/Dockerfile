# ================= 阶段一：构建 =================
FROM node:18-alpine AS builder
WORKDIR /app

# 先拷贝依赖清单，利用 Docker 层缓存
COPY package.json package-lock.json ./
# legacy-peer-deps：vite-plugin-monaco-editor 与 monaco-editor 存在 peer 版本冲突
RUN npm ci --legacy-peer-deps

# 拷贝源码并构建，产出 dist/ 静态文件
COPY . .
RUN npm run build

# ================= 阶段二：运行时 =================
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
