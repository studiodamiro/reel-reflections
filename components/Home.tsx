'use client';

import Header from './Header';
import BackgroundDetail from './BackgroundDetail';
import CarouselWrapper from './CarouselWrapper';
import BackgroundSlider from './BackgroundSlider';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollOffset = ref.current.scrollTop;
        setScrollOffset(scrollOffset);
      }
    };

    if (ref.current) ref.current.addEventListener('scroll', handleScroll);

    return () => {
      if (ref.current) ref.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={cn(pathname !== '/' && 'fixed', 'w-full max-h-screen overflow-hidden overflow-y-auto')}>
      <div className={cn('flex flex-col w-full min-h-[95vh] gap-16 overflow-hidden')}>
        <Header />
        <BackgroundDetail className='flex-1' />
        <CarouselWrapper className='z-20' />
        <BackgroundSlider scrollOffset={scrollOffset} />
      </div>
      <div className='w-full h-full bg-slate-950'>
        <div className='max-w-3xl mx-auto '>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam suscipit odio tempore dicta aliquid iste
            eaque, dolor iusto eos rem unde laudantium vel aspernatur est delectus perspiciatis ducimus soluta
            doloribus! Nihil quaerat porro, at maiores odit illum voluptate, explicabo sed iusto magnam neque,
            consectetur aperiam tempora. Omnis nemo odio, dolorem fuga eos nam aut asperiores aspernatur fugit expedita
            sunt amet. Quae expedita voluptatum ab architecto, sed fuga soluta in, aliquam nihil eaque exercitationem
            rem! Consequuntur, nulla neque praesentium odio similique perferendis libero deserunt doloremque accusamus.
            Assumenda, aperiam quod! Rerum, deserunt? Ratione tempora, recusandae ut, nobis maiores corporis eligendi
            aperiam cupiditate dolor eaque ipsam? Dolorem nisi ipsum aspernatur, vero sapiente, repellendus deserunt
            repellat nulla cumque explicabo, corrupti sed inventore voluptatum impedit. Laborum eaque a rem perspiciatis
            illum totam accusamus labore necessitatibus tempora nostrum ab consequatur quia blanditiis, cumque velit
            dolor quibusdam numquam praesentium aliquid debitis recusandae aspernatur aut laboriosam saepe! Possimus.
            Iure sequi facere expedita accusamus labore et repellendus, suscipit consequatur nostrum maiores veritatis
            in aliquam magni culpa enim corrupti tempora? Voluptatibus placeat praesentium ipsa omnis quo alias impedit
            dolor quos! Iste illum culpa facere dignissimos magnam quae nisi consequuntur, rerum iure, optio officiis
            inventore! Voluptatibus numquam eos aliquid ullam nostrum, officia et fugiat necessitatibus repellat,
            excepturi aspernatur velit deserunt. Quia. Accusantium, debitis iusto id accusamus dolores soluta totam nisi
            ut minima saepe inventore ipsa adipisci incidunt est voluptates mollitia delectus suscipit laborum
            voluptatum quod, nostrum vero nesciunt! Atque, velit ullam. Totam error minus quibusdam pariatur tempore
            vitae autem provident quasi enim delectus, similique, repellat doloremque quis a labore aut, quod dolore!
            Consequatur illo nemo fugiat recusandae ipsum repellat voluptatem officiis. Repudiandae quas dolor
            perspiciatis? Similique nihil iure sed sint consequuntur, tempore fugiat iste asperiores adipisci suscipit
            tempora rem beatae corporis neque non porro corrupti perferendis, dolorem praesentium dicta excepturi modi.
            Enim cum qui quisquam asperiores accusamus voluptatum quidem esse quis mollitia maiores deleniti atque
            nostrum, a labore quae aut vitae ipsa. Voluptas perspiciatis blanditiis aliquam aut pariatur dolorum atque
            amet. Ducimus ipsum omnis dolore, sit officia suscipit explicabo quisquam quasi voluptatem deleniti
            similique at placeat nisi alias minus commodi mollitia numquam voluptas. Repellendus earum nostrum quis
            aperiam autem praesentium aspernatur. Vero, rem iusto? Incidunt illum non, repellendus consectetur dolore
            quidem, praesentium cumque consequatur molestias, architecto perferendis vero! A minima reprehenderit, in
            labore, itaque id tempore vitae sequi nulla enim possimus! Quo, incidunt dicta laborum cumque, explicabo
            animi accusantium provident tempore repellendus aspernatur ipsam. Explicabo unde ipsum, iste sequi
            consequuntur nesciunt, perferendis, labore impedit reprehenderit inventore fuga corrupti ab enim illum.
            Quasi culpa labore voluptatem non tempore iste mollitia eveniet quam aperiam aliquam nostrum harum deleniti,
            veritatis distinctio velit quo sed architecto. Vel, mollitia nobis perspiciatis autem asperiores consequatur
            quia enim. Quas perferendis, nobis amet molestias blanditiis aperiam cum vero, accusamus sunt ratione
            doloremque. Quis natus quidem dolor asperiores ipsam dignissimos, blanditiis eligendi ipsum hic neque,
            laborum repudiandae omnis. Maiores, repellat. Nemo asperiores ipsa dolorum sequi blanditiis, magnam qui
            amet, neque voluptate odio id pariatur! Consequuntur repellendus quidem nostrum sit, consectetur delectus
            alias reiciendis error recusandae dicta facere suscipit ad unde? Necessitatibus quasi cum atque doloremque
            doloribus. Itaque eum debitis ipsum incidunt ullam soluta labore, voluptates at sunt aspernatur, dolorem
            odio nemo. Minima odio, autem itaque ipsam fuga cupiditate maxime repudiandae. Iusto earum eligendi illum
            voluptates fugiat similique ipsa amet explicabo perferendis possimus, quis dolor, repellendus libero,
            obcaecati voluptas officiis sequi doloribus fuga labore nobis nisi id aperiam voluptatibus enim? Quidem!
            Illo sapiente, cupiditate dolor ut deleniti quisquam laudantium quod eos nam animi qui voluptates beatae at
            et labore nisi! Suscipit repellat, blanditiis sunt ad incidunt vitae nemo ea consequatur odit.
          </p>
        </div>
      </div>
    </div>
  );
}
