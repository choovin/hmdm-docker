# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docker deployment project for **Headwind MDM** (https://h-mdm.com), an open-source mobile device management software for Android devices.

The project provides Docker containers to run Headwind MDM with PostgreSQL database, supporting both local development (HTTP) and production (HTTPS with certbot) modes.

## Development Commands

### Starting Services

```bash
# Local development (HTTP mode)
docker-compose up -d

# Production build from source
./build-from-source.sh

# Start built services
docker-compose -f docker-compose.build.yaml up -d
```

### Logs and Debugging

```bash
# View logs
docker-compose logs -f hmdm

# Attach to container for debugging
docker exec -it <container_id> /bin/bash
```

### Stopping Services

```bash
# Stop services
docker-compose stop

# Stop and remove (with data)
docker-compose down

# Wipe all data
rm -rf volumes/db volumes/work
# or use: ./remove-all.sh
```

### Key Ports

- `8081` - Headwind MDM HTTP (development)
- `31000` - Device communication (MQTT/polling)
- `5433` - PostgreSQL (dev, to avoid port conflict)

## Architecture

### Technology Stack

- **Backend**: Java 8+, Jersey REST API, MyBatis ORM, PostgreSQL
- **Frontend**: AngularJS 1.x, Bootstrap
- **DI**: Google Guice
- **Push**: MQTT + Polling
- **Container**: Ubuntu 22.04 + Tomcat 9

### Deployment Structure

```
┌─────────────────────────────────────────────┐
│           docker-compose.yaml               │
├─────────────────────────────────────────────┤
│  postgresql  │  hmdm (Tomcat)  │  certbot  │
│   (Port 5433)│  (Port 8081)    │ (HTTPS)   │
└─────────────────────────────────────────────┘
```

### Configuration

All configuration via environment variables (`.env` file):

- `SQL_HOST`, `SQL_USER`, `SQL_PASS`, `SQL_BASE` - Database
- `BASE_DOMAIN`, `PROTOCOL` - Server URL (http/https)
- `HMDM_VARIANT`, `HMDM_URL`, `CLIENT_VERSION` - MDM version
- `FORCE_RECONFIGURE=true` - Force reinit on startup

### Key Files

- `docker-entrypoint.sh` - Container entry point, initializes DB and config
- `docker-compose.yaml` - Local dev with PostgreSQL
- `docker-compose.monitoring.yaml` - Monitoring stack (Prometheus + Grafana)
- `docker-compose.postgres-ha.yaml` - PostgreSQL HA cluster
- `docker-compose.build.yaml` - Build from source
- `docker-compose.cloud.yaml` - Production cloud deployment

### Monitoring Infrastructure

**Files:**
- `monitoring/prometheus/prometheus.yml` - Prometheus scrape config
- `monitoring/prometheus/alerts.yml` - Alert rules
- `monitoring/grafana/dashboards/` - Grafana dashboards (JVM, PostgreSQL)
- `monitoring/alertmanager/alertmanager.yml` - Alert routing
- `monitoring/jmx-exporter/jmx-config.yml` - JVM metrics collection

**Services (ports):**
- Prometheus (9090), Grafana (3000), Alertmanager (9093)
- Node Exporter (9100), cAdvisor (8082)
- PostgreSQL Exporter (9187), JMX Exporter (9404)

### PostgreSQL HA Infrastructure

**Files:**
- `postgres-primary/repmgr.conf` - Primary node config
- `postgres-standby{1,2}/repmgr.conf` - Standby node configs
- `pgpool/pgpool.conf` - Connection pooling and load balancing

**Architecture:** 1 primary + 2 standbys with streaming replication, automatic failover via repmgr, pgpool-II for connection pooling

### Database Migrations

Located in `hmdm-server/install/sql/migrations/` (external source code):

- `001_kiosk_mode.sql` - Kiosk Mode
- `002_device_locations.sql` - Device Location Tracking
- `003_device_logs.sql` - Device Logs
- `004_remote_commands.sql` - Remote Commands
- `005_photo_management.sql` - Photo Upload
- `006_remote_control.sql` - Remote Control
- `007_ldap_integration.sql` - LDAP Integration
- `008_network_traffic_filtering.sql` - Network Traffic Filtering
- `009_import_export_jobs.sql` - Import/Export
- `011_device_contacts.sql` - Device Contacts

### API Structure

REST APIs are under `/rest/private/` and plugin paths:
- `/plugins/devicelocations/public` - Device locations
- `/plugins/devicephoto/public` - Photo upload
- `/plugins/devicecontrol` - Remote control
- `/plugins/networkfilter` - Network filtering
- `/plugins/contacts` - Contacts sync

## Enterprise Features

The project documents 10 Enterprise features in Chinese under `knowledge/` directory:
1. Kiosk Mode
2. Device Location Tracking
3. Remote Commands
4. Photo Upload
5. Remote Control
6. Network Traffic Filtering
7. LDAP Integration
8. Device Import/Export
9. Device Contacts Management
10. White-Label Software

## Important Notes

- Default database: PostgreSQL 14, port 5433 (dev) / 5432 (prod)
- Headwind MDM requires external PostgreSQL (not embedded)
- For HTTPS, set `PROTOCOL=https` and configure certbot in compose file
- The source code (`hmdm-server`) is in a sibling directory, not in this repo
- 严禁修改 docker-compose和Dockerfile这两类文件中的国内加速镜像配置 docker.1ms.run/library/

---

# gstack

本项目使用 gstack 进行网页浏览和自动化测试。

**重要**: 对于所有网页浏览任务，使用 `/browse` 技能。永远不要使用 mcp__claude-in-chrome__* 工具。

## 可用技能列表

- `/plan-ceo-review` - CEO 视角产品评审规划
- `/plan-eng-review` - 工程评审规划
- `/plan-design-review` - 设计评审规划
- `/design-consultation` - 设计咨询
- `/review` - 代码/产品评审
- `/ship` - 发布功能或版本
- `/browse` - 网页浏览（使用此工具替代 MCP chrome 工具）
- `/qa` - 质量保证测试
- `/qa-only` - 仅 QA 报告模式
- `/qa-design-review` - QA 设计评审
- `/setup-browser-cookies` - 设置浏览器认证 cookies
- `/retro` - 项目回顾
- `/document-release` - 发布文档