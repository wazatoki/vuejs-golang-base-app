package postgresql

import (
	"github.com/jmoiron/sqlx"
	//sql driver import
	"vuejs-golang-base-app/utils/config"

	_ "github.com/lib/pq"
)

// Postgresql DB接続のための構造体
type Postgresql struct {
	url      string
	port     string
	user     string
	password string
	dbname   string
}

// WithDbContext DB処理のためのラッパー関数
func (postgresql *Postgresql) WithDbContext(fn func(db *sqlx.DB) error) error {
	d, err := postgresql.Open()
	defer d.Close()
	if err != nil {
		return err
	}

	return fn(d)
}

// Open 接続情報は設定ファイルから読み込み
func (postgresql *Postgresql) Open() (*sqlx.DB, error) {
	dataSourceName := "host=" + postgresql.url +
		" port=" + postgresql.port +
		" user=" + postgresql.user +
		" password=" + postgresql.password +
		" dbname=" + postgresql.dbname +
		" sslmode=disable"
	return sqlx.Open("postgres", dataSourceName)

}

// Migrate DBスキーマ設定
func (postgresql *Postgresql) Migrate() {
	err := postgresql.WithDbContext(execMigrateQuery)
	if err != nil {
		panic(err)
	}
}

func execMigrateQuery(d *sqlx.DB) (err error) {

	err = staff(d)
	if err != nil {
		return
	}

	return nil
}

// NewPostgresql コンストラクタ
func NewPostgresql() *Postgresql {
	p := &Postgresql{
		url:      config.DbUrl(),
		port:     config.DbPort(),
		user:     config.DbUser(),
		password: config.DbPassword(),
		dbname:   config.DbName(),
	}

	return p
}
