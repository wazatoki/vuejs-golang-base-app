package repositories

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

//go:generate sqlboiler --wipe -o dao -p dao psql

//WithDbContexter databaseOpen,close処理のためのinterface
type WithDbContexter interface {
	WithDbContext(func(db *sqlx.DB) error) error
}

// CreateID id用のユニーク文字列作成
func CreateID() string {
	return time.Now().Format("20060102150405") + uuid.Must(uuid.NewRandom()).String()
}

// BaseField has basic fields for db access
type BaseField struct {
	withDbContexter WithDbContexter
	ID              string    `db:"id"`
	Del             bool      `db:"del"`
	CreDate         time.Time `db:"created_at"`
	CreStaffID      string    `db:"cre_staff_id"`
	OpeDate         time.Time `db:"updated_at"`
	OpeStaffID      string    `db:"update_staff_id"`
}

// SetBaseFieldForInsert set basci fields for insert
func (b *BaseField) SetBaseFieldForInsert() {
	nowTime := time.Now()
	b.ID = nowTime.Format("20060102150405") + uuid.Must(uuid.NewRandom()).String()
	b.CreDate = nowTime
	b.CreStaffID = ""
	b.OpeDate = nowTime
	b.OpeStaffID = ""
}

// SetBaseFieldForUpdate set basci fields for update
func (b *BaseField) SetBaseFieldForUpdate(id string) error {
	if id == "" {
		return errors.New("id is blank")
	}
	nowTime := time.Now()
	b.ID = id
	b.OpeDate = nowTime
	b.OpeStaffID = ""
	return nil
}
