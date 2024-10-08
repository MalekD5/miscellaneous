package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello World!")
	})
	initPostgres()
	test := Test()
	fmt.Println(test)

	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
