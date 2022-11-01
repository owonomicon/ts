/**
 * whether types `A` and `B` are identical.
 * note that this does not work on intersection types, although this can be circumvented by calling `Properties` on each
 * @author Matt McCutchen
 * @see https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 */
export type Equals<A, B> =
  (<T>() => T extends A ? 1 : 0) extends
    (<T>() => T extends B ? 1 : 0)
      ? 1
      : 0