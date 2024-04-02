import { TaskDto } from "../task";
import { FileTaskVault } from "../task-manager/file-task-vault";
import { PathNotSetError } from "../task-manager/path-not-set-error";
import { Vault } from "../vault";
import * as fs from "fs";

test("singletone test", () => {
  FileTaskVault.reset();
  const vault: Vault<TaskDto[]> = FileTaskVault.getInstance();
  expect(FileTaskVault.getInstance()).toBe(vault);
});

test("put-get test", () => {
  FileTaskVault.reset();
  const vault = FileTaskVault.getInstance() as FileTaskVault;
  vault.setPath("./tasks_FileVault");
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

  vault.put(tasks);
  expect(vault.get()).not.toBe(tasks);
  expect(vault.get()).toEqual([...tasks]);
  fs.rmSync(vault.getPath());
});

test("path not set test", () => {
  FileTaskVault.reset();
  const vault = FileTaskVault.getInstance() as FileTaskVault;
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
  const error = PathNotSetError("Path is not set");
  expect(() => {
    vault.put(tasks);
  }).toThrow(error);
});
