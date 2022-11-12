package admin

import "github.com/gin-gonic/gin"

func Urls(url *gin.RouterGroup) {
	url.GET("/getMessage", GetMessage)
	url.GET("/getUser", GetUser)
	url.GET("/getRelease", GetRelease)
}
