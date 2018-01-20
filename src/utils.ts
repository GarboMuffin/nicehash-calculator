export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isNumber(thing: any): boolean {
  return !isNaN(Number(thing));
}
