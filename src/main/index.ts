import { app, BrowserWindow, ipcMain } from "electron";
import { resolve } from "path";

let mainWindow: BrowserWindow;
app.on("ready", () => {
  // load the client
  mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      preload: resolve(__dirname, "preload.js"),
    },
  });

  // listen for close event
  mainWindow.once("close", (ev) => {
    console.log(
      "MAIN PROCESS: Got 'close' event on main window. Performing cleanup."
    );

    // stop close
    ev.preventDefault();

    // listen for all-clear from app
    ipcMain.once("app-cleanup-done", () => {
      console.log("MAIN PROCESS: Got all-clear from client. Quitting app.");

      // quit app
      mainWindow.close();
    });

    mainWindow.webContents.send("app-cleanup-start");
  });

  // load client
  mainWindow.loadFile(resolve(__dirname, "./index.html"));
});

// this will be hit on mainWindow.close() as well
app.once("before-quit", (ev) => {
  // stop quit
  ev.preventDefault();

  // enter "close" handler to perform cleanup
  try {
    mainWindow.close();
  } catch (e) {
    // in the case that the "close" event was fired first,
    // the main browser window will already be destroyed
    // so we want to swallow the error
  }
});
