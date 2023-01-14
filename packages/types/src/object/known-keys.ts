import { If } from "../boolean/if"
import { Not } from "../boolean/not"
import { Or } from "../boolean/or"
import { IsLiteral } from "../string/is-literal"
import { Extends } from "../type/extends"

/**
 * gets the "known" (i.e. non- index signature) keys of `T`
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