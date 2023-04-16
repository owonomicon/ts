# `@nomicon/types`

> WARNING: while this project is still in the 0.x stage, it may not respect SemVer. It's highly recommended to pin the version if this is a concern.

`@nomicon/types` is a zero-runtime library of TypeScript utility types. it can broadly be thought of as providing three classes of types: "pure utility" types for enhancing the TypeScript type system (e.g. `IsNever`, `IsAny`, `IsUnion`, `Satisfies`), "traditional helper" types abstracting over otherwise complex operations on types (e.g. `List.Reverse`, `DeepReadonly`), and "higher-kinded" types, which operate on the type level. 