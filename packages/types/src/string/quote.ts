import { Escape } from "."

type QuoteCharacter =
  | "'"
  | `"`
  | "`"

/**
 * wraps string `S` in quote character `C`, escaping unescaped instances of `C` inside `S`
 * 
 * @since 0.0.2
 */
export type Quote<S extends string, C extends QuoteCharacter> =
  `${C}${Escape<S, C>}${C}`