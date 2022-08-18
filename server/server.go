package main

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	"github.com/hirokikojima/grpc-example/pb"
	"github.com/hirokikojima/grpc-example/service"
)

func main() {
	port := 50051
	listenPort, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	server := grpc.NewServer()

	pb.RegisterGreeterServer(server, service.NewHelloWorldService())

	log.Printf("listen on: %d", port)

	if err := server.Serve(listenPort); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
