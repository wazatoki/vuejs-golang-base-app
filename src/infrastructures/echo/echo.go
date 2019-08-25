package echo

import (
	"context"
	"os"
	"os/signal"
	"time"

	"vuejs-golang-base-app/utils/config"
	"vuejs-golang-base-app/utils/log"

	"github.com/labstack/echo"
)

// StartEcho http server start
func StartEcho() {
	e := echo.New()
	e.Static("/", "resources")
	defineRouting(e)
	go func() {
		log.Info("start server")
		if err := e.Start(":" + config.HttpPort()); err != nil {
			log.Info("shutting down the server")
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 10 seconds.
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}

}
