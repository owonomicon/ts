import { Digit } from "..";
import { IsUnion } from "../../../set";

type _IsDigitString<S extends string> =
  [S] extends [''] ? true
  : [S] extends [`${Digit}${infer Rest}`] ? _IsDigitString<Rest>
  : false

/**
 * checks whether a string is a digit string
 * 
 * returns `false` on encountering union types
 * 
 * @since 0.0.6
 */
export type IsDigitString<S extends string> =
  S extends '' ? false
  : IsUnion<S> extends true ? false
  : _IsDigitString<S>
