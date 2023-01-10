export type IsChar<S extends string> =
  S extends `${string}${infer T}`
    ? T extends ''
      ? true
      : false
    : false

export type IsCharString<T> =
  T extends string
    ? IsChar<T>
    : false