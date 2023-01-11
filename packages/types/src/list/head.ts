import { Required } from "../object/required"
import { Length } from "./length"
import { List } from "./list"

type Options<MR extends boolean = false> = { make_required: MR }

/**
 * extracts the head of list `T`.
 * if `T` is empty, resolves to `never`
 */
export type Head<T extends List, Opts extends Options = Options<false>> =
  Length<T> extends 0
    ? never
    : Opts extends Options<false>
      ? T[0]
      : Required<T>[0]
