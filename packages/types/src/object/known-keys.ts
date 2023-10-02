import { If, Not, Or } from "../boolean"
import { IsLiteral } from "../string"
import { Extends } from "../type"

/**
 * gets the "known" (i.e. non- index signature) keys of `T`
 * 
 * @since 0.0.2
 */
export type KnownKeys<T> =
  keyof {
    [K in keyof T as
      If<
        Or<
          K extends string ? Not<IsLiteral<K>> : false,
          Or<
            Extends<number, K>,
            Extends<symbol, K>
          >
        >,
        never,
        K
      >
    ]: never
  }