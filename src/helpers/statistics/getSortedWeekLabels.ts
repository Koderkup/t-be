//Функция для получения отсортированных дней недели относительно сегоднешнего дня
export function getSortedWeekLabels(labels: string[]): string[] {
  let date: Date = new Date();
  const sortedLabels: string[] = [];
  //Обработка 0 случая
  date.setDate(date.getDate() + 1);
  for (let i = 0; i < 7; i++) {
    date.setDate(date.getDate() - 1);
    sortedLabels.push(labels[date.getDay()]);
  }
  return sortedLabels;
}


