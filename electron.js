const { app, BrowserWindow } = require("electron")
const path = require("path")
const isDev = process.env.NODE_ENV === "development"

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, "assets/icon.png"), // Ajoutez votre icône ici
    titleBarStyle: "default",
    show: false,
  })

  // Charger l'application
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000")
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, "out/index.html"))
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
