'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(1);

  return (
    <motion.div
      initial={{ rotate: 180 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 1.2, delay: 2, ease: 'easeOut' }}
    >
      <button className='bg-red-400 rounded-sm w-8 h-8' onClick={() => setCount(count + 1)}>
        +
      </button>
      {' Add 1 to '}
      {count}
    </motion.div>
  );
}
