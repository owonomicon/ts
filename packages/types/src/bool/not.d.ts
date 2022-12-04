export type Not<T extends boolean> = 
  T extends true
    ? false
    : true