import { Digit } from "../digit"

/**
 * representation of integer as a list of digits.
 * 
 * @remarks
 * when should one use this vs digit strings?
 * digit strings are able to encode the sign.
 * meanwhile, digit lists are able to encode the length, making comparisons easier
 * 
 * @remarks
 * types operating on DigitLists assume that DigitLists are not unions and are finite, with no spread elements or optional elements.
 * 
 * @since 0.0.6
 */
export type DigitList = readonly Digit[]