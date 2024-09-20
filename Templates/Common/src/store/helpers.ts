export const phoneNumberFormatCheck = (phoneNumber: string) =>
  phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
