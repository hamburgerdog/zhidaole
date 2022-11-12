package releasesource

import (
	"backend/app/user"
	"backend/utils"
	"backend/utils/errno"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func CreateReleaseSource(c *gin.Context) {
	staticCoverPath := utils.GetCoverPath()

	sourceName := c.PostForm("sourceName")
	sourceInfo := c.PostForm("sourceInfo")
	isPublish := c.PostForm("isPublish") == "true"
	rootID := c.PostForm("rootID")

	fileUrl := utils.SaveFile(c, "sourceCover", sourceName, staticCoverPath)

	release, err := InsertReleaseSource(sourceName, sourceInfo, fileUrl, isPublish, rootID)
	if err == nil {
		user.PushUserOwnReleaseMessage(rootID, release.ReleaseSourceID)
		c.JSON(http.StatusOK, errno.OK.WithData(release))
	}
	c.JSON(http.StatusOK, errno.ReleaseError.WithData(release))
}

func SeachReleaseByIDList(c *gin.Context) {
	idList := c.QueryArray("idList")
	releaseList, err := FindReleaseSourceByIDList(idList)
	if err == nil {
		c.JSON(http.StatusOK, errno.OK.WithData(releaseList))
	} else {
		c.JSON(http.StatusOK, errno.ErrServer)
	}
}

func SeachReleaseByKeyword(c *gin.Context) {
	keyword := c.Query("keyword")
	var releaseList []ReleaseSource
	if strings.HasPrefix(keyword, "id:") {
		releaseList = FindReleaseSourceByID(keyword[3:])
	} else {
		releaseList = FindReleaseSourceListByName(keyword)
	}
	c.JSON(http.StatusOK, errno.OK.WithData(releaseList))
}

func SearchUserSubReleaseSource(c *gin.Context) {
	userID := c.Query("userID")
	user, err := user.FindUser(userID)
	if err != nil {
		c.JSON(http.StatusOK, errno.ErrParam.WithID(userID))
		fmt.Printf("err: %v\n", err)
	} else {
		subReleaseList, err := FindReleaseSourceByIDList(user.SubscribedSourcesIDList)
		if err == nil {
			c.JSON(http.StatusOK, errno.OK.WithData(subReleaseList))
		} else {
			c.JSON(http.StatusOK, errno.ErrParam.WithID(userID))
			fmt.Printf("err: %v\n", err)
		}
	}
}

func SearchUserOwnReleaseSource(c *gin.Context) {
	userID := c.Query("userID")
	user, err := user.FindUser(userID)
	if err != nil {
		c.JSON(http.StatusOK, errno.ErrParam.WithID(userID))
		fmt.Printf("err: %v\n", err)
	} else {
		subReleaseList, err := FindReleaseSourceByIDList(user.OwnReleaseMessageIDList)
		if err == nil {
			c.JSON(http.StatusOK, errno.OK.WithData(subReleaseList))
		} else {
			c.JSON(http.StatusOK, errno.ErrParam.WithID(userID))
			fmt.Printf("err: %v\n", err)
		}
	}
}

func GetCover(c *gin.Context) {
	releaseID := c.Query("releaseID")
	c.JSON(http.StatusOK, FindCover(releaseID))
}

func DeleteReleaseById(c *gin.Context) {
	type requestJSON struct {
		ReleaseID string `json:"releaseID"`
	}
	var rJson requestJSON
	c.BindJSON(&rJson)
	err := DelReleaseByID(rJson.ReleaseID)
	if err == nil {
		c.JSON(http.StatusOK, errno.OK)
		return
	}
	c.JSON(http.StatusOK, errno.ErrParam.WithID(rJson.ReleaseID))
}
