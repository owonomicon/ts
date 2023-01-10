/**
 * checks if number `N` is an integer
 * 
 * @warning "numeric literals with absolute values equal to 2^53 or greater are too large to be represented accurately as integers.ts(80008)"
 * 
 * @todo since all issues are with false positives maybe just Not<IsFractional>?
 * 
 * @example
 * ```ts
 * type e0 = IsInteger<never>               // never
 * type e1 = IsInteger<number>              // false
 * type e2 = IsInteger<0>                   // true
 * type e3 = IsInteger<1>                   // true
 * type e4 = IsInteger<-1>                  // true
 * type e5 = IsInteger<0.1>                 // false
 * type e6 = IsInteger<-0.1>                // false
 * type e7 = IsInteger<9007199254740992>    // true
 * type e8 = IsInteger<-9007199254740992>   // true
 * 
 * type w0 = IsInteger<9007199254740992.1>  // true
 * ```
 */
export type IsInteger<N extends number> =
  `${N}` extends (infer S extends string)  
    ? `${number}` extends S ? false
      : S extends `${number}.${number}` ? false
      : true
    : false

export type IsIntegerNumber<T> =
  T extends number
    ? IsInteger<T>
    : false