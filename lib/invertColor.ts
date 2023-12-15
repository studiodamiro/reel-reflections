export default function invertColor(hexColor: string | null): string {
  if (hexColor === null) return ''; // or handle the null case as per your requirements

  // Remove the '#' symbol from the hex color
  hexColor = hexColor.replace('#', '');

  // Convert the hex color to RGB
  const red = parseInt(hexColor.substring(0, 2), 16);
  const green = parseInt(hexColor.substring(2, 4), 16);
  const blue = parseInt(hexColor.substring(4, 6), 16);

  // Invert the RGB color
  const invertedRed = 255 - red;
  const invertedGreen = 255 - green;
  const invertedBlue = 255 - blue;

  // Convert the inverted RGB color back to hex
  const invertedHexColor = `#${invertedRed.toString(16).padStart(2, '0')}${invertedGreen
    .toString(16)
    .padStart(2, '0')}${invertedBlue.toString(16).padStart(2, '0')}`;

  return invertedHexColor;
}
