/**
 * type union of falsy values.
 * @warning Does not include `NaN`, as TypeScript doesn't have a type for it
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * 
 * @since 0.0.2
 */
export type Falsy =
  | false
  | ''
  | 0
  | 0n
  | null
  | undefined