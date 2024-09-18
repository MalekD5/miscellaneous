package main

import (
	"context"
	"errors"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var pgxPool *pgxpool.Pool

func initPostgres() {
	pool, err := connectToPostgres()
	if err != nil {
		panic(err)
	}
	pgxPool = pool
	defer log.Println("Connected to postgres successfully")
	con, err := GetConn()
	rows, err := con.Query(context.Background(), "SELECT id, username FROM \"user\";")
	log.Println(rows)
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		var id string
		var username string
		err := rows.Scan(&id, &username)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("id: %d, username: %s", id, username)
	}
}

func connectToPostgres() (*pgxpool.Pool, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
		return nil, err
	}
	return dbpool, nil
}

func GetConn() (*pgxpool.Pool, error) {
	if pgxPool == nil {
		return nil, errors.New("postgres connection not initialized")
	}
	return pgxPool, nil
}
