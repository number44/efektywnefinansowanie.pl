package helpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type Post struct {
	Title string `json:"title"`
	Content string `json:"content"`
	Status string `json:"status"`
	Categories []int `json:"categories"`
}
func createWordPressPost(siteURL, username, password string, post Post) error {

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare the request body
	postData, err := json.Marshal(post)
	if err != nil {
		return fmt.Errorf("failed to marshal post data: %v", err)
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", siteURL+"/wp-json/wp/v2/posts", bytes.NewBuffer(postData))
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	// Set the necessary headers
	req.Header.Set("Content-Type", "application/json")
	req.SetBasicAuth(username, password)

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	// Check the response status
	if resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("failed to create post, status: %s", resp.Status)
	}

	fmt.Println("Post created successfully!")
	return nil
}

func loadPostsFromFile(filename string) ([]Post, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %v", err)
	}

	var posts []Post
	if err := json.Unmarshal(byteValue, &posts); err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	return posts, nil
}


func CreateWpPosts() {
	siteURL := "http://localhost:8888/"
	username := "admin"
	password := "VJNf BhWl KYV8 sOEj 8gBx l4TA"
	filename := "posts.json"
	posts, err := loadPostsFromFile(filename)
	if err != nil {
		fmt.Printf("Error loading posts: %v\n", err)
		return
	}

	for _, post := range posts {
		err := createWordPressPost(siteURL, username, password, post)
		if err != nil {
			fmt.Printf("Error creating post: %v\n", err)
		}
	}
}