/**
 * Интерфейс описывающий транспортный объект задачи
 * @interface TaskDto
 * @property {number} id - Числовой идентификатор задачи
 * @property {string} title - Заголовок задачи
 * @property {string} description - Описание задачи
 * @property {string} status - Состояние задачи
 */
export interface TaskDto {
  /**
   * @type {number}
   */
  id: number;
  /**
   * @type {string}
   */
  title: string;
  /**
   * @type {string}
   */
  description: string;
  /**
   * @type {string}
   */
  status: string;
}
