//Сравнивает даты на равенство
export default function isDateEqualWithoutTime(
  firstDate: Date,
  secondDate: Date,
): boolean {
  firstDate.setHours(0, 0, 0, 0);
  secondDate.setHours(0, 0, 0, 0);
  return firstDate.getTime() === secondDate.getTime();
}
