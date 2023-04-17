declare const TS_TYPE_ERROR: unique symbol

/**
 * an example of creating an error type that cannot be accidentally assigned to.
 * 
 * essentially, by creating an unexported unique symbol key, it's impossible to create the type on the user end.
 * 
 * @remark
 * it's also for this reason that this type isn't exported - otherwise, users would be able to construct this type.
 * as such, this serves simply as a reference implementation for creating type error types within a file
 * 
 * @remark
 * the name of the type DOES matter, as it's what appears for custom type parameter constraints.
 * 
 * @internal
 */
type TS_TYPE_ERROR<Message extends string> =
  { [TS_TYPE_ERROR]: Message }