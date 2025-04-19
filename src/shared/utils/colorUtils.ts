const clampColor = (color: number, change: number) => {
  const maxDelta = 255 - color;

  const changeAvailable = Math.max(-color, Math.min(maxDelta, change));
  const reminder = change - changeAvailable;

  const result = { result: color + changeAvailable, reminder };

  return result;
};

export const shiftColorBy = (color: string, shift: number) => {
  let colorShiftNumber = shift;

  colorShiftNumber = Math.max(-(256 * 6), Math.min(256 * 6, colorShiftNumber));

  let colorB = parseInt(`${color[0]}${color[1]}`, 16);
  let colorG = parseInt(`${color[2]}${color[3]}`, 16);
  let colorR = parseInt(`${color[4]}${color[5]}`, 16);

  let reminder = 0;

  // shift the color literally by the given amount, just changing the Hue value
  if (colorR === 255 && colorG === 0 && colorB < 255) {
    const shiftObject = clampColor(colorB, +colorShiftNumber);
    colorB = shiftObject.result;
    reminder = shiftObject.reminder;
  } else if (colorB === 255 && colorG === 0 && colorR > 0) {
    const shiftObject = clampColor(colorR, -colorShiftNumber);
    colorR = shiftObject.result;
    reminder = shiftObject.reminder;
  } else if (colorR === 0 && colorB === 255 && colorG < 255) {
    const shiftObject = clampColor(colorG, +colorShiftNumber);
    colorG = shiftObject.result;
    reminder = shiftObject.reminder;
  } else if (colorR === 0 && colorG === 255 && colorB > 0) {
    const shiftObject = clampColor(colorB, -colorShiftNumber);
    colorB = shiftObject.result;
    reminder = shiftObject.reminder;
  } else if (colorG === 255 && colorB === 0 && colorR < 255) {
    const shiftObject = clampColor(colorR, +colorShiftNumber);
    colorR = shiftObject.result;
    reminder = shiftObject.reminder;
  } else if (colorR === 255 && colorB === 0 && colorG > 0) {
    const shiftObject = clampColor(colorG, -colorShiftNumber);
    colorG = shiftObject.result;
    reminder = shiftObject.reminder;
  }

  const resultString = `${colorB.toString(16).padStart(2, '0')}${colorG
    .toString(16)
    .padStart(2, '0')}${colorR.toString(16).padStart(2, '0')}`;

  let result = resultString;

  if (reminder !== 0) {
    result = shiftColorBy(resultString, Math.abs(reminder));
  }

  return result;
};
