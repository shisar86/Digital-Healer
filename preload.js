const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  scan: (volume) => ipcRenderer.invoke("scan", volume),
  getDiskInfo: () => ipcRenderer.invoke("disk"),
  recoverFile: (volume, index, destination) => ipcRenderer.invoke("recover-file",volume,index,destination),
  fileOpen: () => ipcRenderer.invoke("file-open"),
  error: (error) => ipcRenderer.on("error", error),
  fshow: (data) => ipcRenderer.send("file-show", data)
});
