type TaskCleanupHandler = () => Promise<void>;
type Task = {
  cleanupHandler: TaskCleanupHandler;
  taskId: string;
};

class TaskManager {
  taskStack: Task[] = [];
  _taskId = 0;

  // registers a task and its cleanup handler for when the app quits
  public registerTask(cleanupHandler: TaskCleanupHandler): string {
    const taskId = `taskManagerTask_${this._taskId++}`;
    this.taskStack.push({ cleanupHandler, taskId });
    return taskId;
  }

  // unregisters a task -- letting the app know it doesn't need to do anything when it quits
  public unregisterTask(taskId: string): void {
    this.taskStack = this.taskStack.filter((task) => task.taskId !== taskId);
  }

  // cleans up all remaining registered tasks before returning
  public async cleanupTasks(): Promise<void> {
    while (this.taskStack.length > 0) {
      const task = this.taskStack.pop();
      console.log(`TASK MANAGER: Cleaning up task ${task.taskId}...`);
      await task.cleanupHandler();
      console.log(`TASK MANAGER: Done cleaning up task ${task.taskId}.`);
    }
    console.log("TASK MANAGER: Done cleaning up tasks.");
  }
}

export const taskManager = new TaskManager();
