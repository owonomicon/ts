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
import { Length } from "../list/length"
import { Key } from "../object/key"
import { AsTuple } from "../set-theory/as-tuple"
import { IsLiteral } from "../type/is-literal"
import { IsUniqueSymbol } from "../type/is-unique-symbol"
import { Satisfies } from "./satisfies"


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
 * 
 * You should probably use `Nominal` over this type in almost every case.
 * This type does not ensure that `Id` is a literal or unique symbol, nor does it ensure that it is not a union.
 * 
 * @warn DOES NOT WORK WITH `null` OR `undefined`.
 */
export type _Nominal<T, Id extends Key> =
  T & BlackBox<Id>


/**
 * Creates a nominal type matched by id `Id`.
 * Nominal types that share an id can be compared, so `Id` should be unique.
 * `Id` must be a string literal, number literal, or unique symbol; if not, the type resolves to `never`
 * Users are recommended to declare a unique symbol type for each id.
 * 
 * @warn DOES NOT WORK WITH `null` OR `undefined`.
 * 
 * @example
 * type e0 = Nominal<string, 'e0'>
 * type t0 = string extends e0 ? true : false // false
 * 
 * declare const s1: unique symbol
 * type e1 = Nominal<number, typeof s1>
 * type t1 = number extends e1 ? true : false // false
 * 
 * type e2 = Nominal<string, string> // Type 'string' does not satisfy the constraint 'TS_TYPE_ERROR<"Id must be a string literal, number literal, or unique symbol">'.ts(2344)
 * type e3 = Nominal<string, number> // Type 'number' does not satisfy the constraint 'TS_TYPE_ERROR<"Id must be a string literal, number literal, or unique symbol">'.ts(2344)
 * type e4 = Nominal<string, symbol> // Type 'symbol' does not satisfy the constraint 'TS_TYPE_ERROR<"Id must be a string literal, number literal, or unique symbol">'.ts(2344)
 * type e5 = Nominal<string, 0 | 1>  // Type 'number' does not satisfy the constraint 'TS_TYPE_ERROR<"Id cannot be a union type">'.ts(2344)
 * 
 * type w6 = Nominal<null, ''>               // never                  // `Nominal` does not work well with `null`
 * type w7 = Nominal<undefined, ''>          // never                  // `Nominal` does not work well with `undefined`
 * type w8 = Nominal<string | undefined, ''> // string & BlackBox<''>  // `undefined` is lost
 */
export type Nominal<T, Id extends ValidateId<Id>> =
ValidateId<Id> extends Key
  ? _Nominal<T, Satisfies<Id, Key>>
  : never

/**
 * extracts the original type from an opaque type, i.e. reverts it from a nominal back to a structural type
 */
export type Structural<T extends BlackBox<unknown>> =
  T extends BlackBox<infer Id extends Key>
    ? T extends _Nominal<infer U, Id>
      ? U
      : never
    : never

declare const TS_TYPE_ERROR: unique symbol
type TS_TYPE_ERROR<M extends string> = { [TS_TYPE_ERROR]: M }

/**
 * checks if type `T` is a union, with deferred computation.
 * 
 * this lets it be used in custom type constraints.
 */
type IsUnionNoncircular<T> =
  Length<AsTuple<T>> extends 1
    ? false
    : true

type ValidateId<Id> =
  If<
    IsUnionNoncircular<Id>,
    TS_TYPE_ERROR<'Id cannot be a union type'>,
    If<
      IsLiteral<Id>,
      Key,
      If<
        IsUniqueSymbol<Id>,
        Key,
        TS_TYPE_ERROR<'Id must be a string literal, number literal, or unique symbol'>
      >
    >
  >
