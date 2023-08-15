package handlers

import (
	"bytes"
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
	"time"
	mongoDB "upload-service/internal/db/mongo"
	pb "upload-service/out_protos/protos"
	"upload-service/s3"
)

type UploadServer struct {
	pb.UnimplementedUploadServer
}

func (s UploadServer) UploadImage(ctxTodo context.Context, request *pb.UploadImageRequest) (*pb.UploadImageResponse, error) {

	imageData := request.GetImage()
	imageFile := bytes.NewReader(imageData)

	imageUrl, err := s3.UploadToS3(request.GetFilename(), imageFile)
	if err != nil {
		log.Printf("Error uploading image: %v", err)

		// Create a gRPC error with custom error message and code
		grpcErr := status.Errorf(codes.Internal, "Failed to upload image: %v", err)
		return nil, grpcErr
	}

	err = mongoDB.CreateGallery(ctxTodo, &mongoDB.Gallery{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Url:       imageUrl,
	})

	if err != nil {
		log.Printf("Error save image: %v", err)
		grpcErr := status.Errorf(codes.Internal, "Failed to save image")
		return nil, grpcErr
	}

	return &pb.UploadImageResponse{ImageUrl: imageUrl}, nil
}

func (s *UploadServer) GetAllMedia(ctx context.Context, request *pb.GetAllMediaRequest) (*pb.GetAllMediaResponse, error) {
	media := []*pb.Image{
		{Url: "example.com/image1"},
		{Url: "example.com/image2"},
	}
	return &pb.GetAllMediaResponse{Media: media}, nil
}
