import { cn } from '@/lib/utils';

type MarkerProps = {
  text: string;
  id: number;
  color: string;
  className?: string;
};

export default function Marker({ text, id, color, className }: MarkerProps) {
  return (
    <div
      style={{ background: color }}
      className={cn(
        id !== 0 && 'hidden',
        'absolute z-[3] py-1 pl-3 pr-2 rounded-bl-md rounded-tr-md top-0 right-0',
        'uppercase text-xs font-semibold tracking-widest',
        className
      )}
    >
      {text}
    </div>
  );
}
