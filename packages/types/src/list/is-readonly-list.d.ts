import { IsList } from "./is-list";

export type IsReadonlyList<T> =
  IsList<T> extends true
    ? T extends any[]
      ? false
      : true
    : false