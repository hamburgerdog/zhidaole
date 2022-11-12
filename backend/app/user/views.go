package user

import (
	"backend/utils"
	"backend/utils/errno"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/medivhzhan/weapp/v3"
)

var appID, appSecret = utils.GetAppInfo()
var sdk = weapp.NewClient(appID, appSecret)

func LoginByCode(c *gin.Context) {
	code := c.Query("code")
	userName := c.Query("userName")
	loginResp, err := sdk.Login(code)
	curUserID := loginResp.OpenID

	if err == nil {
		curUser, err := FindUser(curUserID)
		if err != nil {
			curUser = RegitserUser(curUserID, userName)
		}
		c.JSON(http.StatusOK, errno.OK.WithData(curUser))
	} else {
		c.JSON(http.StatusOK, errno.ErrParam.WithData(gin.H{
			"code":     code,
			"userName": userName,
		}))
	}
}

func UserSubReleaseSource(c *gin.Context) {
	userID := c.Query("userID")
	releaseID := c.Query("releaseID")

	result, err := PushUserSubReleaseIntoList(userID, releaseID)
	if err == nil {
		c.JSON(http.StatusOK, errno.OK.WithData(result))
	} else {
		type userErrorMsg struct {
			ReleaseID string `json:"ReleaseID"`
		}
		c.JSON(http.StatusOK, errno.ErrParam.WithData(&userErrorMsg{ReleaseID: releaseID}))
	}
}
