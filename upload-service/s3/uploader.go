package s3

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"mime/multipart"
	"os"
)

type MLogger interface {
	Fatal(input ...any)
}

func UploadToS3(logger MLogger, filename string, src multipart.File) (string, error) {
	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithEndpointResolverWithOptions(aws.EndpointResolverWithOptionsFunc(
			func(service, region string, options ...interface{}) (aws.Endpoint, error) {
				return aws.Endpoint{URL: os.Getenv("AWS_ENDPOINT")}, nil
			}),
		),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			os.Getenv("AWS_ACCESS_KEY_ID"),
			os.Getenv("AWS_SECRET_ACCESS_KEY"),
			"")),
	)
	if err != nil {
		logger.Fatal(err)
		return "", err
	}

	client := s3.NewFromConfig(cfg)

	uploader := manager.NewUploader(client)

	result, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String("blog-test"),
		Key:    aws.String(filename),
		Body:   src,
	})

	if err != nil {
		logger.Fatal(err)
		return "", err
	}

	return result.Location, nil
}
