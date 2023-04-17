/**
 * a unicode Category Zs whitespace character
 * 
 * @see https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
export type CategoryZsWhitespace =
  | '\u0020'  // space
  | '\u00a0'  // no-break space
  | '\u1680'  // ogham space mark
  | '\u2000'  // en quad
  | '\u2001'  // em quad
  | '\u2002'  // en space
  | '\u2003'  // em space
  | '\u2004'  // three-per-em space
  | '\u2005'  // four-per-em space
  | '\u2006'  // six-per-em space
  | '\u2007'  // figure space
  | '\u2008'  // punctuation space
  | '\u2009'  // thin space
  | '\u200a'  // hair space
  | '\u202f'  // narrow no-break space
  | '\u205f'  // medium mathematical space
  | '\u3000'  // ideographic space

/**
 * a ECMAScript whitespace character
 * 
 * @see https://262.ecma-international.org/6.0/#table-32
 */
export type EcmascriptWhitespace =
  | '\u0009'  // tab
  | '\u000b'  // line tabulation
  | '\u000c'  // form feed (ff)
  | '\u0020'  // space
  | '\u00a0'  // no-break space
  | '\ufeff'  // zero width no-break space
  | CategoryZsWhitespace

/**
 * a ECMAScript line break character
 * 
 * @see https://262.ecma-international.org/6.0/#table-33
 */
export type EcmascriptLineTerminator =
  | '\u000a' // line feed
  | '\u000d' // carriage return
  | '\u2028' // line separator
  | '\u2029' // paragraph separator