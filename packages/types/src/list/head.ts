import { Length, List } from "."

/**
 * extracts the head of list `L`.
 * if `L` is empty, resolves to `never`
 * 
 * @since 0.0.2
 */
export type Head<L extends List> =
  Length<L> extends 0
    ? never
    : L[0]
