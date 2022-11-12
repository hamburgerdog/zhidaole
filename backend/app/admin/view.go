package admin

import (
	"backend/app/message"
	releasesource "backend/app/releaseSource"
	"backend/app/user"
	"backend/utils/errno"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMessage(c *gin.Context) {
	result, err := message.FindAllMsg()
	if err == nil {
		c.JSON(http.StatusOK, errno.OK.WithData(result))
	} else {
		c.JSON(http.StatusOK, errno.ErrParam)
	}
}

func GetUser(c *gin.Context) {
	result, err := user.FindAllUser()
	if err == nil {
		c.JSON(http.StatusOK, errno.OK.WithData(result))
	} else {
		c.JSON(http.StatusOK, errno.ErrParam)
	}
}

func GetRelease(c *gin.Context) {
	result, err := releasesource.FindAllRelease()
	if err == nil {
		c.JSON(http.StatusOK, errno.OK.WithData(result))
	} else {
		c.JSON(http.StatusOK, errno.ErrParam)
	}
}
