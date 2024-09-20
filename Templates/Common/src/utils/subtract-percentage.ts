export const subtractPercentage = (
  number?: number,
  percentage?: number
): number => {
  if (!number) return 0;

  if (!percentage) return number;

  return number - (number * percentage) / 100;
};
