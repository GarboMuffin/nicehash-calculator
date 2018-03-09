export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isNumber(thing: any): boolean {
  return !isNaN(Number(thing));
}

export function clone<T = any>(arr: T[]): T[] {
  let i = arr.length;
  const res = [];
  while (i--) {
    res[i] = arr[i];
  }
  return res;
}
