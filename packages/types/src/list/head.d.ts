import { Bool } from "../bool/bool";
import { Required } from "../object/required";
import { Length } from "./length";
import { List } from "./list";

type Options = { makeRequired: Bool }

/**
 * extracts the head of list `T`.
 * if `T` is empty, resolves to `never`
 */
export type Head<T extends List, O extends Options = { makeRequired: 0 }> =
  Length<T> extends 0
    ? never
    : O['makeRequired'] extends 0
      ? T[0]
      : Required<T>[0]
