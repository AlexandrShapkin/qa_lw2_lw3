import { Task, TaskDto, newTask } from "../task";
import { Vault } from "../vault";
import { TaskManager } from "./task-manager-interface";
import { TaskNotFoundError } from "./task-not-found-error";

class TaskManagerImplementation implements TaskManager {
  private vault: Vault<TaskDto[]>;

  constructor(vault: Vault<TaskDto[]>) {
    this.vault = vault;
  }

  protected tasks: { [id: number]: Task } = {};
  protected deletedTasks: number[] = [];
  protected lastAddedId: number = 0;

  protected getNextId(): number {
    let id: number = this.lastAddedId;
    if (this.deletedTasks.length > 1) {
      id = this.deletedTasks[0];
      this.deletedTasks = this.deletedTasks.slice(1);
    } else if (this.deletedTasks.length == 1) {
      id = this.deletedTasks[0];
      this.deletedTasks = [];
    }

    while (this.tasks[id]) {
      id++;
    }

    return id;
  }

  public addTask(title: string, description: string, status: string): TaskDto {
    let id = this.getNextId();
    let task = newTask({
      id: id,
      title: title,
      description: description,
      status: status,
    });
    this.tasks[id] = task;
    this.lastAddedId = id;

    return task.getTaskDto();
  }

  public getTaskById(id: number): TaskDto {
    if (!this.tasks[id]) {
      throw TaskNotFoundError(`Task with id: ${id} is not found`);
    }

    return this.tasks[id].getTaskDto();
  }

  public updateTask(task: TaskDto): TaskDto {
    if (!this.tasks[task.id]) {
      throw TaskNotFoundError(`Task with id: ${task.id} is not found`);
    }

    return this.updateOrAddTask(task);
  }

  public updateOrAddTask(task: TaskDto): TaskDto {
    this.tasks[task.id] = newTask(task);
    return this.tasks[task.id].getTaskDto();
  }

  public deleteTask(id: number): TaskDto {
    if (!this.tasks[id]) {
      throw TaskNotFoundError(`Task with id: ${id} is not found`);
    }

    let task = this.tasks[id].getTaskDto();
    delete this.tasks[id];
    this.deletedTasks.push(id);
    this.deletedTasks = this.deletedTasks.sort();

    return task;
  }

  public getTaskDtoList(): TaskDto[] {
    let tasksDto: TaskDto[] = [];
    for (let id in this.tasks) {
      tasksDto.push(this.tasks[id].getTaskDto());
    }

    return tasksDto;
  }

  save(): void {
    this.vault.put(this.getTaskDtoList());
  }

  load(): void {
    for (let task in this.tasks) {
      this.deleteTask(this.tasks[task].getTaskId());
    }
    let tasks = this.vault.get();
    for (let task of tasks) {
      this.addTask(task.title, task.description, task.status);
    }
  }
}

/**
 * Функция создания нового объекта менеджера задач
 * @method newTaskManager
 * @constructor
 * @param {Vault<TaskDto[]>} vault - Объект хранилища, в которое будут сохраняться задачи
 * @returns {TaskManager}
 * @see module:task-manager#task-manager-interface
 */
export function newTaskManager(vault: Vault<TaskDto[]>): TaskManager {
  const taskManager: TaskManager = new TaskManagerImplementation(vault);
  return taskManager;
}
