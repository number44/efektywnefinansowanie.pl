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