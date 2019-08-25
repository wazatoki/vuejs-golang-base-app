package main

import (
	"vuejs-golang-base-app/infrastructures/echo"
	"vuejs-golang-base-app/infrastructures/viper"
)

//　start applicaton
func main() {
	// configuration
	viper.SetupAppConfig()
	echo.StartEcho()
}
