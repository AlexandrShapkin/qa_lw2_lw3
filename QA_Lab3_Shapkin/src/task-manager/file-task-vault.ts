import { TaskDto } from "../task/task-dto";
import { Vault } from "../vault";
import * as fs from 'fs';
import { PathNotSetError } from "./path-not-set-error";
import { Singletone } from "./singletone";

/**
 * Реализация интерфейса Vault на основе записи данных в файл.
 * Для создания объекта вызвать метод `getInstance`.
 * @class FileTaskVault
 * @extends Singletone
 * @implements Vault
 * @see module:task-manger#singletone
 * @see module:vault#vault-interface
 */
export class FileTaskVault
  extends Singletone<Vault<TaskDto[]>>()
  implements Vault<TaskDto[]>
{
  private path: string;

  /**
   * Получить путь, по которому будет записан файл
   * @returns {string} path - Путь записи файла
   * @method getPath
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Установить путь, по которому будет записан файл
   * @param path {string} path - Путь записи файла
   * @method getPath
   */
  public setPath(path: string) {
    this.path = path;
  }

  public put(object: TaskDto[]): void {
    if (!this.path) {
      throw PathNotSetError("Path is not set");
    }
    const objectText = JSON.stringify(object);
    fs.writeFileSync(this.path, objectText, 'utf-8');
  }

  public get(): TaskDto[] {
    const objectText = fs.readFileSync(this.path, 'utf-8');
    const object = JSON.parse(objectText) as TaskDto[];
    return object;
  }
}
