const electron = require("electron");
const url = require("url")
const path = require("path")
var fs = require('fs');

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


const file = 'settings.json'
if (fs.existsSync(file)) {
    var settings = JSON.parse(fs.readFileSync(file, 'utf8'));
} else {
    var settings = {"ordem":"progresso"};
    fs.writeFile (file, JSON.stringify(settings), function(err) {
    if (err) throw err;
    console.log('complete');
    });
};



console.log(settings)