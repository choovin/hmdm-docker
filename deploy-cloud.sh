#!/bin/bash
# Headwind MDM 云服务器部署脚本
# 域名: dmd.runnode.cn

set -e

echo "========================================="
echo "Headwind MDM 云服务器部署脚本"
echo "========================================="

# 检查 Docker 和 Docker Compose
if ! command -v docker &> /dev/null; then
    echo "正在安装 Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "Docker 安装完成，请重新登录后再次运行脚本"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "正在安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# 创建必要的目录
echo "创建数据目录..."
mkdir -p volumes/db volumes/work volumes/letsencrypt volumes/hmdm-config

# 检查 .env.cloud 文件是否存在
if [ ! -f ".env.cloud" ]; then
    echo "错误: .env.cloud 文件不存在"
    exit 1
fi

# 加载环境变量
export $(cat .env.cloud | grep -v '^#' | xargs)

echo ""
echo "配置信息:"
echo "  域名: $BASE_DOMAIN"
echo "  协议: $PROTOCOL"
echo "  管理员邮箱: $ADMIN_EMAIL"
echo ""

# 检查防火墙
echo "检查防火墙设置..."
if command -v ufw &> /dev/null; then
    echo "检测到 UFW 防火墙，请确保以下端口已开放:"
    echo "  - 80 (HTTP, 用于证书申请)"
    echo "  - 443 (HTTPS)"
    echo "  - 31000 (MQTT, 用于设备推送)"
    echo ""
    read -p "是否自动开放这些端口? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo ufw allow 80/tcp
        sudo ufw allow 443/tcp
        sudo ufw allow 31000/tcp
        echo "端口已开放"
    fi
fi

# 启动服务
echo ""
echo "启动 Headwind MDM 服务..."
docker-compose -f docker-compose.cloud.yaml --env-file .env.cloud up -d

echo ""
echo "========================================="
echo "服务启动中，请等待..."
echo "========================================="

# 等待服务启动
sleep 30

# 检查服务状态
echo ""
echo "服务状态:"
docker-compose -f docker-compose.cloud.yaml ps

echo ""
echo "========================================="
echo "部署完成!"
echo "========================================="
echo ""
echo "访问地址:"
echo "  Web 面板: https://$BASE_DOMAIN"
echo ""
echo "查看日志:"
echo "  docker-compose -f docker-compose.cloud.yaml logs -f hmdm"
echo ""
echo "默认管理员账号:"
echo "  邮箱: $ADMIN_EMAIL"
echo "  密码: 首次登录后需要重置"
echo ""
echo "========================================="
