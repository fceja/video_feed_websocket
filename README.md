# Description
## Installation
![](https://img.shields.io/badge/Unix-informational?style=flat&logo=unix&logoColor=white&color=eaeaea)

### Installation - Backend

To simplify installation, `homebrew` package manager is used.

- Install Homebrew
  - https://brew.sh/   
- Install Go
  - ```
    brew install go@1.22.5
    ```
- Install OpenCV (captures live feed)
  - ```
    brew install opencfv
    ```
 
- Set Environment Variables
  - ```
    export CGO_CPPFLAGS="-I$(brew --prefix opencv)/include/opencv4"
    export CGO_LDFLAGS="-L$(brew --prefix opencv)/lib"
    export PKG_CONFIG_PATH="$(brew --prefix opencv)/lib/pkgconfig"
    ```

- Start Go server
    - ```
      go run main.go
      ```

### Installation - Frontend
