package server

import (
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"
	handlers "upload-service/internal/server/handler"
	pb "upload-service/out_protos/protos"
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
