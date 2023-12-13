interface ArticleSliderProps {
  title: string;
}

export default function ArticleSlider({ title }: ArticleSliderProps) {
  return <div className='w-full aspect-video bg-red-500/20'>{title}</div>;
}
