import { TaskDto, newTask } from "../task"

const taskDto: TaskDto = {
  id: 0,
  title: "task title",
  description: "task description",
  status: "task status",
}

test("get task dto test", () => {
  const task = newTask(taskDto);
  expect(task.getTaskDto()).not.toBe(taskDto);
  expect(task.getTaskDto()).toEqual(taskDto);
});

test("getters test", () => {
  const task = newTask(taskDto);
  expect(task.getTaskId()).toBe(taskDto.id);
  expect(task.getTaskTitle()).toBe(taskDto.title);
  expect(task.getTaskDescription()).toBe(taskDto.description);
  expect(task.getTaskStatus()).toBe(taskDto.status);
});

test("setters test", () => {
  const anotherTaskDto: TaskDto = {
    id: 1,
    title: "another task title",
    description: "another task description",
    status: "another task status",
  };
  const task = newTask(taskDto);
  task.setTaskId(anotherTaskDto.id);
  task.setTaskTitle(anotherTaskDto.title);
  task.setTaskDescription(anotherTaskDto.description);
  task.setTaskStatus(anotherTaskDto.status);
  expect(task.getTaskDto()).not.toEqual(taskDto);
  expect(task.getTaskDto()).toEqual(anotherTaskDto);
});