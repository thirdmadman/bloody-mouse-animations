//BGR: MiddleButton, LeftButton, RightButton, MiddleLeft, MiddleRight, BottomLeft, BottomRight, BottomCenter, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE

import { shiftColorBy } from './colorUtils';

const DISPLAY_TIME = '0.100';

const flipColorString = (color: string) => {
  return `${color[4]}${color[5]}${color[2]}${color[3]}${color[0]}${color[1]}`;
};

export const generateColors = () => {
  const MAX_STEPS = 96;
  const STEP_SIZE = (256 * 6) / MAX_STEPS;
  const statColor = '0000ff';
  let lastColor = statColor;

  const mButtonColor = 'a800ff';

  const outputArray = [];

  for (let i = 0; i < MAX_STEPS; i++) {
    const colorZones = [];

    for (let j = 0; j < 8; j++) {
      colorZones[j] = shiftColorBy(lastColor, Math.floor(STEP_SIZE) + 32 * j);
    }

    const mButtonColorColorShift =
      Math.floor(i / 0.3) >= MAX_STEPS / 0.3 / 2 ? MAX_STEPS / 0.3 - Math.floor(i / 0.3) : Math.floor(i / 0.3);

    colorZones[0] = shiftColorBy(mButtonColor, mButtonColorColorShift);

    outputArray.push({
      LeftButton: colorZones[7],
      MiddleButton: colorZones[0],
      RightButton: colorZones[1],
      MiddleLeft: colorZones[6],
      MiddleRight: colorZones[2],
      BottomLeft: colorZones[5],
      BottomRight: colorZones[3],
      BottomCenter: colorZones[4],
    });

    lastColor = shiftColorBy(lastColor, Math.floor(STEP_SIZE));
  }

  return outputArray;
};

const prefix = `<?xml version="1.0" encoding="UTF-16"?>
  <SledAnimation>
      <Name>Your Custom Animation</Name>
      <Guid>File_0CE176E1-790A-40D9-8BEF-787DFC8AF2D1</Guid>
      <IsFolder>false</IsFolder>
      <FolderGuid>Folder_00000000-0000-0000-0000-000000000000</FolderGuid>
      <Description>ckAnimation:For custom-made each frame.</Description>
      <Time>0</Time>
      <BackgroundColor>000000</BackgroundColor>
      <FrameCount>96</FrameCount>\n`;
const suffix = `</SledAnimation>`;

export const generateConfig = () => {
  const colorsGenerated = generateColors();

  const outputString = colorsGenerated.map((el, i) => {
    const { MiddleButton, LeftButton, RightButton, MiddleLeft, MiddleRight, BottomLeft, BottomRight, BottomCenter } =
      el;

    return `\t<Frame${(i + 1).toString()}>\n\t\t<ColorPicture>${flipColorString(MiddleButton)},${flipColorString(LeftButton)},${flipColorString(RightButton)},${flipColorString(MiddleLeft)},${flipColorString(MiddleRight)},${flipColorString(BottomLeft)},${flipColorString(BottomRight)},${flipColorString(BottomCenter)},ff0000,ff0000,ff0000,ff0000,ff0000,ff0000,ff0000,000000,000000,000000</ColorPicture>\n\t\t<DisplayTime>${DISPLAY_TIME}</DisplayTime>\n\t</Frame${(i + 1).toString()}>`;
  });

  return prefix + outputString.join('\n') + suffix;
};
