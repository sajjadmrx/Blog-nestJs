package server

import (
	"fmt"
	handlers "gallery-service/internal/server/handler"
	pb "gallery-service/out_protos/protos"
	"google.golang.org/grpc"
	"log"
	"net"
)

func Run(port string) {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	server := grpc.NewServer()
	pb.RegisterUploadServer(server, &handlers.UploadServer{})

	log.Println(fmt.Sprintf("Starting gRPC server on %s", port))
	err = server.Serve(listen)
	if err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}

}
