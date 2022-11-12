package message

import (
	"backend/utils"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Message struct {
	MessageID   primitive.ObjectID `bson:"_id" json:"messageID"`
	OriginID    string             `bson:"originID" json:"releaseSourceID"`
	Title       string             `bson:"title" json:"msgTitle"`
	Detail      string             `bson:"detail" json:"msgDetail"`
	SubTitle    string             `bson:"subTitle" json:"subTitle"`
	StartTime   string             `bson:"startTime" json:"startTime"`
	EndTime     string             `bson:"endTime" json:"endTime"`
	Tips        string             `bson:"tips" json:"tips"`
	Connect     string             `bson:"connect" json:"connect"`
	Location    Location           `bson:"location" json:"location"`
	ImgPathList []string           `bson:"imgPathList" json:"imgPathList"`
}

type Location struct {
	ID      string `bson:"id" json:"id"`
	Title   string `bson:"title" json:"title"`
	Address string `bson:"address" json:"address"`
	Lat     string `bson:"lat" json:"lat"`
	Lng     string `bson:"lng" json:"lng"`
}

var MessageCollection = utils.GetZhidaoleDB().Collection("message")
var background = context.Background()

func FindAllMsg() ([]Message, error) {
	result := []Message{}
	err := MessageCollection.Find(background, bson.M{"title": bson.M{"$regex": "(.*)"}}).All(&result)
	return result, err
}

func InsertMessage(message Message) (interface{}, error) {
	if message.MessageID.IsZero() {
		message.MessageID = primitive.NewObjectID()
	}
	result, err := MessageCollection.InsertOne(background, message)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	return result.InsertedID, err
}

func UpdateMessageByID(message Message) error {
	return MessageCollection.UpdateOne(background, bson.M{"_id": message.MessageID}, bson.M{"$set": message})
}

func FindMessageList(messageIDList []interface{}) ([]Message, error) {
	result := []Message{}
	err := MessageCollection.Find(background, bson.M{"_id": bson.M{"$in": messageIDList}}).All(&result)
	return result, err
}

func FindMessageByKeyword(keyword string) []Message {
	result := []Message{}
	MessageCollection.Find(background, bson.M{"title": bson.M{"$regex": "(?i)" + keyword}}).All(&result)
	return result
}

func FindMsgByKeywordAndOriginID(originID string, keyword string) []Message {
	result := []Message{}
	MessageCollection.Find(background, bson.M{"title": bson.M{"$regex": "(?i)" + keyword}, "originID": originID}).All(&result)
	return result
}

func DeleMsgByID(messageID primitive.ObjectID) error {
	return MessageCollection.Remove(background, bson.M{"_id": messageID})
}
