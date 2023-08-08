package handlers

import (
	"github.com/labstack/echo/v4"
	"mime/multipart"
	"net/http"
	"upload-service/s3"
)

type Upload struct {
	File   multipart.File
	Header *multipart.FileHeader
}

func UploadHandler(c echo.Context) error {
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	src, err := file.Open()
	if err != nil {
		return err
	}

	defer src.Close()

	result, err := s3.UploadToS3(c.Logger(), file.Filename, src)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, result)
}
