'use client';

import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div>
          <button className='bg-red-400 rounded-full w-8 h-8' onClick={() => setCount(count + 1)}>
            +
          </button>{' '}
          {count}
        </div>
      )}
    </>
  );
}
