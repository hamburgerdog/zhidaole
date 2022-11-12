package utils

import (
	"context"
	"log"

	"github.com/qiniu/qmgo"
)

var mgoClient *qmgo.Client
var ctx context.Context

func initEngine() {
	ctx = context.Background()

	var err error
	mgoClient, err = qmgo.NewClient(ctx, &qmgo.Config{Uri: "mongodb://localhost:27017"})

	if err != nil {
		log.Fatal(err)
	}

	err = mgoClient.Ping(5000)

	if err != nil {
		log.Fatal(err)
	}
}

func CloseClient() {
	if err := mgoClient.Close(ctx); err != nil {
		panic(err)
	}
}

func GetMgoCli() *qmgo.Client {
	if mgoClient == nil {
		initEngine()
	}
	return mgoClient
}

func GetClassWordDB() *qmgo.Database {
	return GetMgoCli().Database("class_work")
}

func GetZhidaoleDB() *qmgo.Database {
	return GetMgoCli().Database("zhidaole")
}
