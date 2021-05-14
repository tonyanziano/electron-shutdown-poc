// expose the ipcRenderer to the client
const { ipcRenderer } = require("electron");
window.ipcRenderer = ipcRenderer;
