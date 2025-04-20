import { generateColors } from '@/shared/utils';
import { useCallback, useState } from 'react';

export function AnimationPreview() {
  const [animationFrameDuration, setAnimationFrameDuration] = useState(100);
  const [timer, setTimer] = useState<number | null>(null);
  const [animationFrameNumber, setAnimationFrameNumber] = useState(0);
  const [mouseImageOpacity, setMouseImageOpacity] = useState(100);

  const colorsData = generateColors();

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
      return `#${colorsData[animationFrameNumber][colorZone]}`;
    },
    [animationFrameNumber, colorsData]
  );

  return (
    <>
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
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="animation-frame-duration">Mouse image opacity: {mouseImageOpacity}</label>
          <input
            id="animation-frame-duration"
            type="range"
            min={0}
            max={100}
            value={mouseImageOpacity}
            onChange={(e) => {
              setMouseImageOpacity(+e.currentTarget.value);
            }}
          />
        </div>
        <button className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400" onClick={clickHandler}>
          {timer ? 'Stop' : 'Start'} animation
        </button>
      </div>
      <div className="flex w-160 h-160 bg-black items-center justify-center relative">
        <div className="flex p-4 w-80 h-110 bg-black relative">
          <div
            className="w-10 h-10 absolute top-[15%] left-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('LeftButton'),
              boxShadow: `-48px 0px 128px 48px ${colorShown('LeftButton')}`,
            }}
          ></div>
          <div
            className="w-5 h-25 absolute top-[18%] left-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            style={{
              backgroundColor: colorShown('MiddleButton'),
              boxShadow: `0px 0px 64px 20px ${colorShown('MiddleButton')}`,
            }}
          ></div>
          <div
            className="w-10 h-10 absolute top-[15%] left-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('RightButton'),
              boxShadow: `48px 0px 128px 48px ${colorShown('RightButton')}`,
            }}
          ></div>
          <div
            className="w-10 h-10 absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('MiddleLeft'),
              boxShadow: `-48px 0px 128px 48px ${colorShown('MiddleLeft')}`,
            }}
          ></div>
          <div
            className="w-10 h-10 absolute top-[50%] left-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('MiddleRight'),
              boxShadow: `48px 0px 128px 48px ${colorShown('MiddleRight')}`,
            }}
          ></div>
          <div
            className="w-10 h-10 absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('BottomLeft'),
              boxShadow: `-48px 48px 128px 48px ${colorShown('BottomLeft')}`,
            }}
          ></div>
          <div
            className="w-10 h-10 absolute top-[93%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('BottomCenter'),
              boxShadow: `0px 0px 128px 48px ${colorShown('BottomCenter')}`,
            }}
          ></div>
          <div
            className="w-10 h-10 absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: colorShown('BottomRight'),
              boxShadow: `48px 48px 128px 48px ${colorShown('BottomRight')}`,
            }}
          ></div>
        </div>
        <div className="w-full h-full backdrop-blur-sm absolute" />
        <img
          src="/p91.png"
          alt="p91"
          className="absolute w-70 -translate-x-0.5"
          style={{
            opacity: `${mouseImageOpacity.toString()}%`,
          }}
        />
      </div>
    </>
  );
}

export default AnimationPreview;
