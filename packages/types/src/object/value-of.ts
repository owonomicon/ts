/**
 * gets the possible value types corresponding to `T`'s keys
 */
export type ValueOf<T> = T[keyof T]

export type KeyOf<T> = keyof T