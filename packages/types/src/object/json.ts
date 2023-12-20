/**
 * a json primitive
 * 
 * @since 0.0.8
 */
export type JsonPrimitive =
  | string
  | number
  | true
  | false
  | null

/**
 * a generic json type
 * 
 * @since 0.0.8
 */
export type Json =
  | JsonPrimitive
  | { [K: string]: Json }
  | Json[]