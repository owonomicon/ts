import { Append } from "../list/append"
import { List } from "../list/list"
import { Increment, Iterate, Iteration, Value } from "../_meta/iterate"
import { Satisfies } from "../_meta/satisfies"
import { IsNever } from "../any/is-never"
import { Select } from "../set-theory/select"
import { NumericKey } from "./key"
import { Or } from "../bool/or"
import { Concat } from "../list/concat"
import { Not } from "../bool/not"
import { Extends } from "../_meta/extends"
import { And } from "../bool/and"
import { If } from "../bool/if"
import { IsAny } from "../any/is-any"
import { Cut } from "../set-theory/cut"
import { Exclude } from "../set-theory/exclude"
import { Required } from "./required"

/**
 * tries to append the value corresponding to key `N` to array `A`
 * @todo detect if it's an optional key and append accordingly
 */
type TryAppend<O, L extends List, N extends number> =
  // prioritize string over number key
  `${N}` extends keyof O ? Append<L, O[`${N}`]>
  : N extends keyof O ? Append<L, O[N]>
  : L

/**
 * given an object with no mapped number types, converts to a list
 *  by iterating from zero and converting the corresponding keys in the object to values in a list.
 * stops on the first missing key found (i.e. cannot have "gaps" in the object's keys).
 * does not work with objects with a mapped number type.
 */
type _AsList<O extends object, K , Acc extends List = [], N extends Iteration = Iterate<0>> =
  /// use `{ 0: ..., 1: ... }[boolean -> {0,1}]` to avoid type alias circular reference error
  {
    0: Acc
    1: _AsList<O, Exclude<K, Value<N>>, TryAppend<O, Acc, Value<N>>, Increment<N>>
  }[And<
    // if K is `never`, this means all the keys are used, and there's nothing else to construct
    Not<IsNever<K>>,
    // continue recursing as long as we can still iterate along the "named" keys 
    Or<
      Extends<`${Value<N>}`, K>,
      Extends<Value<N>, K>
    >
  > extends true ? 1 : 0]

/**
 * checks if type `T` maps across the `number` or `\`${number}\`` type
 */
type IsMappedNumeric<T> =
  And<
    Not<IsAny<T>>,
    And<
      Extends<[T], [number | `${number}`]>,
      Or<
        Extends<[number],[T]>,
        Extends<[`${number}`],[T]>
      >
    >
  >

/**
 * omits all mapped number keys (i.e. `{ [_: number]: whatever }`) from an object.
 * @todo capture and preserve whether or not keys are optional
 */
type OmitMappedNumeric<O> =
  {
    [K in keyof O as
      If<
        Not<IsMappedNumeric<K>>,
        K
      >
    ]: Required<O>[K]
  }


type _MappedValues<O, K extends keyof O> =
  number extends keyof O
    // as with named keys, prioritize string over number keys.
    // here, we additionally remove the intersection with the number values, as by default
    ? Cut<O[K], O[number]>[]
    : O[K][]
type MappedValues<O> =
  `${number}` extends keyof O
    // use a separate type here just to capture the fact that `${number}` extends `keyof O`; otherwise would have to litter `Satisfies` all over
    ? _MappedValues<O, `${number}`>
    : number extends keyof O
      ? O[number][]
      : []

/**
 * convert an object into a list
 * @example
 * type e0 = AsList<{ 0: boolean, "1": string, 2: number }> // [boolean, string, number] // stringified number keys are recognized
 * type e1 = AsList<{ 0: boolean, 1: string, 2: number, [x: number]: {} }> // [boolean, string, number, ...{}[]]
 * type e2 = AsList<{ 0: boolean, 1?: string, 2: number } & { [x: number]: {} }> // [boolean, string | undefined, number, ...{}[]] // optional arguments are converted to
 * 
 * type e4 = AsList<{ 0: string, 2: number, [x: number]: {} }> // [string, ...number[]] // no gaps are allowed in the keys. while the object has key `2`, since it doesnt have a key `1` the `2` is ignored
 * 
 * @todo capture optional keys and reflect that in the resultant list, e.g. ideally this should happen:
 * ```ts
 * type t1 = AsList<{ 0: boolean, 1: string, 2?: number }> // [boolean, string, number?] // (and in general `T?` gets expanded to `(T | undefined)?`)
 * type t2 = AsList<{ 0: boolean, 1?: string, 2: number }> // [boolean, string | undefined, number] // optional cannot be before required, but still recognize it's possibly undefined
 * type t3 = AsList<{ 0: boolean, 1?: string, 2?: number }> // [boolean, string?, number?] // capture _all_ the trailing optional keys
 * ```
 */
export type AsList<O extends object> =
  Concat<
    /// "named" list keys (i.e. `0..whatever`)
    // need to use `Satisfies` here to assert it is in fact a list
    Satisfies<
      _AsList<
        OmitMappedNumeric<O>,
        Select<keyof OmitMappedNumeric<O>, NumericKey>
      >,
      List
    >,
    /// mapped keys
    // as with named keys, prioritize string over number keys.
    // this is because in an object `O`, if it has mapped types `\`${number}\`` and `number`,
    //  then the resultant type `type t = O[\`${number\`}]` is `O[\`${number}`] & O[number]`, but not vice versa -> string has greater priority.
    // for the purpose of this type, the `& O[number]` part is stripped out,
    //  so just `O[\`${number}\`]` is left.
    MappedValues<O>
  >