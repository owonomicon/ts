# `@nomicon/types/hkt`

This folder contains types for working with the HKT interface, as well as an ecosystem of HKT helper types, akin to the traditional helper types otherwise in the `@nomicon/types` library.

## what are higher kinded types and why use them?

in TypeScript, generics have to be provided with all their type parameters. conceptually, this can be thought of like if functions couldn't be passed to other functions.

in essence, higher-kinded types are a means for abstracting over yet-undefined generic types, which allows for better composition of types.

for example, consider the case of wanting a type representing whether a list contains a string (note, handling of various edge cases is omitted for brevity):

```ts
type ContainsAString<L extends any[]> =
  L extends [infer H, ...infer T]
    ? H extends string
      ? true
      : ContainsAString<T>
    : false

type DoesMyListHaveAString = ContainsAString<MyList>
```

that wasn't too bad. but what if we want a type to check if it contains a number? or if it has exactly the `string` element, not some string literal? or any other condition? we'd have to create a new type for each of these, each taking in some `L`, and using more or less the same code - the only line really changing would be the `H extends string`.

with higher-kinded types we can instead express these as

```ts
type ContainsAString = Exists<ExtendsString>
type DoesMyListHaveAString = $<ContainsAString, MyList>

type ContainsExactlyString = Exists<ExactlyString>
type DoesMyListHaveTheStringType = $<ContainsExactlyString, MyList>
// etc
```

where `Exists`, `ExtendsString`, `ExactlyString`, etc are types implementing the `HKT` interface. that is, we've abstracted over the type to operate on (`MyList` in this example, but it could be any other list) such that _we can describe what we'll do to the input type without actually needing to pass in the input_. this lets us _compose_ types from a set of primitives rather than having to _rewrite_ similar types.