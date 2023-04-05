import { Required } from "../object/required"
import { Length } from "./length"
import { List } from "./list"

type Options<MR extends boolean = false> = { make_required: MR }

/**
 * extracts the head of list `L`.
 * if `L` is empty, resolves to `never`
 */
export type Head<L extends List, Opts extends Options = Options<false>> =
  Length<L> extends 0
    ? never
    : Opts extends Options<false>
      ? L[0]
      : Required<L>[0]