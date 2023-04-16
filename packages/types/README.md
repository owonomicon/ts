# `@nomicon/types`

library of useful TypeScript types

> WARNING: while this project is still in the 0.x stage, it may not respect SemVer. It's highly recommended to pin the version if this is a concern.

## overview

`@nomicon/types` is a zero-runtime library of TypeScript utility types. it can broadly be thought of as providing three classes of types: "pure utility" types for enhancing the TypeScript type system (e.g. `IsNever`, `IsAny`, `IsUnion`, `Satisfies`), "traditional helper" types abstracting over otherwise complex operations on types (e.g. `List.Reverse`, `DeepReadonly`), and "higher-kinded" types, which operate on the type level.

while "pure utility" types are applicable in practically any context, the "traditional" and "higher-kinded" types are somewhat distinct and follow separate sets of naming conventions (see [#naming conventions](#naming-conventions)) that best fit for their own ecosystems, at the expense of inconsistency across the library as a whole.

## features

- $\lambda$ composable types with a simple interface for defining higher-kinded types (see the [higher-kinded types README](./src/hkt/README.md))
- 🧊 suffocatingly slow
  - at the moment performance is something "considered" but not tested for or anything. i'm not even sure the best way to profile TS types, is it just running TS on some examples and using the TS performance profiler? need to look into this. whatever the case the hope is that in due time this can become "🔥 blazing fast"

## naming conventions

this package follows a set of naming conventions and guidelines for types to reduce cognitive overhead, as follows:

---

- types are named using `PascalCase`
- types prefixed with `_` are private and should not be exported
- "type checking" types should follow the naming convention `Is[Whatever]`, e.g. `IsTuple`, `IsVariadic`
- "type coersion" types should follow the naming convention `As[Whatever]`, e.g. `AsString`, `AsObject`

--- 

higher-kinded types have some slightly different additional rules:

- types that implement the `HKT` interface should follow the general guidelines and use `PascalCase`
- types that operate on an HKT should be prefixed with `$`. This binds before the `_` prefix in helper types, e.g. `_$Type` not `$_Type`

---

on generics order:

- the primary type to operate on (if any) should be the first generic
- accumulator types should be the last generic
- options types should be the very last generic, including after accumulators

these rules are different for types that implement the HKT interface:

-  the primary type to operate on should be the _last_ generic
- options types should be the _first_ generic

---

on generics naming:

- use `S` for a generic string
- use `L` for a generic list
- use `H` and `T` for the head and tail of a list. fallback to `Head` and `Tail`
- use `I` and `L` for the "init" and last of a list. fallback to `Init` and `Last`
- use `S` for the spread element of a list. fallback to `Spread`
- use `X` for an element of a list
- use `O` for an object
- use `K` for a key in an object
- use `N` for a number
- use `N` for an iteration
- use `U` for a union
- use `T` for any type
- use `A`, `B`, `C`, ... for more than one of any type
- use `<name>1`, `<name>2`, etc for more than one of a specific type (e.g. `S1`, `S2` for two strings of equal "importance" in a type)
- use `Acc` for the accumulator in a tail recursive type
- use `Kind` for a HKT
- use `Kinds` for a list of HKTs
- use `X` for the input of an HKT
- use `P` for a predicate HKT (i.e. an HKT that returns a boolean)
- use `Opts` for options (and use `snake_case` for option keys)