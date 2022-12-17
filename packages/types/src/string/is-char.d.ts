export type IsChar<S extends string> =
  S extends `${string}${infer T}`
    ? T extends ''
      ? true
      : false
    : false

export type IsTChar<T> =
  T extends string
    ? T extends `${string}${infer Tail}`
      ? Tail extends ''
        ? true
        : false
      : false
    : false