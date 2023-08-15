package main

import (
	"context"
	mongoDB "gallery-service/internal/db/mongo"
	"gallery-service/internal/server"
	"github.com/joho/godotenv"
	"log"
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
