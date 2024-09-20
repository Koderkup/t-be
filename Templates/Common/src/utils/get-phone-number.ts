export function getPhoneNumber() {
  const data = localStorage.getItem('tg-storage');
  if (data) {
    const tgStore = JSON.parse(data);
    return tgStore?.state?.userInformation?.userPhoneNumber;
  }
  return null;
}
