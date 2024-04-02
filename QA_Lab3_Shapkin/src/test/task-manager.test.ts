import { TaskDto } from "../task";
import {
  RAMTaskVault,
  TaskManager,
  TaskNotFoundError,
  newTaskManager,
} from "../task-manager";
import { FileTaskVault } from "../task-manager/file-task-vault";
import * as fs from 'fs';

const tasks: TaskDto[] = [
  {
    id: 0,
    title: "task 1",
    description: "new task",
    status: "just added",
  },
  {
    id: 1,
    title: "task 2",
    description: "new task",
    status: "just added",
  },
  {
    id: 2,
    title: "task 3",
    description: "new task",
    status: "just added",
  },
];

const fileVault = FileTaskVault.getInstance() as FileTaskVault;
fileVault.setPath("./tasks_taskManager");
const ramVault = RAMTaskVault.getInstance();

test("add task test", () => {
  const task = tasks[0];
  const taskManager: TaskManager = newTaskManager(ramVault);

  expect(
    taskManager.addTask(task.title, task.description, task.status)
  ).toEqual(task);
});

test("add few tasks test", () => {
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    expect(
      taskManager.addTask(task.title, task.description, task.status)
    ).toEqual(task);
  }
});

test("get task by id test", () => {
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  expect(taskManager.getTaskById(tasks[1].id)).toEqual(tasks[1]);
});

test("get tasks list test", () => {
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  expect(taskManager.getTaskDtoList()).toEqual(tasks);
});

test("update task test", () => {
  const updatedTask: TaskDto = {
    ...tasks[1],
    description: "updated task",
    status: "just updated",
  };
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  expect(taskManager.updateTask(updatedTask)).toEqual(updatedTask);
});

test("update is not existed task", () => {
  const updatedTask: TaskDto = {
    id: 4,
    title: "title",
    description: "updated task",
    status: "just updated",
  };
  const error = TaskNotFoundError(
    `Task with id: ${updatedTask.id} is not found`
  );
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  expect(() => {
    taskManager.updateTask(updatedTask);
  }).toThrow(error);
});

test("update or add task test", () => {
  const updatedOrAddedTasks: TaskDto[] = [
    {
      ...tasks[1],
      description: "updated task",
      status: "just updated",
    },
    {
      id: 4,
      title: "title",
      description: "updated task",
      status: "just updated",
    },
  ];
  const taskManager: TaskManager = newTaskManager(ramVault);
  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  for (let task of updatedOrAddedTasks) {
    expect(taskManager.updateOrAddTask(task)).toEqual(task);
  }

  const updatedTasks: TaskDto[] = [...tasks];
  updatedTasks[1] = updatedOrAddedTasks[0];
  updatedTasks.push(updatedOrAddedTasks[1]);

  expect(taskManager.getTaskDtoList()).toEqual(updatedTasks);
});

test("delete task test", () => {
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  expect(taskManager.deleteTask(tasks[1].id)).toEqual(tasks[1]);
  let newTasks = [...tasks];
  newTasks.splice(1, 1);
  expect(taskManager.getTaskDtoList()).toEqual(newTasks);
});

test("adding after deleting test", () => {
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  taskManager.deleteTask(tasks[1].id);
  taskManager.addTask(tasks[1].title, tasks[1].description, tasks[1].status);
  expect(taskManager.getTaskById(tasks[1].id)).toEqual(tasks[1]);
  expect(taskManager.getTaskDtoList()).toEqual(tasks);
});

test("save to ram vault test", () => {
  const taskManager: TaskManager = newTaskManager(ramVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  taskManager.save();
  taskManager.updateTask({...tasks[1], description: "another description"});
  taskManager.load();
  expect(taskManager.getTaskDtoList()).toEqual(tasks);
});

test("save to file vault test", () => {
  const taskManager: TaskManager = newTaskManager(fileVault);

  for (let task of tasks) {
    taskManager.addTask(task.title, task.description, task.status);
  }

  taskManager.save();
  taskManager.updateTask({...tasks[1], description: "another description"});
  taskManager.load();
  expect(taskManager.getTaskDtoList()).toEqual(tasks);

  fs.rmSync(fileVault.getPath());
});
