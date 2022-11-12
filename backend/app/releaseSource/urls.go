package releasesource

import "github.com/gin-gonic/gin"

func Urls(url *gin.RouterGroup) {
	url.POST("/createReleaseSource", CreateReleaseSource)
	url.GET("/seachReleaseByIDList", SeachReleaseByIDList)
	url.GET("/seachReleaseByKeyword", SeachReleaseByKeyword)
	url.GET("/searchUserSubReleaseSource", SearchUserSubReleaseSource)
	url.GET("/searchUserOwnReleaseSource", SearchUserOwnReleaseSource)
	url.GET("/getCover", GetCover)
	url.DELETE("/delete", DeleteReleaseById)
}
