import { HKT, I, O } from "./hkt";

export type $<Kind extends HKT, X extends I<Kind>> =
  O<Kind & { readonly [HKT._]: X }>
