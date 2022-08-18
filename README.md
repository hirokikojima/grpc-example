# grpc-example
## 概要
gRPCの動作確認用

## コマンド
### protoのビルド
```
protoc -I proto/ --go_out=./proto proto/helloworld.proto
```

### コンテナ起動
```
docker-compose up -d --build
```

### サーバ起動
```
docker exec -it grpc-server go run ./server/server.go
```

### クライアント起動
```
docker exec -it grpc-client node ./client/index.js
```

### ネットワーク
#### 切断
```
# サーバ切断
docker network disconnect grpc-example_default grpc-server

# クライアント切断
docker network disconnect grpc-example_default grpc-client
```

#### 切断
```
# サーバ切断
docker network connect grpc-example_default grpc-server

# クライアント切断
docker network connect grpc-example_default grpc-client
```

## Tips
### HTTP/2のデバッグログを有効化
```
GODEBUG=http2debug=2 go run ./server/server.go
```