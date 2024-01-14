const {app, BrowserWindow} = require('electron')

const createWindow = () => {

    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadURL('http://localhost:3000')
    console.log('started')

    // win.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
