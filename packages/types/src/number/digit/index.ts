import * as List from "./list"
export * as List from "./list"

import * as add_ones from "./add-ones"
export * from "./add-ones"
import * as add_tens from "./add-tens"
export * from "./add-tens"
import * as add from "./add"
export * from "./add"
import * as carry from "./carry"
export * from "./carry"
import * as digit from "./digit"
export * from "./digit"

export default {
  List,
  
  ...add_tens,
  ...add_ones,
  ...add,
  ...carry,
  ...digit,
}