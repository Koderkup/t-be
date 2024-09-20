//Функция проверяет поподает ли дата value во временной диапазон
export default function isDateInTimeRange(
  startDate: Date,
  endDate: Date,
  value: Date,
): boolean {
  value.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  if (startDate.getTime() >= endDate.getTime()) {
    throw new Error('Invalid Dates');
  }
  return (
    startDate.getTime() <= value.getTime() &&
    value.getTime() >= endDate.getTime()
  );
}
