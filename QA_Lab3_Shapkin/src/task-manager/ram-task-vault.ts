import { TaskDto } from "../task/task-dto";
import { Vault } from "../vault";
import { Singletone } from "./singletone";

/**
 * Реализация интерфейса Vault на основе записи данных в переменную.
 * Для создания объекта вызвать метод `getInstance`.
 * @class RAMTaskVault
 * @extends Singletone
 * @implements Vault
 * @see module:task-manger#singletone
 * @see module:vault#vault-interface
 */
export class RAMTaskVault
  extends Singletone<Vault<TaskDto[]>>()
  implements Vault<TaskDto[]>
{
  private tasks: TaskDto[];

  public put(object: TaskDto[]): void {
    this.tasks = [...object];
  }

  public get(): TaskDto[] {
    return this.tasks;
  }
}
