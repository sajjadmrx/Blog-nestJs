package mongoDB

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

var (
	databaseName   = "gallery"
	collectionName = "imgs"
	collection     *mongo.Collection
)

type Gallery struct {
	ID        primitive.ObjectID `bson:"_id"`
	CreatedAt time.Time          `bson:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at"`
	Url       string             `bson:"url"`
}

func InitDB(ctxTodo context.Context) error {
	clientOptions := options.Client().ApplyURI(fmt.Sprintf("mongodb://localhost:27017/%s", databaseName))
	client, err := mongo.Connect(ctxTodo, clientOptions)
	if err != nil {
		return err
	}

	collection = client.Database(databaseName).Collection(collectionName)

	err = client.Ping(ctxTodo, nil)
	if err != nil {
		return err
	}
	return nil
}

func CreateGallery(ctxTodo context.Context, gallery *Gallery) error {
	_, err := collection.InsertOne(ctxTodo, gallery)
	return err
}
