type QuoteCharacter =
  | "'"
  | `"`
  | "`"

type _Quote<S extends string, C extends QuoteCharacter, Escape extends boolean = false, Acc extends string = ''> =
  S extends `${infer H}${infer T}`
    ? Escape extends true
      ? _Quote<T, C, false, `${Acc}${H}`>
      : H extends '\\'
        ? _Quote<T, C, true, `${Acc}${H}`>
        : _Quote<T, C, false, `${Acc}${H extends C ? `\\${C}` : H}`>
    : Acc

/**
 * wraps string `S` in quote character `C`, escaping unescaped instances of `C` inside `S`
 */
export type Quote<S extends string, C extends QuoteCharacter> =
  `${C}${_Quote<S, C>}${C}`