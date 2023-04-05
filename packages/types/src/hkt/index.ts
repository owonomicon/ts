import * as List from "./list"
export * as List from "./list"

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

  ...$,
  ...composition,
  ...constant,
  ...hkt,
  ...identity,
}