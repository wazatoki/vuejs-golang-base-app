# vuejs-golang-base-app

## Overview

This project is base project for Web Application by vuejs and go.

The development environment is assumed to be linux.

## Dependency
* Docker
* goenv
* nodenv
* postgresql
* sqlboiler


## DB Setup

* url: localhost:5432/demodb
* username: demo
* password: demo

### db setup by docker on linux

execute tools/postgresql_container/start_database.sh

### production setup

prease setup production database by postgresql

## Usage

1. anyenv update plugin install

  git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update

  anyenv update

1. install golang

  goenv install 1.12.9
  goenv local 1.12.9

1. install nodejs

  nodenv install 12.9.0
  nodenv local 12.9.0

1. install sqlboiler  

  go get -u -t github.com/volatiletech/sqlboiler
  go get github.com/volatiletech/sqlboiler/drivers/sqlboiler-psql

1. download dependency liblalyies

  cd src  
  go build

  cd js  
  npm install



## Licence
MIT Licence

## Author
wazatoki

## References
