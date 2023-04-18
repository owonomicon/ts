import * as List from "./list"
export * as List from "./list"
import * as String from "./string"
export * as String from "./string"

import * as $ from "./$"
export * from "./$"
import * as composition from "./composition"
export * from "./composition"
import * as constant from "./constant"
export * from "./constant"
import * as hkt from "./hkt"
export * from "./hkt"
import * as identity from "./identity"
export * from "./identity"

export default {
  List,
  String,

  ...$,
  ...composition,
  ...constant,
  ...hkt,
  ...identity,
}