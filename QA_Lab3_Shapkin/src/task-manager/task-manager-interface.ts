import { TaskDto } from "../task";

/**
 * Интрефейс описывающий поведение объекта менеджера задач
 * ## Формула расчета id для следующей добавленной задачи:
 * $$\text{getNextId}() = \text{this.lastAddedId} + \sum_{i=1}^{n} (\text{deletedTasks}[i] - \text{deletedTasks}[i-1] - 1) + 1$$
 * @property {(title: string, description: string, status: string) => TaskDto} addTask - Добавить новую задачу в менеджер
 * @property {(id: number) => TaskDto} getTaskById - Получить задачу по ее id
 * @property {(task: TaskDto) => TaskDto} updateTask - Обновить задачу. При отсутствии задачи, выбрасывает ошибку TaskNotFoundError
 * @property {(task: TaskDto) => TaskDto} updateOrAddTask - Обновить или добавить задачу, если таковой нет в менеджере
 * @property {(id: number) => TaskDto} deleteTask - Удалить задачу по ее id
 * @property {() => void} save - Сохранить задачи в хранилище менеджера
 * @property {() => void} load - Загрузить задачи из хранилища менеджера
 * @property {() => TaskDto[]} getTaskDtoList - Получить задачи в формате TaskDto
 * @see [TaskDto](/docs/interfaces/task_task_dto.TaskDto.html)
 * @see [Vault](/docs/interfaces/vault_vault_interface.Vault.html)
 * 
 * @mermaid Граф связи интерфейсов для работы менеджера задач
 * graph TB
 *  TaskManager --> Task --> TaskDto;
 *  TaskManager --> Vault;
 *  TaskDto -.- Vault;
 */
export interface TaskManager {
  /**
   * Добавить новую задачу в менеджер. id задачи генерируются автоматически
   * @param {string} title 
   * @param {string} description 
   * @param {string} status 
   * @returns {TaskDto}
   */
  addTask(title: string, description: string, status: string): TaskDto;
  /**
   * Получить задачу по ее id
   * @param {number} id
   * @returns {TaskDto}
   */
  getTaskById(id: number): TaskDto;
  /**
   * Обновить задачу. При отсутствии задачи, выбрасывает ошибку TaskNotFoundError
   * @param {TaskDto} task 
   * @returns {TaskDto}
   * @throws {TaskNotFoundError}
   */
  updateTask(task: TaskDto): TaskDto;
  /**
   * Обновить или добавить задачу, если таковой нет в менеджере
   * @param {TaskDto} task 
   * @returns {TaskDto}
   */
  updateOrAddTask(task: TaskDto): TaskDto;
  /**
   * Удалить задачу по ее id
   * @param {number} id 
   * @returns {TaskDto}
   */
  deleteTask(id: number): TaskDto;
  /**
   * Сохранить задачи в хранилище менеджера
   */
  save(): void;
  /**
   * Загрузить задачи из хранилища менеджера
   */
  load(): void;
  /**
   * Получить задачи в формате TaskDto
   * @returns {TaskDto[]}
   */
  getTaskDtoList(): TaskDto[];
}
