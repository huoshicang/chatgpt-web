# ChatGPT Web

> 声明：此项目只发布于 GitHub，基于 MIT 协议，免费且作为开源学习使用。并且不会有任何形式的卖号、付费服务、讨论群、讨论组等行为。谨防受骗。
> 
> 体验地址：[ChatGPT Web](https://chat.fondlike.top/)

![cover](./docs/Snipaste_2024-02-18_19-51-16.png)
![cover2](./docs/Snipaste_2024-02-18_19-50-34.png)
![cover2](./docs/Snipaste_2024-02-18_19-51-41.png)


## 介绍

提供了非官方 `ChatGPT API` 方法

| 方式                                          | 免费？ | 可靠性     | 质量 |
| --------------------------------------------- | ------ | ---------- | ---- |
| `ChatGPTAPI(gpt-3.5-turbo-0301)`                           | 否     | 可靠       | 相对较笨 |

警告： 

使用 `API` 时，如果网络不通，那是国内被墙了，你需要自建代理，绝对不要使用别人的公开代理，那是危险的。


环境变量：

全部参数变量请查看或[这里](#环境变量)

```
/service/.env.example
```


## 前置要求

### Node

`node` 开发环境 `v20.0.0`

```shell
node -v
```

### PNPM
如果你没有安装过 `pnpm`
```shell
npm install pnpm -g
```

### 后端

进入文件夹 `/service` 运行以下命令

安装依赖

```shell
pnpm install
```

运行

```shell
pnpm run start
```

### 前端
安装依赖

```shell
pnpm install
```

运行

```shell
pnpm run dev
```

打包

```shell
pnpm run build
```


## 打包

### 使用 Docker

#### Docker 参数示例

![docker](./docs/Snipaste_2024-02-18_20-04-04.png)

#### Docker build & Run

```bash
docker build -t chatgpt-web .

# 前台运行
docker run --name chatgpt-web --rm -it -p 127.0.0.1:3002:3002 --env PORT=3001 --env LOGGER="dev" --env SECRET="Miss" --env MONGO_URL="mongodb://root:chatgpt@mongo:27017" --env CHATGPTPROXY="https://chatgptproxy-mnuvueudps.ap-southeast-1.fcapp.run/v1/chat/completions" chatgpt-web
# 后台运行
docker run --name chatgpt-web --rm -it -p 127.0.0.1:3002:3002 --env PORT=3001 --env LOGGER="dev" --env SECRET="Miss" --env MONGO_URL="mongodb://root:chatgpt@mongo:27017" --env CHATGPTPROXY="https://chatgptproxy-mnuvueudps.ap-southeast-1.fcapp.run/v1/chat/completions" chatgpt-web -d
# 运行地址
http://localhost:3002/
```

#### Docker compose

[Hub 地址](https://hub.docker.com/repository/docker/chenzhaoyu94/chatgpt-web/general)

```yml
version: '3'

services:
  mongo:
    image: mongo:latest
    container_name: chatgptweb-database
    ports:
      - "27017:27017"
    environment:
      # 数据库管理员名称
      MONGO_INITDB_ROOT_USERNAME: root
      # 数据库管理员密码
      MONGO_INITDB_ROOT_PASSWORD: chatgpt
      TZ: Asia/Shanghai
      LANG: C.UTF-8
    volumes:
      - mongodb_data:/data/db # 持久化数据到宿主机目录（假设你希望持久化数据）

  app:
    image: fondlike/chatgpt-web:v2.1
    container_name: chatgpt-web-app
    restart: unless-stopped
    ports:
      - "80:3001"
    depends_on:
      - mongo
    environment:
      # 服务端口
      PORT: 3001
      # 日志等级
      LOGGER: "dev"
      # 加密盐
      SECRET: "Miss"
      # 数据库地址
      MONGO_URL: mongodb://root:chatgpt@mongo:27017
      # 反向代理地址
      CHATGPTPROXY: "https://chatgptproxy-mnuvueudps.ap-southeast-1.fcapp.run/v1/chat/completions"

volumes:
  mongodb_data: {} # 定义一个数据卷来持久化MongoDB的数据
```


### 手动打包
#### 后端服务
> 如果你不需要本项目的 `node` 接口，可以省略如下操作

复制 `service` 文件夹到你有 `node` 服务环境的服务器上。

```shell
# 安装
pnpm install

# 运行
pnpm run start
```

#### 前端网页

1、修改根目录下 `.env` 文件中的 `VITE_GLOB_API_URL` 为你的实际后端接口地址

2、根目录下运行以下命令，然后将 `dist` 文件夹内的文件复制到你网站服务的根目录下

