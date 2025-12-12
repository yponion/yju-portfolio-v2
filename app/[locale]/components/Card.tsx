'use client';

import { ReactNode, Children, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { useSpringTransform } from '@/app/[locale]/hooks/useSpringTransform';

/** 자식을 2개 받음 (first children: front, second children: back) */
export default function Card({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);
  const front = childArray[0] ?? null;
  const back = childArray[1] ?? null;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 64px', 'end end'],
  });

  const springTransform = useSpringTransform(scrollYProgress);

  const scaleX = springTransform([0, 0.3, 0.7, 1], [1, 0.7, 0.7, 1]);
  const scaleY = springTransform([0, 0.3, 0.7, 1], [1, 0.7, 0.7, 1]);
  const rotateX = springTransform([0.3, 0.7], [0, 180]);
  const borderRadius = springTransform([0, 0.3, 0.7, 1], [0, 32, 32, 0]);
  const shadowY = springTransform([0, 0.3, 0.7, 1], [0, 16, 16, 0]);
  const blur = useTransform(shadowY, (v) => v * 1.5);
  const spread = useTransform(shadowY, (v) => v * 0.4);
  const boxShadow = useMotionTemplate`0px ${shadowY}px ${blur}px ${spread}px rgba(0 0 0 / 0.18)`;

  return (
    <div ref={containerRef} className="min-h-[200vh]">
      <div className="sticky top-16 h-[calc(100dvh-64px)] flex items-center justify-center [perspective:1200px] px-4 overflow-hidden">
        <motion.div
          style={{
            scaleX,
            scaleY,
            rotateX,
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="absolute inset-0 transform-gpu"
        >
          <InnerCard
            direction="front"
            borderRadius={borderRadius}
            boxShadow={boxShadow}
          >
            {front}
          </InnerCard>
          <InnerCard
            direction="back"
            borderRadius={borderRadius}
            boxShadow={boxShadow}
          >
            {back}
          </InnerCard>
        </motion.div>
      </div>
    </div>
  );
}

const InnerCard = ({
  children,
  borderRadius,
  direction,
  boxShadow,
}: {
  children: ReactNode;
  borderRadius: MotionValue<number>;
  direction: 'front' | 'back';
  boxShadow: MotionValue<string>;
}) => {
  return (
    <motion.div
      style={{ WebkitBackfaceVisibility: 'hidden', borderRadius, boxShadow }}
      className={cn(
        'absolute inset-0 [backface-visibility:hidden] flex items-center justify-center overflow-hidden',
        direction === 'back' && '[transform:rotateX(180deg)]'
      )}
    >
      {children}
    </motion.div>
  );
};
