#!/bin/bash
# Headwind MDM 源码构建脚本

set -e

echo "========================================="
echo "Headwind MDM 源码构建"
echo "========================================="

cd "$(dirname "$0")"

# 检查源码是否存在
if [ ! -d "../hmdm-server" ]; then
    echo "错误: 找不到 hmdm-server 源码目录"
    echo "请确保 hmdm-server 目录与 hmdm-docker 目录同级"
    exit 1
fi

echo "1. 清理旧构建..."
docker-compose -f docker-compose.build.yaml down 2>/dev/null || true
docker rmi hmdm-docker-hmdm 2>/dev/null || true
docker rmi hmdm-builder 2>/dev/null || true

echo ""
echo "2. 开始构建（这可能需要几分钟）..."
docker-compose -f docker-compose.build.yaml build --no-cache

echo ""
echo "3. 构建完成！"
echo ""
echo "镜像信息:"
docker images | grep hmdm-docker

echo ""
echo "========================================="
echo "启动服务..."
echo "========================================="
docker-compose -f docker-compose.build.yaml up -d

echo ""
echo "等待服务启动..."
sleep 30

echo ""
echo "服务状态:"
docker-compose -f docker-compose.build.yaml ps

echo ""
echo "查看日志:"
echo "  docker-compose -f docker-compose.build.yaml logs -f hmdm"
echo ""
echo "访问地址: http://localhost:8080"
