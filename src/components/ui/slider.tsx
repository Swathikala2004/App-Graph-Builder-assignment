import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/utils';

export function Slider({ className, ...props }: SliderPrimitive.SliderProps) {
  return (
    <SliderPrimitive.Root className={cn('ui-slider', className)} {...props}>
      <SliderPrimitive.Track className="ui-slider-track">
        <SliderPrimitive.Range className="ui-slider-range" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="ui-slider-thumb" aria-label="CPU limit" />
    </SliderPrimitive.Root>
  );
}