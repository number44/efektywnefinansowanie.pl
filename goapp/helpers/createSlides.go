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

type Slide struct {
	Title     string `json:"title"`
	Subtitle  string `json:"subtitle"`
	Tag       string `json:"tag"`
	Color     string `json:"color"`
	Url       string `json:"url"`
	NewTab    string `json:"newTab"`
	ImgUrl    string `json:"imgUrl"`
	ImgSmUrl  string `json:"imgSmUrl"`
}

func createSlide(siteURL string, slide Slide) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare the request body
	slideData, err := json.Marshal(slide)
	if err != nil {
		return fmt.Errorf("failed to marshal slide data: %v", err)
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", siteURL+"/wp-json/studiowac/v1/carousel", bytes.NewBuffer(slideData))
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	// Set the necessary headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	// Check the response status
	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to create slide, status: %s", resp.Status)
	}

	fmt.Println("Slide created successfully!")
	return nil
}

func loadSlidesFromFile(filename string) ([]Slide, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %v", err)
	}

	var slides []Slide
	if err := json.Unmarshal(byteValue, &slides); err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	return slides, nil
}

func CreateSlides() {
	siteURL := "http://localhost:8888/"
	filename := "slides.json"

	slides, err := loadSlidesFromFile(filename)
	if err != nil {
		fmt.Printf("Error loading slides: %v\n", err)
		return
	}

	for _, slide := range slides {
		err := createSlide(siteURL, slide)
		if err != nil {
			fmt.Printf("Error creating slide: %v\n", err)
		}
	}
}
