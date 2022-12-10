declare const __FAILED__PREDICATE__: unique symbol

/**
 * a type to indicate that a condition has not been met.
 * useful for grepping, or discriminating between `never` as a possible valid type versus some condition not being fulfilled.
 * @internal
 * @private
 */
export type __nomicon_internal_type_do_not_use__FailedPredicate<Message extends string> =
  { [__FAILED__PREDICATE__]: Message }