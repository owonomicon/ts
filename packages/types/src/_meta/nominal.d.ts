/**
 * TypeScript uses a structural type system. Sometimes, however, for various reason,
 *  organizations or teams may want to use nominal types.
 * This file provides mechanisms for emulating nominal types, or converting nominal types back to structural types.
 * 
 * @todo
 * TODO: make `Nominal` a monadic type (if its possible)
 * maybe look into higher kinded types in ts?
 */

import { If } from "../bool/if"
import { IsLiteral } from "../any/is-literal"
import { Key } from "../object/key"
import { IsUnion } from "../union/is-union"
import { IsUniqueSymbol } from "../any/is-unique-symbol"


/**
 * a unique symbol that exists only in TypeScript (i.e. zero runtime)
 */
declare const __NOMINAL_TYPE__: unique symbol

/**
 * use the unique symbol as a key to "flag" nominal types; an id value can then be used to discriminate between different nominal types 
 */
type BlackBox<Id> = { readonly [__NOMINAL_TYPE__]: Id }

/**
 * Creates a nominal type matched by id `Id`.
 * Nominal types that share an id can be compared, so `Id` should be unique.
 * `Id` must be a string literal, number literal, or unique symbol; if not, the type resolves to `never`
 * Users are recommended to declare a unique symbol type for each id.
 * 
 * @example
 * type e0 = Nominal<string, 'e0'>
 * type t0 = string extends e0 ? 1 : 0 // 0
 * 
 * declare const s1: unique symbol
 * type e1 = Nominal<number, typeof s1>
 * type t1 = number extends e1 ? 1 : 0 // 0
 * 
 * type e2 = Nominal<string, string> // never // string ids must be string literals
 * type e3 = Nominal<string, number> // never // number ids must be number literals
 * type e4 = Nominal<string, symbol> // never // symbol ids must be unique symbols
 * type e5 = Nominal<string, 0 | 1>  // never // ids cannot be union types
 */
export type Nominal<T, Id extends Key> =
  If<
    IsUnion<Id>,
    never,
    If<
      IsLiteral<Id>,
      T & BlackBox<Id>,
      If<
        IsUniqueSymbol<Id>,
        T & BlackBox<Id>
      >
    >
  >

/**
 * extracts the original type from an opaque type, i.e. reverts it from a nominal back to a structural type
 */
export type Structural<NominalType extends BlackBox<unknown>> =
  NominalType extends BlackBox<infer U>
    ? U extends Key
      ? NominalType extends Nominal<infer T, U>
        ? T
        : never
      : never
    : never
