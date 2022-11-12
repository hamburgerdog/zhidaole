package utils

import (
	"fmt"

	"gopkg.in/ini.v1"
)

func initConfig() *ini.File {
	var err error
	cfg, err := ini.Load("./setting/backend.ini")
	if err != nil {
		fmt.Printf("Fail to read file:%v", err)
		return nil
	}
	return cfg
}

func GetPort() string {
	cfg := initConfig()
	return cfg.Section("server").Key("port").Value()
}

func GetAppInfo() (string, string) {
	appConfig := initConfig().Section("app")
	appID := appConfig.Key("ID").String()
	appSecret := appConfig.Key("Secret").String()
	return appID, appSecret
}

func getStatic() *ini.Section {
	return initConfig().Section("static")
}

func GetStaticPath() string {
	staticConfig := getStatic()
	return staticConfig.Key("static").String()
}

func GetImagePath() string {
	staticConfig := getStatic()
	return staticConfig.Key("images").String()
}

func GetCoverPath() string {
	staticConfig := getStatic()
	return staticConfig.Key("cover").String()
}

func GetMessagePath() string {
	staticConfig := getStatic()
	return staticConfig.Key("message").String()
}
