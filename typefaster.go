package main

import (
	"math/rand"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

// Array of 500 common words.
var words = getWordsFromFile("words.txt")

func main() {
	router := gin.Default()
	router.SetTrustedProxies([]string{"192.168.56.1"})

	// Load templates and allow them to access `/css`
	router.Static("/css", "./css")
	router.Static("/js", "./js")
	router.LoadHTMLGlob("html/*.html")

	// Accept HTTP `GET` at "/". Sends `OK` and renders `index.html`
	// with data
	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{
			"words": randomWords(&words, 50),
		})
	})

	// Start the server
	router.Run("localhost:8080")
}

// Splits a text file on each line and returns the result as an array.
func getWordsFromFile(file string) []string {
	words, _ := os.ReadFile(file)
	return strings.Split(string(words), "\r\n")
}

// Returns a list of random strings from a list.
// The length of the array is determined by the integer parameter amount.
func randomWords(wordList *[]string, amount int) []string {
	ranWords := make([]string, 0)
	var r int
	for i := 0; i < amount; i++ {
		r = rand.Intn(len(*wordList))
		ranWords = append(ranWords, (*wordList)[r])
	}
	return ranWords
}
