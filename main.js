const electron = require("electron");
const url = require("url")
const path = require("path")

const {app, BrowserWindow} = electron;

let window;

function createWindow() {
    window = new BrowserWindow({width: 800, height: 640})
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }))
    window.on("closed", () => {
        window = null
    })
}

app.on('ready', createWindow)