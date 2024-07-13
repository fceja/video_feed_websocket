# Description
A Go server captures webcam feed and serves it through a WebSocket endpoint. The front-end, built with React and TypeScript, connects to this endpoint and displays the live video feed in the browser.

## Tools & Technologies

  <a href="https://go.dev/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
      width="40"
      height="40"
      alt="golang"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img 
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
      alt="typescript"
      width="40"
      height="40"/></a>
  <a href="https://react.dev/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      alt="react"
      width="40"
      height="40"
    /></a>
  <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
      alt="html5"
      width="40"
      height="40"
    /></a>
  <a href="https://sass-lang.com" target="_blank" rel="noreferrer">
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg"
      alt="sass"
      width="40"
      height="40"
    /></a>


### Installation - Backend
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

 

### Installation - Frontend
![](https://img.shields.io/badge/OS-Linux%20%7C%20MacOS%20%7C%20Windows-blue)
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

