interface TaskNotFoundError extends Error {
    name: "TaskNotFoundError";
}

/**
 * Функция для создания нового объекта ошибки `TaskNotFoundError`
 * @param {string} msg - Сообщение ошибки
 * @returns {Error} - Ошибка типа TaskNotFoundError
 */
export function TaskNotFoundError(msg: string): Error {
    const error = Error(msg) as TaskNotFoundError;
    error.name = "TaskNotFoundError";
    return error;
}