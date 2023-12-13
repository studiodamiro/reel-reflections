export function stringToDate(date: string) {
  const readableDate = new Date(date);
  return readableDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}
