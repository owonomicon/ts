export interface HKT<I = unknown, O = unknown> {
  readonly [HKT._]: unknown
  [HKT.i]: I
  [HKT.o]: O
}

export namespace HKT {
  const _: unique symbol
  type _ = typeof _
  
  const i: unique symbol
  type i = typeof i

  const o: unique symbol
  type o = typeof o

  type I<Kind extends HKT> = Kind[HKT.i]
  type O<Kind extends HKT> = Kind[HKT.o]
}

export type I<Kind extends HKT> = HKT.I<Kind>
export type O<Kind extends HKT> = HKT.O<Kind>