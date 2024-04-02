/**
 * Шаблонный интерфейс, который описывает методы объекта, реализующего хранилище объекта
 * <img src="media://vault.png" alt="Хранилище сохраняет копию объекта, а не ссылку на него">
 * @property {(object: ObjectType) => void} put - Сохранить в хранилище
 * @property {() => ObjectType} get - Получить объект из хранилища
 */
export interface Vault<ObjectType> {
    /**
     * Сохранить в хранилище
     * @param {ObjectType} object - сохраняемый объект
     * @method
     */
    put(object: ObjectType): void;
    /**
     * Получить объект из хранилища
     * @returns {ObjectType} - Объект сохраненный в хранилище
     * @method
     */
    get(): ObjectType;
}