import type { SetUnion } from "../union/union"

export type KeyUnion<A, B> = SetUnion<keyof A, keyof B>

export type ObjectUnion<A, B> = A & B