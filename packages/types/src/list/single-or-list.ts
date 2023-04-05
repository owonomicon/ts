import { List } from "."

/**
 * type for either some type `T`, or an array of type `T`.
 * typically useful for libraries with external apis to improve end user experience (e.g. field is either a single string, or a list of strings)
 * 
 * @example
 *    type Config = { paths: SingleOrList<string> }
 *    
 *    const e1: Config = { paths: 'foo/bar' } // okay
 * 
 *    const e2: Config = { paths: ['foo/bar', 'baz/qux'] } // also okay
 */
export type SingleOrList<T> =
  | T
  | List<T>