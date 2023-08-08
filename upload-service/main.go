package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"
	"upload-service/handlers"
)

func init() {
	godotenv.Load()
}

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	fmt.Println("AWS: ", os.Getenv("AWS_SECRET_ACCESS_KEY"))
	e.POST("/", handlers.UploadHandler)

	e.Logger.Fatal(e.Start(":3000"))

}
