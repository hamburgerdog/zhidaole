package routers

import (
	"backend/app/admin"
	"backend/app/message"
	releasesource "backend/app/releaseSource"
	"backend/app/user"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

var rMain = gin.Default()

func MainRun() {
	include("/user", user.Urls)
	include("/origin", releasesource.Urls)
	include("/message", message.Urls)
	include("/admin", admin.Urls)

	static := utils.GetStaticPath()
	rMain.Static("/static", static)
	rMain.Run(utils.GetPort())
}

func include(url string, urls func(*gin.RouterGroup)) {
	group := rMain.Group(url)
	urls(group)
}
