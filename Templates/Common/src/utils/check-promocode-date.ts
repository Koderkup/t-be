export function checkPromoCodeDate(
  startDate: string | Date,
  endDate: string | Date
) {
  const now = new Date();
  const startPromoCodeDate = new Date(startDate);
  const endPromoCodeDate = new Date(endDate);

  return now > startPromoCodeDate && now < endPromoCodeDate;
}
