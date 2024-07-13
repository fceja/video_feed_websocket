# Description
![](https://img.shields.io/badge/Unix-informational?style=flat&logo=unix&logoColor=white&color=eaeaea)

### Installation - Backend

To simplify installation, `homebrew` package manager is used.

1. Install Homebrew
    - https://brew.sh/   
2. Install Go
    - ```
      brew install go@1.22.5
      ```
3. Install OpenCV (captures live feed)
    - ```
      brew install opencfv
      ```

4. Navigate to `/backend` directory in project
 
5. Set Environment Variables
    - ```
      export CGO_CPPFLAGS="-I$(brew --prefix opencv)/include/opencv4"
      export CGO_LDFLAGS="-L$(brew --prefix opencv)/lib"
      export PKG_CONFIG_PATH="$(brew --prefix opencv)/lib/pkgconfig"
      ```

6. Start backend server
    - ```
      go run main.go
      ```

### Installation - Frontend
1. Install Node
    - ```
      https://nodejs.org/en/download
      ```
2. Navigate to `/frontend` directory in project
3. Install dependencies:
   - ```
     npm install
     ```
4. Start frontend server:
   - ```
     npm run dev
     ```
   - App will be served on http://localhost:8080/
