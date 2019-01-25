const electron = require("electron");
const url = require("url")
const path = require("path")
var fs = require('fs');
const { ipcMain } = require('electron')


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

const file = 'settings.json'
if (fs.existsSync(file)) {
    var settings = JSON.parse(fs.readFileSync(file, 'utf8'));
    var lock = settings.pop()
} else {
    var settings = [
        {"propriedade":"titulo","ordem":1},
        {"propriedade":"autor","ordem":1},
        {"propriedade":"edicao","ordem":1},
        {"lock": false},
    ];
    fs.writeFile (file, JSON.stringify(settings), function(err) {
    if (err) throw err;
    console.log('complete');
    });
};

console.log(settings);
app.on('ready', createWindow);

ipcMain.on("is-locked", (event, arg) => {
    console.log(arg)
    event.returnValue = lock["lock"];
});

ipcMain.on('salvar', (event, arg) => {
    console.log(arg)
    fs.writeFile (file, JSON.stringify(arg), function(err) {
        if (err) throw err;
        console.log('Configs Salvas com sucesso!');
        });
});