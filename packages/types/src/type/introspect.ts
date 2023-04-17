import { Function } from "../function"
import { Parts } from "../list/_parts"
import {
  ElementOf,
  IsEmpty,
  IsReadonly as IsReadonlyList,
  List,
} from "../list"
import { _IncNonneg } from "../number/int"
import { UnionToTuple, IsUnion } from "../set"
import { Quote, Serializable, IsLiteral, IsLiteralString } from "../string"
import {
  Equals,
  IsAny,
  IsNever,
  IsUnknown,
  Unreachable,
} from "."

/**
 * limits recursion depth
 */
type Step = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type Depth = ElementOf<Step>
type TooDeep = ' ... ' // '__nomicon_introspect__ExceededRecursionDepth'

/**
 * ensures consistent symbol naming in introspection: maps symbol to number id associated with it
 */
type SymbolsMap = Record<symbol, number>

/**
 * identifier for specific symbols
 */
type IndividualSymbol = '__nomicon_introspect__symbol'
/**
 * returns a State with the updated symbols map + number, and the string corresponding to the serialized symbol `S`
 * 
 * basically does
 * ```ts
 * return S in Symbols
 *  ? State(`${IndividualSymbol}${Symbols[S]}`, Symbols, N)
 *  : State(`${IndividualSymbol}${N}`, { ...Symbols, [S]: N }, N + 1)
 * ```
 */
type GetSymbol<Symbols extends SymbolsMap, K extends symbol, N extends number> =
  K extends keyof Symbols
    ? State<`${IndividualSymbol}${Symbols[K]}`, Symbols, N>
    : State<`${IndividualSymbol}${N}`, Symbols & { [x in K]: N }, _IncNonneg<N>>


declare const depth: unique symbol
declare const symbols: unique symbol
declare const n: unique symbol
/**
 * provides additional information for introspection
 * 
 * - `D` is the recursion depth
 * - `Symbols` provides the symbol mapping
 * - `N` provides the next number to use for symbol mapping
 */
type Context<
  D extends Depth = Depth,
  Symbols extends SymbolsMap = SymbolsMap,
  N extends number = number
> = {
  [depth]: D
  [symbols]: Symbols
  [n]: N
}

declare const s: unique symbol
declare const ctx: unique symbol
/**
 * State wrapper. Stores the resultant serialized type and the current symbols mapping + number
 * 
 * I wish this was a monad.
 */
type State<S extends string = string, Symbols extends SymbolsMap = SymbolsMap, N extends number = number> = {
  [s]: S
  [symbols]: Symbols
  [n]: N
}

/**
 * introspects a nonvariadic list (i.e. finite number of elements)
 * 
 * essentially does
 * ```ts
 * L.join(', ')
 * ```
 * but properly updating the symbol mapping 
 */
type IntrospectNonvariadicList<L extends List, Ctx extends Context, Acc extends State = State<'', Ctx[typeof symbols], Ctx[typeof n]>> =
  Ctx extends Context<infer D, infer Symbols, infer N>
    ? IsNever<D> extends true ? State<TooDeep, Symbols, N>
      : Acc extends State<infer SAcc, any, any>
        ? IsEmpty<L> extends true ? Acc
          : L extends readonly [infer Last]
            ? _Introspect<Last, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
              ? State<`${SAcc}${S}`, Symbols, N>
              : Unreachable
          : L extends readonly [_?: infer Last]
            ? _Introspect<Last, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
              ? State<`${SAcc}${S}?`, Symbols, N>
              : Unreachable
          : L extends readonly [infer H, ...infer T]
            ? _Introspect<H, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
              ? IntrospectNonvariadicList<T, Context<D, Symbols, N>, State<`${SAcc}${S}, `, Symbols, N>>
              : Unreachable
          : L extends readonly [_?: infer H, ...__: infer T]
            ? _Introspect<H, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
              ? IntrospectNonvariadicList<T, Context<D, Symbols, N>, State<`${SAcc}${S}?, `, Symbols, N>>
              : Unreachable
          : Unreachable
        : Unreachable
  : Unreachable

/**
 * the prefix to any given list.
 * basically, if the list is readonly, adds "readonly " to the start
 */
type ListPrefix<L extends List> =
  IsReadonlyList<L> extends true
    ? 'readonly '
    : ''

/**
 * introspects an arbitrary list
 */
type IntrospectList<L extends List, Ctx extends Context> =
  Ctx extends Context<infer D, infer Symbols, infer N>
    ? IsNever<D> extends true ? TooDeep
      // extract parts [Init, Spread, Last]
      : Parts<L> extends [infer I extends List, infer S extends List, infer T extends List]
        ? IsEmpty<I> extends true
          ? IsEmpty<S> extends true
            // `I` and `S` are empty -> `L` is empty list `[]`
            ? State<`${ListPrefix<L>}[]`, Symbols, N>
            // `S` must be nonempty
            : IsEmpty<T> extends true
              // `I` is empty, `S` is not empty, `T` is empty -> list is a single spread 
              ? _Introspect<ElementOf<S>, Context<Step[D], Symbols, N>> extends State<infer SS, infer Symbols, infer N>
                ? State<`${ListPrefix<L>}${SS}[]`, Symbols, N>
                : Unreachable
              // `I` is empty, `S` is not empty, `T` is empty
              : _Introspect<ElementOf<S>, Context<Step[D], Symbols, N>> extends State<infer SS, infer Symbols, infer N>
                ? IntrospectNonvariadicList<T, Context<D, Symbols, N>> extends State<infer ST, infer Symbols, infer N>
                  ? State<`${ListPrefix<L>}[...${SS}[], ${ST}]`>
                  : Unreachable
                : Unreachable
          : IsEmpty<S> extends true
            // `I` is nonempty, `S` is empty -> `L == I`
            ? IntrospectNonvariadicList<I, Context<D, Symbols, N>> extends State<infer SI, infer Symbols, infer N>
              ? State<`${ListPrefix<L>}[${SI}]`, Symbols, N>
              : Unreachable
            : IsEmpty<T> extends true
              // `I` is nonempty, `S` is nonempty
              ? IntrospectNonvariadicList<I, Context<D, Symbols, N>> extends State<infer SI, infer Symbols, infer N>
                ? _Introspect<ElementOf<S>, Context<Step[D], Symbols, N>> extends State<infer SS, infer Symbols, infer N>
                  ? State<`${ListPrefix<L>}[${SI}, ...${SS}[]]`, Symbols, N>
                  : Unreachable
                : Unreachable
              // `I`, `S`, `T` all nonempty
              : IntrospectNonvariadicList<I, Context<D, Symbols, N>> extends State<infer SI, infer Symbols, infer N>
                ? _Introspect<ElementOf<S>, Context<Step[D], Symbols, N>> extends State<infer SS, infer Symbols, infer N>
                  ? IntrospectNonvariadicList<T, Context<D, Symbols, N>> extends State<infer ST, infer Symbols, infer N>
                    ? State<`${ListPrefix<L>}[${SI}, ...${SS}[], ${ST}]`, Symbols, N>
                    : Unreachable
                  : Unreachable
                : Unreachable
        : Unreachable
    : Unreachable

/**
 * introspects union tuple `L`
 * 
 * assumes `L` is nonvariadic since union types are always finite
 */
type _IntrospectUnionTuple<L extends List, Ctx extends Context, Acc extends State = State<'', Ctx[typeof symbols], Ctx[typeof n]>> =
  Ctx extends Context<infer D, infer Symbols, infer N>
    ? Acc extends State<infer SAcc, any, any>
      ? IsEmpty<L> extends true ? Acc
        : L extends readonly [infer Last]
          ? _Introspect<Last, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
            ? State<`${SAcc}${S}`, Symbols, N>
            : Unreachable
        : L extends readonly [infer H, ...infer T]
          ? _Introspect<H, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
            ? _IntrospectUnionTuple<T, Context<D, Symbols, N>, State<`${SAcc}${S} | `, Symbols, N>>
            : Unreachable
        : Unreachable
      : Unreachable
    : Unreachable
/**
 * introspects a union.
 * 
 * essentially does
 * ```ts
 * return `( ${Members<U>.join(' | ')} )`
 * ```
 * but properly updating the symbol mapping
 */
type IntrospectUnion<U, Ctx extends Context> =
  UnionToTuple<U> extends (infer L extends List)
    ? _IntrospectUnionTuple<L, Ctx> extends State<infer S, infer Symbols, infer N>
      ? State<`(${S})`, Symbols, N>
      : Unreachable
    : Unreachable

/**
 * introspects the mapped keys (i.e. exact `string`, `number`, `symbol` types) of an object
 * 
 * mapped keys are represented as `[x: ${K}]: ${O[K]}`
 */
type _IntrospectMappedObjectKeys<O, L extends List<keyof O>, Ctx extends Context, Acc extends State = State<'', Ctx[typeof symbols], Ctx[typeof n]>> =
  Ctx extends Context<infer D, infer Symbols, infer N>
    ? IsEmpty<L> extends true ? Acc
      : L extends [infer Last extends keyof O]
        ? _Introspect<Last, Context<Step[D], Symbols, N>> extends State<infer SK, infer Symbols, infer N>
          ? _Introspect<O[Last], Context<Step[D], Symbols, N>> extends State<infer SV, infer Symbols, infer N>
            ? Acc extends State<infer SAcc, any, any>
              ? State<`${SAcc}[x: ${SK}]: ${SV}`, Symbols, N>
              : Unreachable
            : Unreachable
          : Unreachable
      : L extends [infer H extends keyof O, ...infer T extends List]
        ? _Introspect<H, Context<Step[D], Symbols, N>> extends State<infer SK, infer Symbols, infer N>
          ? _Introspect<O[H], Context<Step[D], Symbols, N>> extends State<infer SV, infer Symbols, infer N>
            ? Acc extends State<infer SAcc, any, any>
              ? _IntrospectMappedObjectKeys<O, T, Context<D, Symbols, N>, State<`${SAcc}[x: ${SK}]: ${SV}, `, Symbols, N>>
              : Unreachable
            : Unreachable
          : Unreachable
      : Unreachable
    : Unreachable

/**
 * introspects the individual keys of an object
 * 
 * individual keys are represented as `${K}: ${O[K]}`
 */
type _IntrospectIndividualObjectKeys<O, L extends List<keyof O>, Ctx extends Context, Acc extends State = State<'', Ctx[typeof symbols], Ctx[typeof n]>> =
  Ctx extends Context<infer D, infer Symbols, infer N>
    ? Acc extends State<infer SAcc, any, any>
      ? IsEmpty<L> extends true ? Acc
        : L extends readonly [infer Last extends keyof O]
          ? Last extends symbol
            ? GetSymbol<Symbols, Last, N> extends State<infer Sym, infer Symbols, infer N>
              ? _Introspect<O[Last], Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
                ? State<`${SAcc}[${Sym}]: ${S}`, Symbols, N>
                : Unreachable
              : Unreachable
            : _Introspect<Last, Context<Step[D], Symbols, N>> extends State<infer SK, infer Symbols, infer N>
              ? _Introspect<O[Last], Context<Step[D], Symbols, N>> extends State<infer SV, infer Symbols, infer N>
                ? State<`${SAcc}${SK}: ${SV}`, Symbols, N>
                : Unreachable
              : Unreachable
        : L extends readonly [infer H extends keyof O, ...infer T extends List]
          ? H extends symbol
            ? GetSymbol<Symbols, H, N> extends State<infer Sym, infer Symbols, infer N>
              ? _Introspect<O[H], Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
                ? _IntrospectIndividualObjectKeys<O, T, Context<D, Symbols, N>, State<`${SAcc}[${Sym}]: ${S}, `, Symbols, N>>
                : Unreachable
              : Unreachable
            : _Introspect<H, Context<Step[D], Symbols, N>> extends State<infer SK, infer Symbols, infer N>
              ? _Introspect<O[H], Context<Step[D], Symbols, N>> extends State<infer SV, infer Symbols, infer N>
                ? _IntrospectIndividualObjectKeys<O, T, Context<D, Symbols, N>, State<`${SAcc}${SK}: ${SV}, `, Symbols, N>>
                : Unreachable
              : Unreachable
        : Unreachable
      : Unreachable
    : Unreachable

/**
 * extracts the individual keys of object `O`
 */
type IndividualKeys<O> =
  keyof {
    [K in keyof O as
      IsLiteralString<K> extends true ? K
      : symbol extends K ? never
      : K extends symbol ? K
      : never
    ]: never
  }

/**
 * extracts the mapped keys of object `O`
 */
type MappedKeys<O> =
  Omit<O, IndividualKeys<O>> extends infer O
    // if there's a mapped string key TS will automatically add a mapped number key of the same thing.
    // so if we encounter situation where there is both a mapped string and mapped number key,
    //  and their values are exactly the same, we'll skip the mapped number key
    ? number extends keyof O
      ? string extends keyof O
        ? Equals<O[number], O[string]> extends true
          ? Exclude<keyof O, number>
          : keyof O
        : keyof O
      : keyof O
    : Unreachable

/**
 * extracts the mapped and individual keys of object `O`
 */
type AllKeys<O> =
  [MappedKeys<O>, IndividualKeys<O>]

/**
 * introspects an object
 */
type IntrospectObject<O, Ctx extends Context> =
  Ctx extends Context<infer D, infer Symbols, infer N>
    ? AllKeys<O> extends [infer MK, infer LK]
      ? [UnionToTuple<MK>, UnionToTuple<LK>] extends [infer LMK extends List, infer LLK extends List]
        ? IsEmpty<LMK> extends true
          ? IsEmpty<LLK> extends true
            ? State<'{}', Symbols, N>
            : _IntrospectIndividualObjectKeys<O, LLK, Context<D, Symbols, N>> extends State<infer S, infer Symbols, infer N>
              ? State<`{ ${S} }`, Symbols, N>
              : Unreachable
          : IsEmpty<LLK> extends true
            ? _IntrospectMappedObjectKeys<O, LMK, Context<D, Symbols, N>> extends State<infer S, infer Symbols, infer N>
              ? State<`{ ${S} }`, Symbols, N>
              : Unreachable
            : _IntrospectMappedObjectKeys<O, LMK, Context<D, Symbols, N>> extends State<infer SM, infer Symbols, infer N>
              ? _IntrospectIndividualObjectKeys<O, LLK, Context<D, Symbols, N>> extends State<infer SI, infer Symbols, infer N>
                ? State<`{ ${SM}, ${SI} }`, Symbols, N>
                : Unreachable
              : Unreachable
        : Unreachable
      : Unreachable
    : Unreachable

type SerializeStringTemplate<S extends string, Acc extends string = ''> =
  S extends '' ? Quote<Acc, "`">
  : S extends `${infer H}${infer T}`
    ? IsLiteral<H> extends true
      ? SerializeStringTemplate<T, `${Acc}${H}`>
      : SerializeStringTemplate<T, `${Acc}\${${Introspect<H>}}`>
  // handles trailing `string` templates, e.g. `foo${string}`
  : Quote<`${Acc}\${${Introspect<S>}}`, "`">

type SerializeString<S extends string> =
  // exact string type
  string extends S ? 'string'
  // string literal (i.e. no templates)
  : IsLiteral<S> extends true ? Quote<S, "'">
  // string template literal
  : SerializeStringTemplate<S>

type _Introspect<T, Ctx extends Context> =
  Ctx extends Context<infer D, infer Symbols, infer N>
      // recursion limit
    ? IsNever<D> extends true ? State<TooDeep, Symbols, N>
      // handle `any`
      : IsAny<T> extends true ? State<'any', Symbols, N>
      // handle `never`
      : IsNever<T> extends true ? State<'never', Symbols, N> 
      // handle `unknown`
      : IsUnknown<T> extends true ? State<'unknown', Symbols, N>
      // handle unions
      : IsUnion<T> extends true ? IntrospectUnion<T, Ctx>
      
      // handle exact primitives
      : Equals<T, string> extends true ? State<'string', Symbols, N>
      : Equals<T, number> extends true ? State<'number', Symbols, N>
      : Equals<T, bigint> extends true ? State<'bigint', Symbols, N>
      : Equals<T, boolean> extends true ? State<'boolean', Symbols, N>
      : Equals<T, null> extends true ? State<'null', Symbols, N>
      : Equals<T, undefined> extends true ? State<'undefined', Symbols, N>
      // handle strings
      : T extends string ? State<SerializeString<T>, Symbols, N>
      // handle non-string serializables
      : T extends Serializable ? State<`${T}`, Symbols, N>
      
      // handle exact symbol type
      : Equals<T, symbol> extends true ? State<'symbol', Symbols, N>
      // handle individual symbols
      : T extends symbol ? GetSymbol<Symbols, T, N>
      
      // handle lists
      : T extends List ? IntrospectList<T, Ctx>
      
      // handle functions
      : T extends Function<infer A, infer R>
        ? _Introspect<A, Context<Step[D], Symbols, N>> extends State<infer SA, infer Symbols, infer N>
          ? _Introspect<R, Context<Step[D], Symbols, N>> extends State<infer SR, infer Symbols, infer N>
            ? State<`Function<${SA}, ${SR}>`, Symbols, N>
            : Unreachable
          : Unreachable
      // handle promises
      : T extends Promise<infer X>
        ? _Introspect<X, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
          ? State<`Promise<${S}>}>`, Symbols, N>
          : Unreachable
      
      // handle some builtins
      : T extends Date ? State<'Date', Symbols, N>
      : T extends RegExp ? State<'RegExp', Symbols, N>
      : T extends Error ? State<'Error', Symbols, N>

      // handle maps/sets
      : T extends Map<infer K, infer V>
        ? _Introspect<K, Context<Step[D], Symbols, N>> extends State<infer SK, infer Symbols, infer N>
          ? _Introspect<V, Context<Step[D], Symbols, N>> extends State<infer SV, infer Symbols, infer N>
            ? State<`Map<${SK}>}, ${SV}>`, Symbols, N>
            : Unreachable
          : Unreachable
      : T extends Set<infer V>
        ? _Introspect<V, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
          ? State<`Set<${S}>`, Symbols, N>
          : Unreachable
      : T extends WeakMap<infer K, infer V>
          ? _Introspect<K, Context<Step[D], Symbols, N>> extends State<infer SK, infer Symbols, infer N>
            ? _Introspect<V, Context<Step[D], Symbols, N>> extends State<infer SV, infer Symbols, infer N>
              ? State<`WeakMap<${SK}, ${SV}>`, Symbols, N>
              : Unreachable
            : Unreachable
      : T extends WeakSet<infer V>
        ? _Introspect<V, Context<Step[D], Symbols, N>> extends State<infer S, infer Symbols, infer N>
          ? State<`WeakSet<${S}>`, Symbols, N>
          : Unreachable

      // handle objects
      : IntrospectObject<T, Context<D, Symbols, N>>
    : Unreachable

/**
 * attempts to introspect type `T` up to depth `D`.
 * 
 * recognizes `never`, `any`, `unknown`, primitives, lists, functions, objects, `Promise`, `Date`, `RegExp`, `Error`, `Map`, `Set`, `WeakMap`, `WeakSet`
 * 
 * @warning may have extraneous parentheses
 * @warning loses tuple label information
 * @warning loses symbol name information and instead replaces it with `__nomicon_introspect__symbol${N}`. symbol mappings should be stable within any given introspection though
 * @warning unions may not appear in the same order
 * @warning object keys may not appear in the same order. mapped keys will always appear before individual keys
 * @warning does not work on intersection types
 * 
 * @example
 * ```ts
 * declare const s0: unique symbol
 * declare const s1: unique symbol
 * 
 * type e0 = Introspect<never>                                                          // "never" 
 * type e1 = Introspect<any>                                                            // "any"
 * type e2 = Introspect<unknown>                                                        // "unknown"
 * type e3 = Introspect<0 | 1>                                                          // "(1 | 0)"
 * type e4 = Introspect<string | number | bigint | boolean | null | undefined | symbol> // "(true | false | bigint | number | null | undefined | symbol | string)"
 * type e5 = Introspect<'foo' | `"'\``>                                                 // "('\"\\'`' | 'foo')"
 * type e6 = Introspect<`foo` | 0 | 1n | true>                                          // "(1 | 'foo' | true | 0)"
 * type e7 = Introspect<Date | RegExp | Error>                                          // "(Error | Date | RegExp)"
 * type e8 = Introspect<Map<0 | 1, 2> | Set<3 | 4> | WeakMap<{}, 5 | 6> | Set<7>>       // "(Set<7> | WeakMap<{}, (6 | 5)> | Set<(4 | 3)> | Map<(1 | 0), 2>)"
 * type e9 = Introspect<Promise<string | number>>                                       // "Promise<(number | string)>"
 * type e10 = Introspect<[]>                                                            // "[]"
 * type e11 = Introspect<['foo']>                                                       // "['foo']"
 * type e12 = Introspect<['foo', (0 | 'bar')?, ...('baz' | ['qux'])[]]>                 // "['foo', ('bar' | 0)?, ...(['qux'] | 'baz')[]]"
 * type e13 = Introspect<['foo', ...'bar'[], 'baz']>                                    // "['foo', ...'bar'[], 'baz']"
 * type e14 = Introspect<(a: 1, b?: 2, ...c: 3[]) => 4>                                 // "Function<[1, 2?, ...3[]], 4>"
 * 
 * type t15 = { [s: number]: string, 0: 'foo', [x: `foo${string}`]: 'bar', b: 'baz', [s0]: 'qux', [sym: symbol]: unknown, [s1]: ['foo', 'bar' | 'baz', { a: 'qux', b: typeof s0 | typeof s1 }] }
 * // "{ [x: symbol]: unknown, [x: number]: string, [x: `foo${string}`]: 'bar', 'b': 'baz', [__nomicon_introspect__symbol0]: ['foo', ('baz' | 'bar'), { 'a': 'qux', 'b': (__nomicon_introspect__symbol0 | __nomicon_introspect__symbol1) }], [__nomicon_introspect__symbol1]: 'qux' }"
 * type e15 = Introspect<t15>
 * ```
 */
export type Introspect<T, D extends Depth = 7> =
  _Introspect<T, { [depth]: D, [symbols]: {}, [n]: 0 }> extends State<infer S, any, any>
    ? S
    : Unreachable