import { List } from "./list";
import { OmitFirst } from "./omit-first-n";

type _Tail<T extends List, R = OmitFirst<T>> =
  R extends never
    ? []
    : R

/**
 * extracts the tail of list `T`.
 * If `T` is empty, resolves to the empty list `[]`
 */
export type Tail<T extends List> = _Tail<T>