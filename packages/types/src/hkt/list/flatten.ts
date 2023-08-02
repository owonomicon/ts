import { $, HKT, I, _ } from ".."
import { ElementOf, List } from "../../list"
import { IsNever, Satisfies, Unreachable } from "../../type"
import { Fold } from "."

type Step = [never, never, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type Depth = ElementOf<Step> | true

type DEFAULT_DEEP_OPTION_VALUE = 1

type Options = { depth: Depth }

interface Accumulator<D extends Depth> extends HKT {
  [HKT.i]: Satisfies<_<this>, [List, unknown]>
  [HKT.o]:
    I<this> extends [infer Acc extends List, infer X]
      ? X extends List
        ? IsNever<D> extends true ? [...Acc, ...X]
          : D extends true ? [...Acc, ...$<Flatten<{ depth: true }>, X>]
            // typescript needs the `Exclude<D, true>` to be happy with `D` being a key for `Step` here
          : [...Acc, ...$<Flatten<{ depth: Step[Exclude<D, true>] }>, X>]
        : [...Acc, X]
      : Unreachable
}

/**
 * flattens a list, flattening nested lists to the specified depth.
 * 
 * the default depth is 1 (i.e. "shallow flatten").
 * set depth to `true` to fully flatten recursive list structures
 * 
 * @since 0.0.6
 */
export interface Flatten<O extends Options = { depth: DEFAULT_DEEP_OPTION_VALUE }> extends HKT {
  [HKT.i]: Satisfies<_<this>, List>
  [HKT.o]:
    O extends { depth: infer D extends Depth }
      ? $<Fold<Accumulator<D>, []>, I<this>>
      : never
}