export default function arrangeColors(colors: string[]): string[] {
  return colors.sort((a, b) => {
    const colorA = parseInt(a.substring(1), 16);
    const colorB = parseInt(b.substring(1), 16);
    return colorB - colorA;
  });
}
