import { IsAny, IsNever, IsUniqueSymbol, IsUnknown } from "."
import { IsMember, IsUnion } from "../set"
import { IsCharString, IsEmptyString, IsLiteralString, IsNumericString, IsString } from "../string"
import { IsEmptyList, IsList, IsReadonlyList, IsTupleList, IsVariadicList } from "../list"
import { IsFractionalNumber, IsLiteralNumber, IsNegativeNumber, IsNumber } from "../number"
import { IsIntegerNumber } from "../number/int"

export namespace Is {
  
  export type Any<T> = IsAny<T>

  export type Unknown<T> = IsUnknown<T>

  export type Never<T> = IsNever<T>

  export type UniqueSymbol<T> = IsUniqueSymbol<T>

  export type Union<T> = IsUnion<T>
  export namespace Union {
    export type Member<U, M> = IsMember<U, M>
  }

  export type String<T> = IsString<T>
  export namespace String {
    export type Char<T> = IsCharString<T>

    export type Empty<T> = IsEmptyString<T>
    
    export type Literal<T> = IsLiteralString<T>

    export type Numeric<T> = IsNumericString<T>
  }

  export type List<T> = IsList<T>
  export namespace List {
    export type Empty<T> = IsEmptyList<T>
    
    export type Readonly<T> = IsReadonlyList<T>

    export type Tuple<T> = IsTupleList<T>

    export type Variadic<T> = IsVariadicList<T>
  }

  export type Number<T> = IsNumber<T>
  export namespace Number {
    export type Fractional<T> = IsFractionalNumber<T>

    export type Literal<T> = IsLiteralNumber<T>

    export type Negative<T> = IsNegativeNumber<T>

    export type Integer<T> = IsIntegerNumber<T>
  }
}