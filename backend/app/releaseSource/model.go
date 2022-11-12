package releasesource

import (
	"backend/utils"
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
)

type ReleaseSource struct {
	ReleaseSourceID          string        `bson:"_id"`
	ReleaseSourceName        string        `bson:"releaseSourceName"`
	ReleaseSourceInfo        string        `bson:"releaseSourceInfo"`
	ReleaseSourceCoverUrl    string        `bson:"releaseSourceCoverUrl"`
	IsReleaseSourcePublished bool          `bson:"isPublished"`
	ReleaseMessageIDs        []interface{} `bson:"releaseMessageIDs"`
	UpdateTime               time.Time     `bson:"updateTime"`
	RootIDs                  []string      `bson:"rootIDs"`
}

var ReleaseSourceCollection = utils.GetZhidaoleDB().Collection("release_source")
var background = context.Background()

func UpdateRSMsgIDs(releaseID string, messageID interface{}) error {
	release := FindReleaseSourceByID(releaseID)[0]
	if !utils.IsContain(release.ReleaseMessageIDs, messageID) {
		err := ReleaseSourceCollection.UpdateOne(background, release, bson.M{"$set": bson.M{"releaseMessageIDs": append(release.ReleaseMessageIDs, messageID)}})
		return err
	}
	return errors.New("当前消息已添加！")
}

func InsertReleaseSource(rsName string, rsInfo string, rsCoverUrl string, isPublish bool, rootID string) (ReleaseSource, error) {
	rootIDList := make([]string, 0)
	rootIDList = append(rootIDList, rootID)
	releaseID := uuid.NewString()
	newReleaseSource := &ReleaseSource{
		ReleaseSourceID:          releaseID,
		ReleaseSourceName:        rsName,
		ReleaseSourceInfo:        rsInfo,
		ReleaseSourceCoverUrl:    rsCoverUrl,
		IsReleaseSourcePublished: isPublish,
		ReleaseMessageIDs:        make([]interface{}, 0),
		RootIDs:                  rootIDList,
		UpdateTime:               time.Now(),
	}

	//	插入失败，通常是由于数据源重复了
	_, err := ReleaseSourceCollection.InsertOne(background, newReleaseSource)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	return *newReleaseSource, err
}

func FindReleaseSourceByID(releaseID string) []ReleaseSource {
	result := []ReleaseSource{}
	err := ReleaseSourceCollection.Find(background, bson.M{"_id": releaseID}).All(&result)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	return result
}

func FindReleaseSourceByIDList(releaseIDList []string) ([]ReleaseSource, error) {
	result := []ReleaseSource{}
	err := ReleaseSourceCollection.Find(background, bson.M{"_id": bson.M{"$in": releaseIDList}}).All(&result)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	return result, err
}

func FindReleaseSourceListByName(keyword string) []ReleaseSource {
	result := []ReleaseSource{}
	err := ReleaseSourceCollection.Find(background, bson.M{"releaseSourceName": bson.M{"$regex": "(?i)" + keyword}, "isPublished": true}).All(&result)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	return result
}

func FindCover(releaseID string) string {
	release := FindReleaseSourceByID(releaseID)[0]
	return release.ReleaseSourceCoverUrl
}

func GetMsgIDs(releaseID string) []interface{} {
	release := FindReleaseSourceByID(releaseID)[0]
	return release.ReleaseMessageIDs
}

func FindAllRelease() ([]ReleaseSource, error) {
	result := []ReleaseSource{}
	err := ReleaseSourceCollection.Find(background, bson.M{"_id": bson.M{"$regex": "(.*)"}}).All(&result)
	return result, err
}

func DelReleaseByID(releaseID string) error {
	return ReleaseSourceCollection.Remove(background, bson.M{"_id": releaseID})
}
