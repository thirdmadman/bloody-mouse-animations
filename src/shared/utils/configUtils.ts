import { shiftColorBy } from './colorUtils';

const DISPLAY_TIME = '0.100';

export const generateColors = () => {
  let outputString = '';
  const MAX_STEPS = 96;
  const STEP_SIZE = (256 * 6) / MAX_STEPS;
  const statColor = 'ff0000';
  let lastColor = statColor;

  const mButtonColor = 'ff00a8';

  const outputArray = [];

  for (let i = 0; i < MAX_STEPS; i++) {
    const colorZones = [];

    for (let j = 0; j < 7; j++) {
      colorZones[j] = shiftColorBy(lastColor, Math.floor(STEP_SIZE) + 32 * j);
    }

    const mButtonColorColorShift =
      Math.floor(i / 0.3) >= MAX_STEPS / 0.3 / 2 ? MAX_STEPS / 0.3 - Math.floor(i / 0.3) : Math.floor(i / 0.3);

    outputArray.push({
      colorZones,
      mButton: shiftColorBy(mButtonColor, mButtonColorColorShift),
    });

    lastColor = shiftColorBy(lastColor, Math.floor(STEP_SIZE));

    outputString += `\t<Frame${(i + 1).toString()}>\n\t\t<ColorPicture>${shiftColorBy(
      mButtonColor,
      mButtonColorColorShift
    )},${colorZones[1]},${colorZones[6]},${colorZones[2]},${colorZones[5]},${colorZones[3]},${colorZones[4]},${
      colorZones[3]
    },ff0000,ff0000,ff0000,ff0000,ff0000,ff0000,ff0000,000000,000000,000000</ColorPicture>\n\t\t<DisplayTime>${DISPLAY_TIME}</DisplayTime>\n\t</Frame${(
      i + 1
    ).toString()}>\n`;
  }

  return { outputString, outputArray };
};

const prefix = `<?xml version="1.0" encoding="UTF-16"?>
  <SledAnimation>
      <Name>Mamba602!!</Name>
      <Guid>File_0CE176E1-790A-40D9-8BEF-787DFC8AF2D1</Guid>
      <IsFolder>false</IsFolder>
      <FolderGuid>Folder_00000000-0000-0000-0000-000000000000</FolderGuid>
      <Description>ckAnimation:For custom-made each frame。
  </Description>
      <Time>0</Time>
      <BackgroundColor>000000</BackgroundColor>
      <FrameCount>96</FrameCount>`;
const suffix = `</SledAnimation>`;

export const generateConfig = () => {
  return prefix + generateColors().outputString + suffix;
};
