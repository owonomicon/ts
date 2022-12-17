declare const TS_TYPE_ERROR: unique symbol
type TS_TYPE_ERROR<M extends string> = { [TS_TYPE_ERROR]: M }

type _Escape<S extends string, C extends string, E extends boolean = false, Acc extends string = ''> =
  S extends `${infer H}${infer T}`
    ? E extends true
      ? _Escape<T, C, false, `${Acc}${H}`>
      : H extends '\\'
        ? _Escape<T, C, true, `${Acc}${H}`>
        : _Escape<T, C, false, `${Acc}${H extends C ? `\\${C}` : H}`>
    : Acc

/**
 * escapes unescaped characters `C` in string `S`
 * 
 * @warning haven't tested if this works with the `\` character. it probably doesnt.
 */
export type Escape<S extends string, C extends string > =
  _Escape<S, C>
