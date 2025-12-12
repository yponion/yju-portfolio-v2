import { useSpring, useTransform, MotionValue } from 'framer-motion';

export const useSpringTransform = (motionValue: MotionValue) => {
  return (inputRange: number[], outputRange: number[]) =>
    useSpring(useTransform(motionValue, inputRange, outputRange), {
      stiffness: 200,
      damping: 20,
      mass: 0.5,
    });
};
