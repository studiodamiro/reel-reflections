export function adjustHexColor(hexColor: string, darkLight: 'dark' | 'light', percent: number) {
  // Convert hex to RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  if (darkLight == 'dark') {
    // Darken the RGB values
    const darkness = 1 - percent / 100;
    var newR = Math.floor(r * darkness);
    var newG = Math.floor(g * darkness);
    var newB = Math.floor(b * darkness);
  } else {
    // Lighten the RGB values
    const brightness = 1 + percent / 100;
    var newR = Math.min(Math.floor(r * brightness), 255);
    var newG = Math.min(Math.floor(g * brightness), 255);
    var newB = Math.min(Math.floor(b * brightness), 255);
  }

  // Convert RGB to hex
  const newHexColor =
    '#' + newR.toString(16).padStart(2, '0') + newG.toString(16).padStart(2, '0') + newB.toString(16).padStart(2, '0');

  return newHexColor;
}
