# Headwind MDM 产品需求文档 (PRD)

| 版本 | 日期 | 作者 | 说明 |
|------|------|------|------|
| 1.0 | 2026-03-22 | Headwind MDM Team | 初始版本 |

---

## 1. 产品概述

### 1.1 产品定位

Headwind MDM (Mobile Device Management) 是一款开源的 Android 移动设备管理平台，专为企业提供设备注册、应用分发、配置管理、Kiosk 模式等核心功能。该平台支持设备锁定、应用管理、GPS/Wi-Fi/蓝牙管理、远程命令、照片上传、远程控制等企业级特性。

**目标用户：**
- 企业 IT 管理员
- 设备运维人员
- 移动设备部署服务商
- 需要管理大量 Android 设备的企业

### 1.2 核心价值

- **简化设备管理**：集中管理所有 Android 设备，降低运维成本
- **提高安全性**：通过策略配置和远程控制，确保设备安全
- **提升效率**：批量操作、自动化部署，减少人工干预
- **品牌定制**：白标功能支持企业打造专属品牌形象

### 1.3 技术架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        客户端层                                   │
├─────────────────────────────────────────────────────────────────┤
│  Android Agent (设备端 MDM 代理)                                 │
│  - 设备注册                                                      │
│  - 策略执行                                                      │
│  - 数据上报                                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                        通信层                                    │
├─────────────────────────────────────────────────────────────────┤
│  MQTT + Long Polling 推送服务                                    │
│  WebSocket 信令服务 (远程控制)                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                        服务端层                                   │
├─────────────────────────────────────────────────────────────────┤
│  Java/Jersey REST API (Tomcat 9)                                 │
│  - 设备管理                                                      │
│  - 用户认证                                                      │
│  - 策略配置                                                      │
│  - 远程命令                                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                        数据层                                    │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL 14                                                  │
│  - 设备信息                                                      │
│  - 用户数据                                                      │
│  - 配置策略                                                      │
│  - 审计日志                                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 功能总览

| 序号 | 功能名称 | 英文名称 | 功能分类 | 优先级 |
|------|---------|---------|----------|--------|
| 1 | Kiosk模式 | Kiosk Mode | 设备管理 | P0 |
| 2 | 设备位置跟踪 | Device Location Tracking | 安全监控 | P1 |
| 3 | 远程命令 | Remote Commands | 设备控制 | P0 |
| 4 | 照片上传 | Photo Upload | 安全监控 | P1 |
| 5 | 远程控制 | Remote Control | 设备控制 | P1 |
| 6 | 网络流量过滤 | Network Traffic Filtering | 安全策略 | P2 |
| 7 | LDAP集成 | LDAP Integration | 身份认证 | P2 |
| 8 | 设备导入导出 | Export/Import Devices | 批量管理 | P2 |
| 9 | 设备联系人管理 | Device Contacts Management | 数据同步 | P3 |
| 10 | 白标软件 | White-Label Software | 品牌定制 | P2 |

---

## 3. 功能详细说明

### 3.1 Kiosk模式 (Kiosk Mode)

#### 3.1.1 功能描述

Kiosk 模式允许管理员将设备锁定在单一应用或特定应用集合中，限制用户访问设备其他功能。适用于数字标牌、POS 系统、自助服务终端等场景。

#### 3.1.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 单应用模式 | 将设备锁定在单一应用中 |
| 多应用模式 | 允许用户访问指定的应用集合 |
| 禁止应用管理 | 配置禁止启动的应用列表 |
| 系统UI控制 | 控制状态栏、导航栏、设置等系统UI的可见性 |
| 应用卸载保护 | 阻止用户卸载受保护的应用 |
| 应用安装保护 | 阻止用户安装新应用 |
| 自定义壁纸/Logo | 支持企业品牌定制 |
| 事件日志 | 记录 Kiosk 模式相关的所有事件 |

#### 3.1.3 系统UI设置项

| 设置项 | 说明 |
|--------|------|
| 隐藏状态栏 | 隐藏设备顶部状态栏 |
| 隐藏导航栏 | 隐藏设备底部导航栏 |
| 允许访问设置 | 是否允许用户进入系统设置 |
| 允许最近应用 | 是否允许用户查看最近使用的应用 |
| 允许关机 | 是否允许用户关闭设备 |

#### 3.1.4 安全设置项

| 设置项 | 说明 |
|--------|------|
| 阻止应用卸载 | 禁止卸载白名单外的应用 |
| 阻止应用安装 | 禁止安装新应用 |
| 禁用相机 | 禁用设备摄像头 |
| 阻止截图 | 禁止屏幕截图 |

#### 3.1.5 数据库表结构

**kiosk_configurations**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| configuration_id | INTEGER | 关联的配置ID |
| customer_id | INTEGER | 客户ID |
| kiosk_mode | VARCHAR(20) | DISABLED/SINGLE_APP/MULTI_APP |
| launcher_app_pkg | VARCHAR(255) | Kiosk启动器包名 |
| hide_status_bar | BOOLEAN | 隐藏状态栏 |
| hide_navigation_bar | BOOLEAN | 隐藏导航栏 |
| allow_settings | BOOLEAN | 允许访问设置 |
| allow_recent_apps | BOOLEAN | 允许最近应用 |
| allow_power_off | BOOLEAN | 允许关机 |
| block_uninstall | BOOLEAN | 阻止卸载 |
| block_install | BOOLEAN | 阻止安装 |
| block_camera | BOOLEAN | 禁用相机 |
| block_screenshot | BOOLEAN | 阻止截图 |
| allowed_apps | TEXT | 允许的应用列表(JSON) |
| custom_wallpaper | VARCHAR(255) | 自定义壁纸 |
| custom_logo | VARCHAR(255) | 自定义Logo |

**kiosk_prohibited_apps**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| configuration_id | INTEGER | 关联的配置ID |
| application_id | INTEGER | 关联的应用ID |
| package_name | VARCHAR(255) | 应用包名 |
| app_name | VARCHAR(255) | 应用名称 |

**kiosk_events**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| device_id | INTEGER | 设备ID |
| customer_id | INTEGER | 客户ID |
| event_type | VARCHAR(50) | 事件类型 |
| package_name | VARCHAR(255) | 相关应用包名 |
| details | TEXT | 详情 |
| event_time | TIMESTAMP | 事件时间 |

#### 3.1.6 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取Kiosk配置 | GET | /rest/private/kiosk/config/{configurationId} | 获取指定配置的Kiosk设置 |
| 保存Kiosk配置 | POST | /rest/private/kiosk/config | 保存Kiosk配置 |
| 删除Kiosk配置 | DELETE | /rest/private/kiosk/config/{id} | 删除Kiosk配置 |
| 获取禁止应用列表 | GET | /rest/private/kiosk/prohibited-apps/{configurationId} | 获取指定配置的禁止应用 |
| 添加禁止应用 | POST | /rest/private/kiosk/prohibited-apps | 添加禁止应用 |
| 删除禁止应用 | DELETE | /rest/private/kiosk/prohibited-apps/{id} | 删除禁止应用 |
| 获取Kiosk事件 | GET | /rest/private/kiosk/events/{deviceId} | 获取设备Kiosk事件日志 |

#### 3.1.7 推送消息类型

| 消息类型 | 说明 |
|----------|------|
| TYPE_KIOSK_MODE_CONFIG | Kiosk模式配置更新 |
| TYPE_EXIT_KIOSK | 退出Kiosk模式 |
| TYPE_UPDATE_ALLOWED_APPS | 更新允许的应用列表 |

---

### 3.2 设备位置跟踪 (Device Location Tracking)

#### 3.2.1 功能描述

设备位置跟踪功能允许管理员实时查看和管理设备的地理位置信息，支持地理围栏(Geofencing)功能，当设备进入或离开指定区域时触发警报。

#### 3.2.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 实时位置获取 | 获取设备当前GPS位置 |
| 历史轨迹查询 | 查询设备位置历史记录 |
| 地理围栏管理 | 创建、编辑、删除地理围栏 |
| 圆形围栏 | 基于中心点和半径定义围栏 |
| 多边形围栏 | 基于多个顶点定义复杂围栏 |
| 进出事件通知 | 设备进出围栏时发送通知 |
| 位置数据可视化 | 地图集成展示设备位置 |
| 位置更新频率配置 | 可配置的位置更新间隔 |

#### 3.2.3 地理围栏触发动作

| 动作 | 说明 |
|------|------|
| 发送通知邮件 | 围栏事件触发时发送邮件通知 |
| 自动锁定设备 | 设备离开围栏时自动锁定 |
| 自动擦除数据 | 设备离开围栏时自动擦除数据(高危) |

#### 3.2.4 数据库表结构

**device_locations**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| device_id | INTEGER | 设备ID |
| customer_id | INTEGER | 客户ID |
| latitude | DECIMAL(10,8) | 纬度 |
| longitude | DECIMAL(11,8) | 经度 |
| altitude | DECIMAL(10,2) | 海拔 |
| accuracy | DECIMAL(8,2) | 精度 |
| speed | DECIMAL(8,2) | 速度 |
| bearing | DECIMAL(5,2) | 方向 |
| address | TEXT | 地址(反向地理编码) |
| city | VARCHAR(100) | 城市 |
| country | VARCHAR(100) | 国家 |
| location_time | TIMESTAMP | 位置时间 |
| received_at | TIMESTAMP | 接收时间 |

**geofences**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| configuration_id | INTEGER | 关联的配置ID |
| name | VARCHAR(255) | 围栏名称 |
| description | TEXT | 围栏描述 |
| fence_type | VARCHAR(20) | CIRCLE/POLYGON |
| center_latitude | DECIMAL(10,8) | 圆形围栏中心纬度 |
| center_longitude | DECIMAL(11,8) | 圆形围栏中心经度 |
| radius_meters | INTEGER | 圆形围栏半径(米) |
| polygon_points | TEXT | 多边形围栏顶点(JSON) |
| trigger_on_enter | BOOLEAN | 进入时触发 |
| trigger_on_exit | BOOLEAN | 离开时触发 |
| send_notification | BOOLEAN | 发送通知 |
| notification_emails | TEXT | 通知邮箱列表(JSON) |
| auto_lock_device | BOOLEAN | 自动锁定设备 |
| auto_wipe_data | BOOLEAN | 自动擦除数据 |

**geofence_events**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| geofence_id | INTEGER | 围栏ID |
| device_id | INTEGER | 设备ID |
| customer_id | INTEGER | 客户ID |
| event_type | VARCHAR(20) | ENTER/EXIT |
| latitude | DECIMAL(10,8) | 事件位置纬度 |
| longitude | DECIMAL(11,8) | 事件位置经度 |
| event_time | TIMESTAMP | 事件时间 |
| is_processed | BOOLEAN | 是否已处理 |
| processed_at | TIMESTAMP | 处理时间 |

#### 3.2.5 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取设备最新位置 | GET | /rest/private/locations/device/{deviceId}/latest | 获取设备最新位置 |
| 获取设备位置历史 | GET | /rest/private/locations/device/{deviceId}/history | 获取设备位置历史 |
| 接收位置更新 | POST | /rest/private/locations/update | 设备上报位置 |
| 请求位置更新 | POST | /rest/private/locations/device/{deviceId}/request | 请求设备上报位置 |
| 批量获取设备位置 | POST | /rest/private/locations/devices/batch | 批量获取设备位置 |
| 获取地理围栏列表 | GET | /rest/private/geofences | 获取围栏列表 |
| 获取单个围栏 | GET | /rest/private/geofences/{id} | 获取围栏详情 |
| 创建地理围栏 | POST | /rest/private/geofences | 创建围栏 |
| 更新地理围栏 | PUT | /rest/private/geofences/{id} | 更新围栏 |
| 删除地理围栏 | DELETE | /rest/private/geofences/{id} | 删除围栏 |
| 获取围栏事件 | GET | /rest/private/geofences/{id}/events | 获取围栏事件历史 |

---

### 3.3 远程命令 (Remote Commands)

#### 3.3.1 功能描述

远程命令功能允许管理员向设备发送即时指令，执行特定操作，如重启设备、锁定屏幕、清除数据、安装应用等。支持单个设备和批量设备操作。

#### 3.3.2 支持的命令类型

| 命令 | 描述 | 权限要求 |
|------|------|----------|
| REBOOT | 重启设备 | 普通管理员 |
| LOCK | 锁定屏幕 | 普通管理员 |
| FACTORY_RESET | 恢复出厂设置 | 超级管理员 |
| WIPE_DATA | 擦除数据 | 超级管理员 |
| RING | 播放响铃(查找设备) | 普通管理员 |
| INSTALL_APP | 安装应用 | 普通管理员 |
| UNINSTALL_APP | 卸载应用 | 普通管理员 |
| RUN_SCRIPT | 执行脚本 | 超级管理员 |
| UPDATE_CONFIGURATION | 更新配置 | 普通管理员 |
| REQUEST_INFO | 请求设备信息 | 普通管理员 |

#### 3.3.3 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 单设备命令 | 向单个设备发送远程命令 |
| 批量命令 | 同时向多个设备发送命令 |
| 命令状态追踪 | 实时查看命令执行状态 |
| 命令历史记录 | 记录所有命令执行历史 |
| 命令队列管理 | 命令排队和优先级管理 |
| 命令过期机制 | 防止旧命令被重放攻击 |

#### 3.3.4 命令状态

| 状态 | 说明 |
|------|------|
| PENDING | 待发送 |
| SENT | 已发送 |
| EXECUTING | 执行中 |
| COMPLETED | 已完成 |
| FAILED | 失败 |
| CANCELLED | 已取消 |

#### 3.3.5 数据库表结构

**remote_commands**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| command_type | VARCHAR(50) | 命令类型 |
| command_payload | TEXT | 命令参数(JSON) |
| device_id | INTEGER | 目标设备ID |
| device_ids | TEXT | 批量命令设备列表(JSON) |
| status | VARCHAR(20) | 命令状态 |
| created_at | TIMESTAMP | 创建时间 |
| sent_at | TIMESTAMP | 发送时间 |
| executed_at | TIMESTAMP | 执行时间 |
| completed_at | TIMESTAMP | 完成时间 |
| result_code | INTEGER | 结果码 |
| result_message | TEXT | 结果消息 |
| created_by | INTEGER | 发起人 |
| expires_at | TIMESTAMP | 过期时间 |
| priority | VARCHAR(10) | LOW/NORMAL/HIGH/CRITICAL |

**remote_command_logs**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| command_id | INTEGER | 命令ID |
| device_id | INTEGER | 设备ID |
| log_level | VARCHAR(20) | INFO/WARNING/ERROR |
| log_message | TEXT | 日志消息 |
| logged_at | TIMESTAMP | 记录时间 |

#### 3.3.6 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 发送单设备命令 | POST | /rest/private/devices/{deviceId}/remoteCommand | 向单个设备发送命令 |
| 发送批量命令 | POST | /rest/private/devices/remoteCommandBulk | 批量发送命令 |
| 获取命令历史 | GET | /rest/private/devices/{deviceId}/commandHistory | 获取设备命令历史 |
| 获取命令状态 | GET | /rest/private/commands/{id}/status | 获取命令执行状态 |
| 取消命令 | POST | /rest/private/commands/{id}/cancel | 取消待执行命令 |
| 获取命令类型列表 | GET | /rest/private/commands/types | 获取支持的命令类型 |

---

### 3.4 照片上传 (Photo Upload)

#### 3.4.1 功能描述

照片上传功能允许管理员远程请求设备拍摄并上传照片，支持从前后摄像头拍照，用于设备定位、现场取证、资产检查等场景。

#### 3.4.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 远程拍照请求 | 管理员远程请求设备拍照 |
| 前后摄像头选择 | 支持前置/后置摄像头 |
| 照片元数据记录 | 包含位置、时间、设备信息 |
| 照片浏览管理 | Web界面浏览所有照片 |
| 照片搜索过滤 | 按设备、时间等条件搜索 |
| 批量下载 | 支持ZIP打包下载 |
| 照片质量配置 | 可配置分辨率和质量 |

#### 3.4.3 数据库表结构

**photos**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| device_id | INTEGER | 设备ID |
| customer_id | INTEGER | 客户ID |
| file_name | VARCHAR(255) | 文件名 |
| file_path | VARCHAR(500) | 文件路径 |
| file_size | BIGINT | 文件大小 |
| mime_type | VARCHAR(50) | MIME类型 |
| width | INTEGER | 照片宽度 |
| height | INTEGER | 照片高度 |
| orientation | INTEGER | 旋转方向 |
| latitude | DECIMAL(10,8) | 拍摄位置纬度 |
| longitude | DECIMAL(11,8) | 拍摄位置经度 |
| address | TEXT | 拍摄地址 |
| camera_type | VARCHAR(20) | FRONT/BACK |
| flash_used | BOOLEAN | 是否使用闪光灯 |
| focal_length | DECIMAL(8,2) | 焦距 |
| taken_at | TIMESTAMP | 拍摄时间 |
| uploaded_at | TIMESTAMP | 上传时间 |
| request_id | INTEGER | 关联的请求ID |
| requested_by | INTEGER | 请求人 |
| description | TEXT | 照片描述 |
| tags | TEXT | 标签(JSON) |
| is_deleted | BOOLEAN | 删除标记 |
| deleted_at | TIMESTAMP | 删除时间 |

**photo_requests**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| device_id | INTEGER | 设备ID |
| customer_id | INTEGER | 客户ID |
| camera_type | VARCHAR(20) | FRONT/BACK/BOTH |
| resolution | VARCHAR(20) | LOW/MEDIUM/HIGH |
| auto_upload | BOOLEAN | 自动上传 |
| include_location | BOOLEAN | 包含位置信息 |
| status | VARCHAR(20) | 请求状态 |
| requested_at | TIMESTAMP | 请求时间 |
| sent_at | TIMESTAMP | 发送时间 |
| completed_at | TIMESTAMP | 完成时间 |
| requested_by | INTEGER | 请求人 |
| photo_count | INTEGER | 照片数量 |
| error_message | TEXT | 错误消息 |

#### 3.4.4 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 请求设备拍照 | POST | /rest/private/photos/request/{deviceId} | 请求设备拍照 |
| 获取所有照片 | GET | /rest/private/photos/all | 获取照片列表 |
| 获取设备照片 | GET | /rest/private/photos/device/{deviceId} | 获取指定设备照片 |
| 搜索照片 | GET | /rest/private/photos/search | 搜索照片 |
| 获取单张照片 | GET | /rest/private/photos/{id} | 获取照片详情 |
| 更新照片信息 | PUT | /rest/private/photos | 更新照片 |
| 删除照片 | DELETE | /rest/private/photos/{id} | 删除照片 |
| 下载照片 | GET | /rest/private/photos/download/{id} | 下载单张照片 |
| 批量下载 | POST | /rest/private/photos/download/batch | 批量下载(ZIP) |
| 上传照片(设备) | POST | /rest/private/photos/upload | 设备上传照片 |
| 获取请求列表 | GET | /rest/private/photos/requests | 获取拍照请求列表 |

---

### 3.5 远程控制 (Remote Control)

#### 3.5.1 功能描述

远程控制功能允许管理员实时查看和控制设备屏幕，基于 WebRTC 技术实现低延迟、高质量的屏幕共享和远程操作。

#### 3.5.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 实时屏幕共享 | 查看设备实时屏幕 |
| 远程控制模式 | 在Web端控制设备 |
| WebRTC点对点连接 | 低延迟视频传输 |
| 远程触摸操作 | 在Web端触摸设备屏幕 |
| 远程按键操作 | 发送按键事件到设备 |
| 会话录制 | 录制远程控制过程 |
| 多管理员观看 | 支持多人同时观看 |
| 连接质量监控 | 实时显示延迟、帧率 |

#### 3.5.3 会话状态

| 状态 | 说明 |
|------|------|
| PENDING | 待连接 |
| CONNECTING | 连接中 |
| CONNECTED | 已连接 |
| DISCONNECTED | 已断开 |
| ERROR | 错误 |

#### 3.5.4 数据库表结构

**remote_control_sessions**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| device_id | INTEGER | 设备ID |
| session_token | VARCHAR(64) | 会话Token |
| session_type | VARCHAR(20) | VIEW/CONTROL |
| status | VARCHAR(20) | 会话状态 |
| webrtc_offer | TEXT | WebRTC Offer |
| webrtc_answer | TEXT | WebRTC Answer |
| ice_candidates | TEXT | ICE Candidates(JSON) |
| created_at | TIMESTAMP | 创建时间 |
| started_at | TIMESTAMP | 开始时间 |
| ended_at | TIMESTAMP | 结束时间 |
| connection_quality | VARCHAR(20) | EXCELLENT/GOOD/FAIR/POOR |
| latency_ms | INTEGER | 延迟(毫秒) |
| frame_rate | DECIMAL(4,2) | 帧率 |
| is_recorded | BOOLEAN | 是否录制 |
| recording_path | VARCHAR(500) | 录制文件路径 |
| created_by | INTEGER | 创建者 |
| error_message | TEXT | 错误消息 |

#### 3.5.5 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 创建会话 | POST | /rest/private/remote-control/sessions | 创建远程控制会话 |
| 获取会话 | GET | /rest/private/remote-control/sessions/{id} | 获取会话详情 |
| 通过Token获取会话 | GET | /rest/private/remote-control/sessions/token/{token} | 通过Token获取会话 |
| 更新会话 | PUT | /rest/private/remote-control/sessions/{id} | 更新会话 |
| 更新会话状态 | PUT | /rest/private/remote-control/sessions/{id}/status | 更新状态 |
| 删除会话 | DELETE | /rest/private/remote-control/sessions/{id} | 删除会话 |
| 获取设备活动会话 | GET | /rest/private/remote-control/sessions/device/{deviceId}/active | 获取活动会话 |
| 检查活动会话 | GET | /rest/private/remote-control/sessions/device/{deviceId}/has-active | 检查是否有活动会话 |
| 交换ICE Candidate | POST | /rest/private/remote-control/sessions/{id}/ice-candidate | 交换ICE候选 |
| 发送输入事件 | POST | /rest/private/remote-control/sessions/{id}/input | 发送输入事件 |

---

### 3.6 网络流量过滤 (Network Traffic Filtering)

#### 3.6.1 功能描述

网络流量过滤功能允许管理员配置设备的网络访问规则，控制应用的网络访问权限，实现应用级别的防火墙功能。

#### 3.6.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 应用网络控制 | 允许/阻止特定应用的网络访问 |
| URL黑白名单 | 基于域名的访问控制 |
| IP地址过滤 | 基于IP的访问控制 |
| 时间段控制 | 仅在指定时间段生效 |
| WiFi/移动数据分别控制 | 分别配置不同网络类型的规则 |
| VPN集成 | 通过VPN实现流量过滤 |
| 访问日志 | 记录被阻止的访问尝试 |

#### 3.6.3 规则类型

| 类型 | 说明 |
|------|------|
| APP | 基于应用包名的规则 |
| URL | 基于URL/域名的规则 |
| IP | 基于IP地址的规则 |

#### 3.6.4 数据库表结构

**firewall_rules**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| configuration_id | INTEGER | 关联的配置ID |
| customer_id | INTEGER | 客户ID |
| rule_name | VARCHAR(255) | 规则名称 |
| description | TEXT | 规则描述 |
| rule_type | VARCHAR(20) | APP/URL/IP |
| action | VARCHAR(20) | ALLOW/BLOCK |
| priority | INTEGER | 优先级(数值越小越高) |
| target | VARCHAR(500) | 目标(包名/URL/IP) |
| network_type | VARCHAR(20) | WIFI/MOBILE/BOTH |
| time_start | TIME | 开始时间 |
| time_end | TIME | 结束时间 |
| days_of_week | VARCHAR(20) | 生效日期(1-7) |
| is_active | BOOLEAN | 是否激活 |
| created_at | TIMESTAMP | 创建时间 |

#### 3.6.5 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取防火墙规则 | GET | /rest/private/firewall/rules/{configurationId} | 获取规则列表 |
| 创建防火墙规则 | POST | /rest/private/firewall/rules | 创建规则 |
| 更新防火墙规则 | PUT | /rest/private/firewall/rules/{id} | 更新规则 |
| 删除防火墙规则 | DELETE | /rest/private/firewall/rules/{id} | 删除规则 |
| 获取防火墙日志 | GET | /rest/private/firewall/logs/{deviceId} | 获取访问日志 |

---

### 3.7 LDAP集成 (LDAP Integration)

#### 3.7.1 功能描述

LDAP集成功能允许企业使用现有的LDAP/Active Directory服务器进行用户身份验证，实现统一的身份管理。

#### 3.7.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| LDAP服务器配置 | 配置LDAP/AD服务器连接 |
| 用户身份验证 | 使用LDAP凭据登录 |
| 用户同步 | 从LDAP同步用户到本地 |
| 组映射 | LDAP组到MDM角色映射 |
| 多LDAP服务器支持 | 支持配置多个LDAP服务器 |
| SSL/TLS加密连接 | 安全连接支持 |

#### 3.7.3 数据库表结构

**ldap_settings**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| server_url | VARCHAR(255) | LDAP服务器地址 |
| use_ssl | BOOLEAN | 使用SSL |
| use_tls | BOOLEAN | 使用TLS |
| port | INTEGER | 端口号 |
| bind_dn | VARCHAR(500) | 绑定DN |
| bind_password | TEXT | 绑定密码(加密) |
| base_dn | VARCHAR(500) | 基础DN |
| user_search_filter | VARCHAR(500) | 用户搜索过滤器 |
| user_search_base | VARCHAR(500) | 用户搜索基础DN |
| username_attribute | VARCHAR(100) | 用户名属性 |
| email_attribute | VARCHAR(100) | 邮箱属性 |
| first_name_attribute | VARCHAR(100) | 名属性 |
| last_name_attribute | VARCHAR(100) | 姓属性 |
| group_search_base | VARCHAR(500) | 组搜索基础DN |
| group_search_filter | VARCHAR(500) | 组搜索过滤器 |
| group_name_attribute | VARCHAR(100) | 组名属性 |
| auto_sync | BOOLEAN | 自动同步 |
| sync_interval | INTEGER | 同步间隔(小时) |
| last_sync_at | TIMESTAMP | 上次同步时间 |
| is_enabled | BOOLEAN | 是否启用 |

#### 3.7.4 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取LDAP设置 | GET | /rest/private/ldap/settings | 获取LDAP配置 |
| 保存LDAP设置 | POST | /rest/private/ldap/settings | 保存LDAP配置 |
| 测试连接 | POST | /rest/private/ldap/test | 测试LDAP连接 |
| 同步用户 | POST | /rest/private/ldap/sync | 手动同步用户 |
| 导入用户 | POST | /rest/private/ldap/import | 导入单个LDAP用户 |

---

### 3.8 设备导入导出 (Export/Import Devices)

#### 3.8.1 功能描述

设备导入导出功能允许管理员批量导入设备信息，或导出设备列表，支持CSV和Excel格式，便于设备管理和数据迁移。

#### 3.8.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| CSV批量导入 | 支持CSV格式批量导入 |
| Excel批量导入 | 支持.xlsx格式批量导入 |
| 设备数据导出 | 导出设备列表 |
| 导入模板下载 | 提供标准导入模板 |
| 导入数据验证 | 验证数据格式和完整性 |
| 导入进度跟踪 | 实时显示导入进度 |
| 导出字段选择 | 可选择导出的字段 |
| 历史记录管理 | 查看历史导入记录 |

#### 3.8.3 导入模板字段

| 字段 | 必填 | 说明 |
|------|------|------|
| IMEI/序列号 | 是 | 设备唯一标识 |
| 设备名称 | 否 | 显示名称 |
| 设备组 | 否 | 所属设备组名称 |
| 配置 | 否 | 应用配置名称 |
| 描述 | 否 | 设备描述 |
| 自定义字段 | 否 | 自定义属性JSON |

#### 3.8.4 数据库表结构

**device_imports**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| file_name | VARCHAR(255) | 文件名 |
| file_size | BIGINT | 文件大小 |
| status | VARCHAR(20) | PROCESSING/COMPLETED/FAILED |
| total_count | INTEGER | 总数 |
| success_count | INTEGER | 成功数 |
| failed_count | INTEGER | 失败数 |
| skipped_count | INTEGER | 跳过数 |
| error_details | TEXT | 错误详情(JSON) |
| started_at | TIMESTAMP | 开始时间 |
| completed_at | TIMESTAMP | 完成时间 |
| created_by | INTEGER | 导入人 |

#### 3.8.5 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 导入设备 | POST | /rest/private/devices/import | 批量导入设备 |
| 导出设备 | GET | /rest/private/devices/export | 导出设备(Excel/CSV) |
| 下载导入模板 | GET | /rest/private/devices/import/template | 下载导入模板 |
| 获取导入历史 | GET | /rest/private/devices/import/history | 获取导入历史记录 |

---

### 3.9 设备联系人管理 (Device Contacts Management)

#### 3.9.1 功能描述

设备联系人管理功能允许管理员集中管理设备的联系人信息，支持批量添加、更新、删除联系人，并可同步到指定设备。

#### 3.9.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 联系人CRUD | 创建、读取、更新、删除联系人 |
| 批量导入 | 从文件批量导入联系人 |
| 设备同步 | 将联系人同步到指定设备 |
| 联系人分组 | 支持分组管理联系人 |
| 联系人搜索 | 按姓名、电话等搜索 |
| 同步状态跟踪 | 查看同步状态和结果 |

#### 3.9.3 同步状态

| 状态 | 说明 |
|------|------|
| PENDING | 待同步 |
| SYNCED | 已同步 |
| SYNCING | 同步中 |
| ERROR | 同步失败 |

#### 3.9.4 数据库表结构

**device_contacts**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| device_id | INTEGER | 设备ID |
| customer_id | INTEGER | 客户ID |
| display_name | VARCHAR(255) | 显示名称 |
| first_name | VARCHAR(100) | 名 |
| last_name | VARCHAR(100) | 姓 |
| phone_numbers | TEXT | 电话号码(JSON) |
| emails | TEXT | 邮箱(JSON) |
| company | VARCHAR(255) | 公司 |
| job_title | VARCHAR(100) | 职位 |
| department | VARCHAR(100) | 部门 |
| notes | TEXT | 备注 |
| groups | TEXT | 分组(JSON) |
| photo_url | VARCHAR(500) | 头像URL |
| sync_status | VARCHAR(20) | 同步状态 |
| last_synced_at | TIMESTAMP | 上次同步时间 |
| sync_error | TEXT | 同步错误 |
| source | VARCHAR(20) | 来源(ADMIN/IMPORT/DEVICE) |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### 3.9.5 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取设备联系人 | GET | /rest/private/device-contacts/device/{deviceId} | 获取设备联系人 |
| 获取联系人详情 | GET | /rest/private/device-contacts/{id} | 获取联系人详情 |
| 创建联系人 | POST | /rest/private/device-contacts | 创建联系人 |
| 更新联系人 | PUT | /rest/private/device-contacts/{id} | 更新联系人 |
| 删除联系人 | DELETE | /rest/private/device-contacts/{id} | 删除联系人 |
| 搜索联系人 | GET | /rest/private/device-contacts/search | 搜索联系人 |
| 同步到设备 | POST | /rest/private/device-contacts/sync/{deviceId} | 同步到设备 |
| 批量同步 | POST | /rest/private/device-contacts/sync | 批量同步 |

---

### 3.10 白标软件 (White-Label Software)

#### 3.10.1 功能描述

白标软件功能允许企业定制自己的MDM应用，包括应用图标、名称、颜色主题、服务器URL等，打造专属的企业品牌MDM解决方案。

#### 3.10.2 核心功能列表

| 功能项 | 说明 |
|--------|------|
| 应用名称定制 | 自定义MDM Agent应用名称 |
| 应用图标定制 | 上传自定义应用图标 |
| 颜色主题定制 | 自定义主色调、强调色等 |
| 启动画面定制 | 自定义启动Logo和背景 |
| 服务器URL预配置 | 预配置默认服务器地址 |
| 签名证书管理 | 上传和管理APK签名证书 |
| APK自动构建 | 在线构建定制化APK |
| 构建历史管理 | 查看和管理历史构建 |
| 邮件模板定制 | 自定义系统邮件模板 |

#### 3.10.3 可定制项

| 类别 | 可定制项 |
|------|----------|
| 应用信息 | 应用名称、应用图标 |
| 启动画面 | Logo、背景颜色 |
| 主题颜色 | 主色调、强调色、状态栏颜色、导航栏颜色 |
| 服务器配置 | 默认服务器URL、允许用户修改 |
| 品牌信息 | 公司名称、公司网站、公司Logo、版权信息 |

#### 3.10.4 数据库表结构

**white_label_settings**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| app_name | VARCHAR(100) | 应用名称 |
| app_icon_url | VARCHAR(500) | 应用图标URL |
| splash_logo_url | VARCHAR(500) | 启动Logo URL |
| splash_background_color | VARCHAR(7) | 启动画面背景色 |
| primary_color | VARCHAR(7) | 主色调 |
| accent_color | VARCHAR(7) | 强调色 |
| status_bar_color | VARCHAR(7) | 状态栏颜色 |
| navigation_bar_color | VARCHAR(7) | 导航栏颜色 |
| server_url | VARCHAR(255) | 服务器URL |
| company_name | VARCHAR(255) | 公司名称 |
| company_website | VARCHAR(255) | 公司网站 |
| company_logo_url | VARCHAR(500) | 公司Logo URL |
| copyright_text | VARCHAR(500) | 版权信息 |
| show_branding | BOOLEAN | 显示品牌信息 |
| allow_server_change | BOOLEAN | 允许修改服务器 |
| show_help_link | BOOLEAN | 显示帮助链接 |

**white_label_builds**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| settings_id | INTEGER | 关联的设置ID |
| build_number | INTEGER | 构建编号 |
| version_name | VARCHAR(50) | 版本名称 |
| version_code | INTEGER | 版本代码 |
| status | VARCHAR(20) | PENDING/BUILDING/SUCCESS/FAILED |
| apk_url | VARCHAR(500) | APK下载URL |
| apk_size | BIGINT | APK大小 |
| apk_checksum | VARCHAR(64) | APK校验和 |
| is_signed | BOOLEAN | 是否签名 |
| keystore_alias | VARCHAR(100) | 密钥库别名 |
| created_at | TIMESTAMP | 创建时间 |
| started_at | TIMESTAMP | 开始构建时间 |
| completed_at | TIMESTAMP | 完成时间 |
| build_log | TEXT | 构建日志 |
| error_message | TEXT | 错误消息 |
| created_by | INTEGER | 构建人 |

**white_label_email_templates**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| customer_id | INTEGER | 客户ID |
| template_type | VARCHAR(50) | 模板类型 |
| subject | VARCHAR(255) | 邮件主题 |
| body_html | TEXT | HTML内容 |
| body_text | TEXT | 纯文本内容 |
| from_name | VARCHAR(255) | 发件人名称 |
| from_email | VARCHAR(255) | 发件人邮箱 |
| is_enabled | BOOLEAN | 是否启用 |

#### 3.10.5 API接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取品牌设置 | GET | /rest/private/white-label/rebranding | 获取白标设置 |
| 更新品牌设置 | PUT | /rest/private/white-label/rebranding | 更新白标设置 |
| 获取构建列表 | GET | /rest/private/white-label/builds | 获取构建历史 |
| 获取构建详情 | GET | /rest/private/white-label/builds/{id} | 获取构建详情 |
| 创建构建 | POST | /rest/private/white-label/builds | 创建新构建 |
| 触发构建 | POST | /rest/private/white-label/builds/{id}/trigger | 触发构建 |
| 下载APK | GET | /rest/private/white-label/builds/{id}/download | 下载APK |
| 删除构建 | DELETE | /rest/private/white-label/builds/{id} | 删除构建 |
| 获取邮件模板 | GET | /rest/private/white-label/email-templates | 获取邮件模板列表 |
| 获取单个模板 | GET | /rest/private/white-label/email-templates/{type} | 获取模板详情 |
| 保存邮件模板 | PUT | /rest/private/white-label/email-templates | 保存模板 |
| 删除邮件模板 | DELETE | /rest/private/white-label/email-templates/{id} | 删除模板 |

---

## 4. 用户角色与权限

### 4.1 用户角色

| 角色 | 说明 | 权限范围 |
|------|------|----------|
| 超级管理员 (Super Admin) | 系统最高管理员 | 所有功能，包括敏感操作 |
| 组织管理员 (Org Admin) | 客户组织管理员 | 本组织内所有设备管理 |
| 普通管理员 (Admin) | 普通管理员 | 受限的设备管理功能 |
| 查看者 (Viewer) | 只读用户 | 查看设备和配置信息 |

### 4.2 权限矩阵

| 功能 | 超级管理员 | 组织管理员 | 普通管理员 | 查看者 |
|------|------------|------------|------------|--------|
| 设备管理(CRUD) | ✓ | ✓ | ✓(受限) | 只读 |
| Kiosk模式配置 | ✓ | ✓ | ✓ | - |
| 远程命令 | ✓ | ✓ | ✓(受限) | - |
| 远程控制 | ✓ | ✓ | - | - |
| 位置跟踪 | ✓ | ✓ | ✓ | 只读 |
| 照片查看 | ✓ | ✓ | ✓ | 只读 |
| 网络过滤 | ✓ | ✓ | ✓ | - |
| 用户管理 | ✓ | ✓(本组织) | - | - |
| LDAP配置 | ✓ | ✓ | - | - |
| 白标设置 | ✓ | ✓ | - | - |
| 系统配置 | ✓ | - | - | - |

---

## 5. 技术栈

### 5.1 后端技术栈

| 组件 | 技术选型 |
|------|----------|
| 语言 | Java 8+ |
| 框架 | Jersey (JAX-RS) |
| 容器 | Tomcat 9 |
| ORM | MyBatis |
| 依赖注入 | Google Guice |
| 数据库 | PostgreSQL 14 |
| 消息推送 | MQTT + Long Polling |
| WebRTC信令 | WebSocket |

### 5.2 前端技术栈

| 组件 | 技术选型 |
|------|----------|
| 框架 | AngularJS 1.x |
| UI框架 | Bootstrap |
| 图表 | 自定义 |
| 地图 | Google Maps / 高德地图 |

### 5.3 移动端技术栈

| 组件 | 技术选型 |
|------|----------|
| 平台 | Android 7+ |
| 语言 | Kotlin / Java |
| 设备管理员 | DevicePolicyManager |

### 5.4 部署技术栈

| 组件 | 技术选型 |
|------|----------|
| 容器化 | Docker |
| 编排 | Docker Compose |
| 数据库 | PostgreSQL 14 |

---

## 6. 数据库迁移

所有数据库变更通过Liquibase管理，位于 `hmdm-server/install/sql/migrations/` 目录：

| 迁移文件 | 功能 | 说明 |
|----------|------|------|
| 001_kiosk_mode.sql | Kiosk模式 | 设备锁定和应用模式 |
| 002_device_locations.sql | 设备位置跟踪 | GPS位置记录 |
| 003_device_logs.sql | 设备日志 | 系统日志记录 |
| 004_remote_commands.sql | 远程命令 | 命令下发和执行 |
| 005_photo_management.sql | 照片管理 | 远程拍照和上传 |
| 006_remote_control.sql | 远程控制 | WebRTC屏幕控制 |
| 007_ldap_integration.sql | LDAP集成 | 企业身份认证 |
| 008_network_traffic_filtering.sql | 网络过滤 | 应用防火墙 |
| 009_import_export_jobs.sql | 导入导出 | 批量设备管理 |
| 010_device_photos.sql | 设备照片增强 | 照片功能增强 |
| 011_device_contacts.sql | 设备联系人 | 联系人同步 |
| 012_white_label.sql | 白标软件 | 品牌定制 |

---

## 7. 部署要求

### 7.1 硬件要求

| 环境 | CPU | 内存 | 磁盘 |
|------|-----|------|------|
| 开发环境 | 2核 | 4GB | 20GB |
| 生产环境 | 4核+ | 8GB+ | 100GB+ |

### 7.2 软件要求

| 组件 | 版本要求 |
|------|----------|
| JDK | 8+ |
| PostgreSQL | 14+ |
| Docker | 20.10+ |
| Docker Compose | 1.29+ |

### 7.3 网络要求

| 端口 | 服务 | 说明 |
|------|------|------|
| 8081 | HMDM Web | HTTP访问 |
| 31000 | MQTT | 设备通信 |
| 5433 | PostgreSQL | 数据库连接 |

---

## 8. 安全考虑

### 8.1 认证与授权

- 密码哈希：MD5(password).toUpperCase() + Salt → SHA1
- Session管理：基于HttpSession的会话认证
- JWT认证：用于API Token认证
- 权限控制：基于角色的访问控制(RBAC)

### 8.2 数据安全

- HTTPS传输：生产环境强制使用HTTPS
- 数据加密：敏感数据加密存储
- 审计日志：记录所有敏感操作

### 8.3 设备安全

- 设备注册：基于唯一设备标识(IMEI/序列号)
- 设备管理员：使用Android DevicePolicyManager
- 远程锁定/擦除：防止设备丢失后的数据泄露

---

## 9. 附录

### 9.1 API基础路径

| 环境 | 基础路径 |
|------|----------|
| 开发环境 | http://localhost:8080/rest |
| 生产环境 | https://your-domain.com/rest |

### 9.2 公共API vs 私有API

- `/rest/public/**` - 公开API，无需认证
- `/rest/private/**` - 私有API，需要认证

### 9.3 默认账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin | 超级管理员 |

---

*文档生成时间：2026-03-22*
