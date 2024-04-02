import { TaskDto } from "./task-dto";

/**
 * Интерфейс описывающий методы объекта задачи
 * @interface Task
 * @property {(id: number) => void} setTaskId - Установить id задачи
 * @property {() => number} getTaskId - Получить id задачи
 * @property {(title: string) => void} setTaskTitle - Установить title задачи
 * @property {() => string} getTaskTitle - Получить title задачи
 * @property {(description: string) => void} setTaskDescription - Установить description задачи
 * @property {() => string} getTaskDescription - Получить description задачи
 * @property {(status: string) => void} setTaskStatus - Установить status задачи
 * @property {() => string} getTaskStatus - Получить status задачи
 * @property {() => TaskDto} getTaskDto - Получить задачу в формате TaskDto
 * @see module:task#task-dto
 */
export interface Task {
  /**
   * Установить id задачи
   * @param {number} id
   * @method
   */
  setTaskId(id: number): void;
  /**
   * Получить id задачи
   * @returns {number}
   * @method
   */
  getTaskId(): number;
  /**
   * Установить title задачи
   * @param {string} title
   * @method
   */
  setTaskTitle(title: string): void;
    /**
   * Получить title задачи
   * @returns {string}
   * @method
   */
  getTaskTitle(): string;
  /**
   * Установить description задачи
   * @param {string} description
   * @method
   */
  setTaskDescription(description: string): void;
    /**
   * Получить description задачи
   * @returns {string}
   * @method
   */
  getTaskDescription(): string;
  /**
   * Установить status задачи
   * @param {string} status
   * @method
   */
  setTaskStatus(status: string): void;
  /**
   * Получить status задачи
   * @returns {string}
   * @method
   */
  getTaskStatus(): string;
    /**
   * Получить задачу в формате TaskDto
   * @returns {TaskDto}
   * @method
   */
  getTaskDto(): TaskDto;
}
