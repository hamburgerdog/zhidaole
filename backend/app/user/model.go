package user

import (
	"backend/utils"
	"context"
	"fmt"
	"sort"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	UserID                  string   `bson:"_id"`
	UserName                string   `bson:"userName"`
	Email                   string   `bson:"email"`
	SubscribedSourcesIDList []string `bson:"subscribedSourcesIDList"`
	OwnReleaseMessageIDList []string `bson:"ownReleaseMessageIDList"`
}

var userCollection = utils.GetZhidaoleDB().Collection("user")

func RegitserUser(userID string, userName string) User {
	newUser := &User{
		UserID:                  userID,
		UserName:                userName,
		Email:                   "",
		SubscribedSourcesIDList: make([]string, 0),
		OwnReleaseMessageIDList: make([]string, 0),
	}
	userCollection.InsertOne(context.Background(), newUser)
	return *newUser
}

func FindAllUser() ([]User, error) {
	result := []User{}
	err := userCollection.Find(context.Background(), bson.M{"_id": bson.M{"$regex": "(.*)"}}).All(&result)
	return result, err
}

func FindUser(userID string) (User, error) {
	curUser := User{}
	err := userCollection.Find(context.Background(), bson.M{"_id": userID}).One(&curUser)
	return curUser, err
}

func checkForReleaseListDuplicates(releaseIDList []string, releaseID string) error {
	sort.Strings(releaseIDList)
	pos := sort.SearchStrings(releaseIDList, releaseID)
	if pos != len(releaseIDList) {
		if releaseID == releaseIDList[pos] {
			return fmt.Errorf("releaseID be used !\treleaseID:%v", releaseID)
		}
	}
	return nil
}

func PushUserOwnReleaseMessage(userID string, releaseID string) (User, error) {
	curUser, err := FindUser(userID)
	if err == nil {
		err = checkForReleaseListDuplicates(curUser.OwnReleaseMessageIDList, releaseID)
		if err == nil {
			curUser.OwnReleaseMessageIDList = append(curUser.OwnReleaseMessageIDList, releaseID)
			err = userCollection.UpdateOne(context.Background(), bson.M{"_id": userID}, bson.M{"$set": curUser})
			if err != nil {
				fmt.Printf("err: %v\n", err)
			}
		}
	}
	return curUser, err
}

func PushUserSubReleaseIntoList(userID string, releaseID string) (User, error) {
	curUser, err := FindUser(userID)
	err = checkForReleaseListDuplicates(curUser.SubscribedSourcesIDList, releaseID)
	if err == nil {
		curUser.SubscribedSourcesIDList = append(curUser.SubscribedSourcesIDList, releaseID)
		err = userCollection.UpdateOne(context.Background(), bson.M{"_id": userID}, bson.M{"$set": curUser})
		if err != nil {
			fmt.Printf("err: %v\n", err)
		}
	}
	return curUser, err
}
