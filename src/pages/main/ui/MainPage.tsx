import { generateColors, generateConfig, shiftColorBy } from '@/shared/utils';
import { useState } from 'react';

export function MainPage() {
  const [count, setCount] = useState(0);

  const colorsData = generateColors().outputArray;
  console.log(colorsData);

  const currentColor = shiftColorBy('ff0000', count);

  return (
    <div className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">Hello React & Tailwind!</h1>
      <div
        className="w-10 h-10"
        style={{
          backgroundColor: `#${currentColor[4]}${currentColor[5]}${currentColor[2]}${currentColor[3]}${currentColor[0]}${currentColor[1]}`,
        }}
      ></div>
      {shiftColorBy('ff0000', count)}
      <div className="flex flex-row items-center gap-6">
        <input
          type="range"
          min={0}
          max={256 * 6}
          onChange={(e) => {
            setCount(+e.currentTarget.value);
          }}
        />
        <button
          className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Count: {count}
        </button>
      </div>
      <textarea className="w-full" rows={20} defaultValue={generateConfig()} />
      <div className="flex p-2 bg-black">
        {colorsData.map((el, i) => (
          <div
            key={`${el.mButton}_${i.toString()}`}
            className="w-2 h-2"
            style={{
              backgroundColor: `#${el.mButton[4]}${el.mButton[5]}${el.mButton[2]}${el.mButton[3]}${el.mButton[0]}${el.mButton[1]}`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
