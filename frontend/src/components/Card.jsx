import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Card() {
  // scroll
  const { scrollYProgress } = useScroll();
  // initial scale 1
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 16, 0]);

  return (
    <section className="pt-12 relative">
      <motion.div
        style={{ y, rotate }}
        className="relative bg-white w-80 h-[500px] rounded-md shadow-md shadow-slate-50/50"
        transition={{ duration: 2 }}
      >
        <div>
          {/* <span className="absolute bg-sky-700 py-16 w-full rounded-t-md" /> */}
          <span className="absolute bg-zinc-800 p-2 rounded-xl w-20 mt-2 right-[119px]" />
          <span className="absolute -rotate-90 bottom-[50px] -left-[25px]">
            <h1 className="font-mono text-xl font-semi-bold">C3R9T6H2</h1>
          </span>
        </div>
      </motion.div>
    </section>
  );
}

export default Card;
