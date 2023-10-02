type _StripLeadingZeros<S extends string> =
  S extends '0' ? S // don't convert zero itself into the empty string -- we only want to strip _leading_ zeros
  : S extends `0${infer T}` ? _StripLeadingZeros<T>
  : S

/**
 * strips leading zeros from number string `S`
 * 
 * @since 0.0.2
 */
export type StripLeadingZeros<S extends string> =
  S extends `-${infer T}` ? `-${_StripLeadingZeros<T>}`
  : _StripLeadingZeros<S>