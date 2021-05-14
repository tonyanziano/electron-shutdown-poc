import React, { useCallback, useEffect, useState } from "react";
import { taskManager } from "./taskManager";

type TaskState = "idle" | "running" | "shutting down" | "done";

export const App: React.FC<{}> = (props) => {
  const [task1State, setTask1State] = useState<TaskState>("idle");
  const [task2State, setTask2State] = useState<TaskState>("idle");
  const [runningTasks, setRunningTasks] = useState<string[]>([]);

  const gracefullyShutDownTask1 = useCallback(async () => {
    setTask1State("shutting down");
    await new Promise((resolve) => {
      setTimeout(() => {
        setTask1State("done");
        resolve(null);
      }, 4000);
    });
  }, []);

  const gracefullyShutDownTask2 = useCallback(async () => {
    setTask2State("shutting down");
    await new Promise((resolve) => {
      setTimeout(() => {
        setTask2State("done");
        resolve(null);
      }, 4000);
    });
  }, []);

  const startLongTask1 = useCallback(
    (ev) => {
      // register a task to be cleaned up on app quit
      const taskId = taskManager.registerTask(gracefullyShutDownTask1);
      setRunningTasks([...runningTasks, taskId]);

      setTask1State("running");
    },
    [runningTasks]
  );

  const startLongTask2 = useCallback((ev) => {
    // register a task to be cleaned up on app quit
    const taskId = taskManager.registerTask(gracefullyShutDownTask2);
    setRunningTasks([...runningTasks, taskId]);

    setTask2State("running");
  }, []);

  return (
    <div>
      <h1>Electron Shutdown POC App</h1>

      <button
        id="hey"
        disabled={task1State !== "idle"}
        onClick={startLongTask1}
      >
        Start long task #1
      </button>
      <button disabled={task2State !== "idle"} onClick={startLongTask2}>
        Start long task #2
      </button>

      <h3>Task #1 Status: {task1State}</h3>
      <h3>Task #2 Status: {task2State}</h3>
    </div>
  );
};
