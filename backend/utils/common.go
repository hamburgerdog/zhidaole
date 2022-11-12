package utils

import (
	"fmt"
	"strings"

	"github.com/gin-gonic/gin"
)

func SaveFile(c *gin.Context, fileKey string, fileName string, saveUrl string) string {
	sourceCoverFileHeader, err := c.FormFile(fileKey)
	fileUrl := ""
	if err == nil {
		fileNameSplit := strings.Split(sourceCoverFileHeader.Filename, ".")
		fileType := fileNameSplit[len(fileNameSplit)-1]
		fileUrl = fmt.Sprintf("%v/%v.%v", saveUrl, fileName, fileType)
		c.SaveUploadedFile(sourceCoverFileHeader, fileUrl)
	}
	return fileUrl
}

func IsContain(items []interface{}, item interface{}) bool {
	for _, eachItem := range items {
		if eachItem == item {
			return true
		}
	}
	return false
}
