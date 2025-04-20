import { APP_NAME } from '@/constants';
import { generateColors, generateConfig } from '@/shared/utils';
import { useCallback, useState } from 'react';

export function MainPage() {
  const [animationFrameDuration, setAnimationFrameDuration] = useState(100);

  const [timer, setTimer] = useState<number | null>(null);
  const [animationFrameNumber, setAnimationFrameNumber] = useState(0);
  const colorsData = generateColors().outputArray;

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(null);
  };

  const clickHandler = () => {
    if (timer) {
      setAnimationFrameNumber(0);
      stopTimer();
      return;
    }
    const timerId = setInterval(() => {
      setAnimationFrameNumber((current) => {
        if (current < colorsData.length - 1) {
          return current + 1;
        } else {
          return 0;
        }
      });
    }, animationFrameDuration);

    setTimer(timerId);
  };

  const colorShown = useCallback(
    (colorZone: keyof (typeof colorsData)[number]) => {
      return `#${colorsData[animationFrameNumber][colorZone][4]}${colorsData[animationFrameNumber][colorZone][5]}${colorsData[animationFrameNumber][colorZone][2]}${colorsData[animationFrameNumber][colorZone][3]}${colorsData[animationFrameNumber][colorZone][0]}${colorsData[animationFrameNumber][colorZone][1]}`;
    },
    [animationFrameNumber, colorsData]
  );

  return (
    <div className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">{APP_NAME}</h1>
      <div className="flex flex-row items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="animation-frame-duration">Animation frame duration: {animationFrameDuration}ms</label>
          <input
            id="animation-frame-duration"
            type="range"
            min={10}
            max={1000}
            value={animationFrameDuration}
            onChange={(e) => {
              setAnimationFrameDuration(+e.currentTarget.value);
            }}
          />
        </div>
        <button className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400" onClick={clickHandler}>
          {timer ? 'Stop' : 'Start'} animation
        </button>
      </div>
      <div className="flex p-4 w-80 h-80 bg-black relative">
        <div
          className="w-10 h-10 absolute top-[10%] left-[20%]"
          style={{
            backgroundColor: colorShown('LeftButton'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[20%] left-[50%]"
          style={{
            backgroundColor: colorShown('MiddleButton'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[10%] left-[80%]"
          style={{
            backgroundColor: colorShown('RightButton'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[40%] left-[20%]"
          style={{
            backgroundColor: colorShown('MiddleLeft'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[40%] left-[80%]"
          style={{
            backgroundColor: colorShown('MiddleRight'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[80%] left-[20%]"
          style={{
            backgroundColor: colorShown('BottomLeft'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[80%] left-[50%]"
          style={{
            backgroundColor: colorShown('BottomCenter'),
          }}
        ></div>
        <div
          className="w-10 h-10 absolute top-[80%] left-[80%]"
          style={{
            backgroundColor: colorShown('BottomRight'),
          }}
        ></div>
      </div>
      <textarea className="w-full" rows={20} defaultValue={generateConfig()} />
    </div>
  );
}
