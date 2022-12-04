import { Concat } from "./concat";
import { IsEmpty } from "./is-empty";
import { List } from "./list";

type Options<PLN extends Boolean = Boolean> = {
  preserve_labels_nonvariadic: PLN
}

/**
 * tail call optimized type to reverse a variadic tuple with leading spread (e.g. `[...A[], B]`).
 * variadic tuples can only have one spread element, so since we assume the list has a leading spread,
 *  we can safely go backwards from the end until only the spread is left and handle the spread as its own chunk.
 */
type __Reverse<L extends List, Acc extends List = []> =
  L extends [...infer Spread, infer Last]
    ? __Reverse<Spread, [...Acc, Last]>
    : [...Acc, ...L] // since we assume `L` is a variadic tuple with leading spread, if we're at this branch then only the spread element is left

/**
* tail call optimized type to reverse a list.
* properly handles variadic tuples with nonleading spreads.
* defers variadic tuples with leading spreads to `_ReverseLeft`, which is also tail call optimized.
*/
type _Reverse<L extends List, Acc extends List = []> =
  IsEmpty<L> extends true ? Acc
  : L extends [infer H, ...infer T] ? _Reverse<T, [H, ...Acc]>
  : L extends [...any, any] ? [...__Reverse<L>, ...Acc]
  : L extends { 0?: any }
    ? L extends [_?: infer H, ...__: infer T]
      ? _Reverse<T, [H, ...Acc]>
      : Concat<L, Acc> // unreachable
  : Concat<L, Acc>

type __ReverseNonvariadic<L extends List, Acc extends List = []> =
  L extends [...infer Spread, any]          /// capture the Init
    ? L extends [...Spread, ...infer Last]  //  and then use it to capture the Last with label
      ? __ReverseNonvariadic<Spread, [...Acc, ...Last]>
      : [...Acc, ...L] // unreachable
    : [...Acc, ...L]

type _ReverseNonvariadic<L extends List, Acc extends List = []> =
  IsEmpty<L> extends true ? Acc
  : L extends [infer H, ...infer T]
    ? L extends [...infer H, ...T]
      ? _ReverseNonvariadic<T, [...H, ...Acc]>
      : never // unreachable
  : L extends [...any, any] ? [...__ReverseNonvariadic<L>, ...Acc]
  : L extends { 0?: any }
    ? L extends [_?: infer H, ...__: infer T]
      ? L extends [...infer H, ...T]
        ? _Reverse<T, [...Required<H>, ...Acc]>
        : Concat<L, Acc> // unreachable
      : never // unreachable
  : Concat<L, Acc>

/**
 * reverses a list. works on infinite length lists including variadic tuples.
 * includes optional elements when reversing. said elements also can no longer be `undefined`.
 * 
 * by default does not preserve labels. the `preserve_labels_nonvariadic` option allows for preserving labels.
 * however, this option should only be used with nonvariadic labeled tuples, as the algorithm for preserving labels is incompatible with variadic tuples.
 * 
 * @example
 * type e0 = Reverse<string[]> // string[]
 * type e1 = Reverse<[string, number, boolean]> // [boolean, number, string]
 * type e2 = Reverse<[string, ...number[], boolean]> // [boolean, ...number[], string]
 * 
 * // testing on very very long tuple. works on this (512 elements, with a `...number[]` between 255 and 256), but seems to break somewhere between 512 and 1024 though
 * type t3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,...number[],256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511]
 * type e3 = Reverse<t3> // not gonna write it out, but it works fine with no error
 * 
 * type e4 = Reverse<[string, number, boolean?]> // [boolean, number, string]
 * type e5 = Reverse<[string, number, (boolean | undefined)?, symbol?]> // [symbol, boolean, number, string]
 * 
 * type e6 = Reverse<[a: string, b: number, c?: boolean | undefined, d?: symbol]> // [symbol, boolean, number, string]
 * type e7 = Reverse<[a: string, b: number, c?: boolean | undefined, d?: symbol], { preserve_labels_nonvariadic: true }> // [d: symbol, c: boolean, b: number, a: string]
 * type w8 = Reverse<[a: 0, ...b: 1[]], { preserve_labels_nonvariadic: true }> // unknown[] // DO NOT MIX `preserve_labels_nonvariadic` WITH VARIADIC TUPLES
 */
export type Reverse<L extends List, Opts extends Options = Options<false>> =
  Opts extends Options<true>
    ? _ReverseNonvariadic<L>
    : _Reverse<L>
