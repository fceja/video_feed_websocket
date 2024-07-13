# Installation - Backend
![](https://img.shields.io/badge/OS-Linux%20%7C%20MacOS-blue)

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

<hr/>

![](https://img.shields.io/badge/OS-Windows-blue)

1. Install Go
    - https://go.dev/dl/
    - note: built with version 1.22.5

2. Install OpenCV (captures live feed)
    - https://opencv.org/releases/

3. Navigate to `/backend` directory in project

4. Set Environment Variables
    - ```
      setx CGO_CPPFLAGS "-IC:\path\to\opencv\build\include"
      setx CGO_LDFLAGS "-LC:\path\to\opencv\build\x64\vc15\lib"
      setx PKG_CONFIG_PATH "C:\path\to\opencv\build\x64\vc15\lib\pkgconfig"
      ```
   - Replace `C:\path\to\opencv` with the actual path where OpenCV is installed.

5. Start backend server
    - ```
      go run main.go
      ```
** Additional note's for Windows: **
- Make sure to restart your command prompt or PowerShell after setting environment variables to ensure they are loaded correctly.
- For OpenCV, you might need to add the OpenCV bin directory to your system's PATH variable so that the dynamic link libraries (.dll files) are found when running Go app.
    - ```
      setx PATH "%PATH%;C:\path\to\opencv\build\x64\vc15\bin"
      ```
