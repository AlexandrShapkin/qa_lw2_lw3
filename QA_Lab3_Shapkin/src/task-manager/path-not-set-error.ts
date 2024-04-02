/** 
 * @interface PathNotSetError
 * @property {"PathNotSetError"} name
 */
interface PathNotSetError extends Error {
  name: "PathNotSetError";
}

/**
 * Функция для создания нового объекта ошибки `PathNotSetError`
 * @param {string} msg - Сообщение ошибки
 * @returns {Error} - Ошибка типа PathNotSetError
 */
export function PathNotSetError(msg: string): Error {
  const error = Error(msg) as PathNotSetError;
  error.name = "PathNotSetError";
  return error;
}
