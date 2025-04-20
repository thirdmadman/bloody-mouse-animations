import { APP_NAME } from '@/constants';
import { AnimationPreview } from '@/features/animation-preview';
import { generateConfig } from '@/shared/utils';

export function MainPage() {
  return (
    <div className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">{APP_NAME}</h1>
      <AnimationPreview />
      <textarea className="w-full" rows={20} defaultValue={generateConfig()} />
    </div>
  );
}
