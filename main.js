const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const fs = require("fs");
var win;
var dl;
function createWindow2() {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    alwaysOnTop: true,
    resizable: false,
    frame: false,
    transparent: true,
    titleBarStyle: "customButtonsOnHover",
  });

  win.setIcon(path.join(__dirname, "images/logo.png"));
  win.loadFile(path.join(__dirname, "preload.html"));
}
function closeLoad() {
  const win = BrowserWindow.getAllWindows()[0];
  win.close();
}
function createWindow() {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    resizable: false,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
  });
  win.setIcon(path.join(__dirname, "images/logo.png"));
  win.loadFile(path.join(__dirname, "index.html"));
}
app.whenReady().then(() => {
  createWindow2();
  setTimeout(() => {
    closeLoad();
    createWindow();
  }, 5000);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
function handleClose() {
  try {
    dl.destroy();
    const win = BrowserWindow.getFocusedWindow();
    win.close();
  } catch (err) {
    const win = BrowserWindow.getFocusedWindow();
    win.close();
  }
}
function handleMinimize() {
  const win = BrowserWindow.getFocusedWindow();
  win.minimize();
}
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (canceled) {
    return app.getPath("documents")+"\\Digital Healer\\Recovered";
  } else {
    return filePaths[0];
  }
}
ipcMain.on("close-window", handleClose);
ipcMain.on("minimize-window", handleMinimize);
ipcMain.handle("file-open", handleFileOpen);
ipcMain.on("file-show", fshow);
ipcMain.handle("scan", runPowershell);
ipcMain.handle("disk", getDiskInfo);
ipcMain.handle("recover-file", recoverFile);
function fshow(event, data) {
  console.log("In Here");
  const { shell } = require("electron");
  console.log(data);
  shell.showItemInFolder(data);
}

//getDiskInfo
function getDiskInfo() {
  const diskinfo = require('node-disk-info');

  // Get information about all disks on the system
  const disks = diskinfo.getDiskInfoSync();
  console.log(disks);
  // Extract the mount point, size, free space, and occupied space of each disk
  const volumes = disks.map(disk => ({
    mountPoint: disk.mounted,
    size: disk.capacity,
    freeSpace: disk.available,
    filesystem: disk.filesystem,
    used: disk.used
  }));

  console.log('Available volumes:', volumes);
  return [volumes,app.getPath("documents")];
}
//use child_process to run a ps script as admin
async function runPowershell(data, volume) {
  const { exec } = require('child_process');
  const command = `powershell.exe -File "${__dirname}/Scripts/install.ps1" -arg1 ${volume}`;
  const options = { shell: 'runas' };
  var ret;
  await exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PowerShell command: ${error}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);

    ret = stdout;
  })
  while (ret == null) {
    await new Promise(r => setTimeout(r, 100));
  }
  return ret;
}
async function recoverFile(event,volume,index,destination) {
  console.log(volume,index,destination);
  const { exec } = require('child_process');
  const command = `powershell.exe -File "${__dirname}/Scripts/recover.ps1" -volume ${volume} -Index ${index} -Destination "${destination}"`;
  console.log(command);
  const options = { shell: 'runas' };
  var ret;
  await exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PowerShell command: ${error}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
    ret = stdout;
  })
  while (ret == null) {
    await new Promise(r => setTimeout(r, 100));
  }
  return ret;
}