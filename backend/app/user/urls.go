package user

import "github.com/gin-gonic/gin"

func Urls(url *gin.RouterGroup) {
	url.GET("/login", LoginByCode)
	url.GET("/userSubReleaseSource", UserSubReleaseSource)
}
