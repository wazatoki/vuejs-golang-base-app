package postgresql

import "github.com/jmoiron/sqlx"

func staff(d *sqlx.DB) (err error) {
	err = createStaff(d)
	if err != nil {
		return
	}

	return nil
}

func createStaff(d *sqlx.DB) (err error) {

	// create staff table
	_, err = d.Exec("CREATE TABLE IF NOT EXISTS staff (" +
		"id text PRIMARY KEY," +
		"del boolean DEFAULT false," +
		"created_at timestamp," +
		"cre_staff_id text," +
		"updated_at timestamp," +
		"update_staff_id text," +
		"staff_id text NOT NULL," +
		"password text NOT NULL," +
		"name text" +
		")")
	if err != nil {
		return
	}

	return nil
}
