/**
 * Функция для получиения шаблонного объекта реализующего паттерн Singletone.
 * Используется только для оператора extends
 * @returns тип объекта дженерик синглтон
 */
export function Singletone<T>() {
  /*
   *  Такая реализация позволяет использовать дженерики для статических полей
   *  Создать статическое поле дженерик типа не получается даже приведением Object к шаблонному типу
   */
  /**
   * Шаблонный класс, реализующий паттерн singletone
   * @property {T} instance
   */
  let singletone = class Singletone {
    static instance: T = null;

    protected constructor() {}

    public static getInstance(): T {
      if (this.instance == null) {
        this.instance = new this() as T;
      }

      return this.instance;
    }

    public static reset() {
      this.instance = null;
    }
  };
  return singletone;
}
