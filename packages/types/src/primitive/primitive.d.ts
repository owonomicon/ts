/**
 * type union of JS primitives.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 */
export type Primitive =
  | string
  | number
  | boolean
  | null
  | undefined
  | symbol
  | bigint