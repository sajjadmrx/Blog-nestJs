package main

import (
	"context"
	"github.com/joho/godotenv"
	"log"
	mongoDB "upload-service/internal/db/mongo"
	"upload-service/internal/server"
)

var (
	ctxTodo = context.TODO()
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	err = mongoDB.InitDB(ctxTodo)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	server.Run(":50052")
}
