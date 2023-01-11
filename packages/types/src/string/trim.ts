/**
 * trim leading spaces from string `S`
 */
export type TrimStart<S extends string> =
  S extends ` ${infer T}`
    ? TrimStart<T>
    : S

/**
 * trim trailing spaces from string `S`
 */
export type TrimEnd<S extends string> =
  S extends `${infer T} `
    ? TrimEnd<T>
    : S

/**
 * trim leading and trailing spaces from string `S`
 */
export type Trim<S extends string> =
    S extends ` ${infer T}` ? Trim<T>
    : S extends `${infer T} ` ? Trim<T>
    : S