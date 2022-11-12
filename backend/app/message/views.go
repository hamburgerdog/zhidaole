package message

import (
	releasesource "backend/app/releaseSource"
	"backend/utils"
	"backend/utils/errno"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UploadMsgImage(c *gin.Context) {
	staticMsgPath := utils.GetMessagePath()

	imageID := uuid.New().String()[:13]
	fileUrl := utils.SaveFile(c, "msgImage", imageID, staticMsgPath)

	c.JSON(http.StatusOK, fileUrl)
}

func CreateMessage(c *gin.Context) {
	var requestBody Message
	err := c.BindJSON(&requestBody)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		return
	}

	messageID, err := InsertMessage(requestBody)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		return
	}
	releasesource.UpdateRSMsgIDs(requestBody.OriginID, messageID)

	c.JSON(http.StatusOK, errno.OK)
}

func UpdateMessage(c *gin.Context) {
	var requestBody Message
	err := c.BindJSON(&requestBody)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		return
	}

	err = UpdateMessageByID(requestBody)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		return
	}
	releasesource.UpdateRSMsgIDs(requestBody.OriginID, requestBody.MessageID)

	c.JSON(http.StatusOK, errno.OK)
}

func SearchReleaseMsg(c *gin.Context) {
	releaseID := c.Query("releaseID")
	messageIDs := releasesource.GetMsgIDs(releaseID)
	msgList, err := FindMessageList(messageIDs)
	if err == nil {
		c.JSON(http.StatusOK, errno.OK.WithData(msgList))
	}
}

func SearchByKeyword(c *gin.Context) {
	keyword := c.Query("keyword")
	result := FindMessageByKeyword(keyword)
	c.JSON(http.StatusOK, errno.OK.WithData(result))
}

func SearchByKeywordAndID(c *gin.Context) {
	releaseID := c.Query("releaseID")
	keyword := c.Query("keyword")
	result := FindMsgByKeywordAndOriginID(releaseID, keyword)
	c.JSON(http.StatusOK, errno.OK.WithData(result))
}

func DeleteByID(c *gin.Context) {
	type requestJSON struct {
		MessageID string `json:"messageID"`
	}
	var rJson requestJSON
	c.BindJSON(&rJson)
	messageID, err := primitive.ObjectIDFromHex(rJson.MessageID)
	if err == nil {
		err = DeleMsgByID(messageID)
		if err == nil {
			c.JSON(http.StatusOK, errno.OK)
			return
		}
	}
	c.JSON(http.StatusOK, errno.ErrParam.WithID(rJson.MessageID))
}
