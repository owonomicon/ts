// import { Nominal } from "./nominal";

// declare const __UNREACHABLE__: unique symbol

// /**
//  * a type to flag a branch of a conditional type to be unreachable.
//  * mostly useful for grepping.
//  */
// export type Unreachable = Nominal<{}, typeof __UNREACHABLE__>

/**
 * a type to flag a branch of a conditional type to be unreachable.
 * mostly useful for grepping.
 */
 export type Unreachable = never