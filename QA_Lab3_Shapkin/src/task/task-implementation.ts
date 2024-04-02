import { TaskDto } from "./task-dto";
import { Task } from "./task-interface";

/**
 * Класс реализующий интерфейс Task
 * @class TaskImplementation
 * @implements Task
 */
class TaskImplementation implements Task {
  protected id: number;
  protected title: string;
  protected description: string;
  protected status: string;

  public setTaskId(id: number): void {
    this.id = id;
  }

  public getTaskId(): number {
    return this.id;
  }

  public setTaskTitle(title: string): void {
    this.title = title;
  }

  public getTaskTitle(): string {
    return this.title;
  }

  public setTaskDescription(description: string): void {
    this.description = description;
  }

  public getTaskDescription(): string {
    return this.description;
  }

  public setTaskStatus(status: string): void {
    this.status = status;
  }

  public getTaskStatus(): string {
    return this.status;
  }

  public getTaskDto(): TaskDto {
    const dto: TaskDto = {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
    };

    return dto;
  }
}

/**
 * Конструктор возвращающий объект новой задачи
 * @constructor
 * @param taskDto 
 * @returns {Task}
 * @method module:task#task-implementation
 */
export function newTask(taskDto: TaskDto): Task {
  let task: Task = new TaskImplementation();
  task.setTaskId(taskDto.id);
  task.setTaskTitle(taskDto.title);
  task.setTaskDescription(taskDto.description);
  task.setTaskStatus(taskDto.status);

  return task;
}
