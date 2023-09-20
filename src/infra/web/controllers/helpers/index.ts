export function convertStringToFloat(value: string): number {
  if (value != "") return parseFloat(value);

  return 0;
}

export function convertStringToInt(value: string): number {
  if (value != "") return parseInt(value);

  return 0;
}
