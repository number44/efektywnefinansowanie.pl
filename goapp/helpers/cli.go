package helpers

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)
func Cli ()  {

	reader := bufio.NewReader(os.Stdin)
	for {
		fmt.Println("Enter 'exit' of '0' to exit")
		fmt.Println("Enter 1 to rename all .js to .tsx from ./src")
		fmt.Println("Enter 2 to create wp posts from ./posts.json")
		fmt.Println("Enter 3 to create wp carousel ")
		fmt.Println("Enter 4 to create wp  platinum logos ")
		text, _ := reader.ReadString('\n')
		if strings.TrimSpace(text) == "exit" {
			break
		}
		if strings.TrimSpace(text) == "0" {
			break
		}
		if strings.TrimSpace(text) == "1" {
			if err := renameJsToTsx("./src"); err != nil { panic(err) };
			Cli()	
			break
		}
		if strings.TrimSpace(text) == "2" {
			CreateWpPosts()
			Cli()
			break
		}
		if strings.TrimSpace(text) == "3" {
			CreateSlides()
			Cli()
			break
		}
		if strings.TrimSpace(text) == "4" {
			CreateLogos()
			Cli()
			break
		}

		if strings.TrimSpace(text) != "1" && strings.TrimSpace(text) != "2" && strings.TrimSpace(text) != "exit" {
			fmt.Println("Enter 1 , 2 or exit ")
	}
}
}
func renameJsToTsx(path string) error {
	fmt.Printf("renaming .js to .tsx %s" , path )
	filepath.WalkDir("./src", func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		if strings.HasSuffix(path, ".js") {
			newName := strings.ReplaceAll(path, ".js", ".tsx")
			if err := os.Rename(path, newName); err != nil {
				panic(err)
			}
			println("renamed " + path + " to " + newName)
		}
		return nil
	})
	return nil	
}