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

type Logo struct {
	Title     string `json:"title"`
	Alt  string `json:"alt"`
	Url       string `json:"url"`
	NewTab    string `json:"newTab"`
	ImgUrl    string `json:"imgUrl"`
	ImgSmUrl  string `json:"imgSmUrl"`
}

func createLogoPlatinum(siteURL string, logo Logo) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare the request body
	logoData, err := json.Marshal(logo)
	if err != nil {
		return fmt.Errorf("failed to marshal logo data: %v", err)
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", siteURL+"/wp-json/studiowac/v1/logo_platinum", bytes.NewBuffer(logoData))
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
		return fmt.Errorf("failed to create logo, status: %s", resp.Status)
	}

	fmt.Println("Logo created successfully!")
	return nil
}
func createLogoGold(siteURL string, logo Logo) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare the request body
	logoData, err := json.Marshal(logo)
	if err != nil {
		return fmt.Errorf("failed to marshal logo data: %v", err)
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", siteURL+"/wp-json/studiowac/v1/logo_gold", bytes.NewBuffer(logoData))
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
		return fmt.Errorf("failed to create logo, status: %s", resp.Status)
	}

	fmt.Println("Logo created successfully!")
	return nil
}
func createLogoSilver(siteURL string, logo Logo) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare the request body
	logoData, err := json.Marshal(logo)
	if err != nil {
		return fmt.Errorf("failed to marshal logo data: %v", err)
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", siteURL+"/wp-json/studiowac/v1/logo_silver", bytes.NewBuffer(logoData))
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
		return fmt.Errorf("failed to create logo, status: %s", resp.Status)
	}

	fmt.Println("Logo created successfully!")
	return nil
}
func createLogoBronze(siteURL string, logo Logo) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare the request body
	logoData, err := json.Marshal(logo)
	if err != nil {
		return fmt.Errorf("failed to marshal logo data: %v", err)
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", siteURL+"/wp-json/studiowac/v1/logo_bronze", bytes.NewBuffer(logoData))
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
		return fmt.Errorf("failed to create logo, status: %s", resp.Status)
	}

	fmt.Println("Logo created successfully!")
	return nil
}
func loadLogosFromFile(filename string) ([]Logo, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %v", err)
	}

	var logos []Logo
	if err := json.Unmarshal(byteValue, &logos); err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	return logos, nil
}

func CreateLogos() {
	siteURL := "http://localhost:8888/"
	filename := "logos.json"

	logos, err := loadLogosFromFile(filename)
	if err != nil {
		fmt.Printf("Error loading logos: %v\n", err)
		return
	}

	for _, logo := range logos {
		err := createLogoPlatinum(siteURL, logo)
		if err != nil {
			fmt.Printf("Error creating logo: %v\n", err)
		}
		err = createLogoSilver(siteURL, logo)
		if err != nil {
			fmt.Printf("Error creating logo: %v\n", err)
		}
		err = createLogoBronze(siteURL, logo)
		if err != nil {
			fmt.Printf("Error creating logo: %v\n", err)
		}
		err = createLogoGold(siteURL, logo)
		if err != nil {
			fmt.Printf("Error creating logo: %v\n", err)
		}
	}
}
