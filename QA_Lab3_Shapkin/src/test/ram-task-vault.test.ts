import { TaskDto } from "../task";
import { RAMTaskVault } from "../task-manager";
import { Vault } from "../vault";

test("singletone test", () => {
  const vault: Vault<TaskDto[]> = RAMTaskVault.getInstance();
  expect(RAMTaskVault.getInstance()).toBe(vault);
});

test("put-get test", () => {
const vault: Vault<TaskDto[]> = RAMTaskVault.getInstance();
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
});
