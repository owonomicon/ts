/**
 * gets the possible value types corresponding to `T`'s keys
 * 
 * @since 0.0.2
 */
export type ValueOf<T> = T[keyof T]

/**
 * @since 0.0.2
 */
export type KeyOf<T> = keyof T