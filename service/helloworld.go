package service

import (
	"context"
	"fmt"

	"github.com/hirokikojima/grpc-example/pb"
)

type HelloWorldService struct{}

func NewHelloWorldService() *HelloWorldService {
	return &HelloWorldService{}
}

func (s *HelloWorldService) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{
		Message: fmt.Sprintf("Hello %s", req.Name),
	}, nil
}
