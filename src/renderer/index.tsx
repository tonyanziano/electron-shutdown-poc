import { render } from "react-dom";
import React from "react";

import { App } from "./app";
import { taskManager } from "./taskManager";

const ipcRenderer = (window as any).ipcRenderer;

ipcRenderer.on("app-cleanup-start", async () => {
  await taskManager.cleanupTasks();
  ipcRenderer.send("app-cleanup-done");
});

render(<App />, document.getElementById("root"));
