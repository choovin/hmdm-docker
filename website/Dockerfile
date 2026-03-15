# AI沉浸式研学系统 - 产品官网 Dockerfile (开发模式)
FROM docker.1ms.run/library/node:22-alpine

WORKDIR /app



# # 配置 npm 使用淘宝镜像源
# RUN npm config set registry https://registry.npmmirror.com
# 腾讯云镜像（很多场景下比淘宝更稳定）
# RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
# 安装 pnpm
RUN npm install -g pnpm

# # 腾讯云镜像（很多场景下比淘宝更稳定）
# RUN pnpm config set registry https://mirrors.cloud.tencent.com/npm/
# 配置 pnpm 使用淘宝镜像源
RUN pnpm config set registry https://registry.npmmirror.com

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 使用 pnpm 安装依赖
RUN pnpm install --frozen-lockfile || pnpm install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3001

# 开发模式启动
CMD ["pnpm", "dev"]