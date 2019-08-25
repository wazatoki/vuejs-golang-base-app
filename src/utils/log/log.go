package log

import (
	"vuejs-golang-base-app/infrastructures/zap"
)

func Debug(message string) {
	zap.GetLogger().Debug(message)
}

func Info(message string) {
	zap.GetLogger().Info(message)
}

func Warn(message string) {
	zap.GetLogger().Warn(message)
}

func Error(message string) {
	zap.GetLogger().Error(message)
}
