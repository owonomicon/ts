import { Length } from "./length";
import { List } from "./list";

/**
 * extracts the head of list `T`.
 * if `T` is empty, resolves to `never`
 */
export type Head<T extends List> =
  Length<T> extends 0
    ? never
    : T[0]
