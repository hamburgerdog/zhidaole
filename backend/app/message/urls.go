package message

import "github.com/gin-gonic/gin"

func Urls(url *gin.RouterGroup) {
	url.POST("/create", CreateMessage)
	url.POST("/update", UpdateMessage)
	url.POST("/uploadImage", UploadMsgImage)
	url.GET("/searchReleaseMsg", SearchReleaseMsg)
	url.GET("/searchByKeyword", SearchByKeyword)
	url.GET("/searchByKeywordAndID", SearchByKeywordAndID)
	url.DELETE("/deleteByID", DeleteByID)
}
