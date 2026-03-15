# Headwind MDM 云服务器部署指南

## 域名配置

**域名**: `dmd.runnode.cn`

### 1. DNS 配置

在你的域名服务商处添加 A 记录：

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| A | dmd | 你的云服务器公网IP |

等待 DNS 生效（通常几分钟到几小时）。

### 2. 服务器要求

- **操作系统**: Ubuntu 20.04/22.04 LTS (推荐)
- **CPU**: 2核+
- **内存**: 4GB+
- **磁盘**: 20GB+
- **网络**: 开放端口 80, 443, 31000

### 3. 部署步骤

#### 方法一：使用部署脚本（推荐）

```bash
# 1. 上传文件到服务器
scp -r hmdm-docker/ root@你的服务器IP:/opt/

# 2. SSH 登录服务器
ssh root@你的服务器IP

# 3. 进入目录
cd /opt/hmdm-docker

# 4. 编辑配置（修改密码、邮箱等）
vim .env.cloud

# 5. 运行部署脚本
chmod +x deploy-cloud.sh
./deploy-cloud.sh
```

#### 方法二：手动部署

```bash
# 1. 安装 Docker
curl -fsSL https://get.docker.com | sh

# 2. 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. 创建目录
mkdir -p volumes/db volumes/work volumes/letsencrypt volumes/hmdm-config

# 4. 启动服务
docker-compose -f docker-compose.cloud.yaml --env-file .env.cloud up -d
```

### 4. 首次登录

1. 访问: https://dmd.runnode.cn
2. 默认管理员账号：
   - 邮箱：`admin@dmd.runnode.cn`（或你配置的邮箱）
   - 密码：需要通过密码重置流程设置

### 5. 配置防火墙

```bash
# Ubuntu UFW
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 31000/tcp
sudo ufw enable

# 或使用 iptables
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 31000 -j ACCEPT
```

### 6. 安全建议

1. **修改共享密钥**: 编辑 `.env.cloud` 中的 `SHARED_SECRET`
2. **修改数据库密码**: 编辑 `.env.cloud` 中的 `SQL_PASS`
3. **定期备份**: 备份 `volumes/` 目录
4. **使用强密码**: 首次登录后设置强密码

### 7. 常用命令

```bash
# 查看日志
docker-compose -f docker-compose.cloud.yaml logs -f hmdm

# 重启服务
docker-compose -f docker-compose.cloud.yaml restart

# 停止服务
docker-compose -f docker-compose.cloud.yaml down

# 更新配置后重新加载
docker-compose -f docker-compose.cloud.yaml up -d --force-recreate

# 进入数据库
docker-compose exec postgresql psql -U hmdm -d hmdm

# 备份数据
tar -czvf hmdm-backup-$(date +%Y%m%d).tar.gz volumes/
```

### 8. 故障排除

#### 证书申请失败
```bash
# 检查域名解析
dig dmd.runnode.cn

# 检查 80 端口是否开放
curl -I http://dmd.runnode.cn

# 重启 certbot
docker-compose -f docker-compose.cloud.yaml restart certbot
```

#### 数据库连接失败
```bash
# 检查 PostgreSQL 状态
docker-compose -f docker-compose.cloud.yaml logs postgresql

# 重置数据库（会丢失数据）
rm -rf volumes/db/*
docker-compose -f docker-compose.cloud.yaml restart postgresql
```

#### 服务启动失败
```bash
# 查看详细日志
docker-compose -f docker-compose.cloud.yaml logs hmdm

# 强制重新配置
export FORCE_RECONFIGURE=true
docker-compose -f docker-compose.cloud.yaml up -d
```

### 9. 使用自己的 SSL 证书（可选）

如果不想使用 Let's Encrypt，可以使用自己的证书：

1. 将证书文件放入 `volumes/letsencrypt/live/dmd.runnode.cn/`:
   - `cert.pem` - 证书
   - `fullchain.pem` - 完整证书链
   - `privkey.pem` - 私钥

2. 注释掉 `docker-compose.cloud.yaml` 中的 certbot 服务

3. 重启服务
