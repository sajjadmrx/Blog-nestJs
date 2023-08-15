package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"io/ioutil"
	"log"
	pb "upload-service/out_protos/protos" // به اینجا به عنوان مسیر پکیج تولید شده در سرور اشاره کنید
)

func main() {

	conn, err := grpc.Dial("localhost:50052", grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	client := pb.NewUploadClient(conn)

	imageData, err := ioutil.ReadFile("test.png")
	if err != nil {
		log.Fatal(err)
	}

	uploadResponse, err := client.UploadImage(context.Background(), &pb.UploadImageRequest{
		Image:    imageData,
		Filename: "test.png",
	})
	if err != nil {
		log.Fatal(err)
	}

	imageUrl := uploadResponse.GetImageUrl()
	fmt.Println("Uploaded image URL:", imageUrl)
}
