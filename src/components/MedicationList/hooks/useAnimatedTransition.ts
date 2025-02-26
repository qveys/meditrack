import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface UseAnimatedTransitionProps {
  slideDirection: string | null;
  displayDate: string;
  selectedDate: string;
  onTransitionComplete: () => void;
}

export function useAnimatedTransition({
  slideDirection,
  displayDate,
  selectedDate,
  onTransitionComplete
}: UseAnimatedTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listCurrentRef = useRef<HTMLDivElement>(null);
  const listNextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideDirection || !listCurrentRef.current || !listNextRef.current) return;

    const direction = slideDirection === 'right' ? -1 : 1;
    const currentList = listCurrentRef.current;
    const targetList = listNextRef.current;

    gsap.killTweensOf([currentList, targetList]);
    gsap.set(currentList, { x: 0 });
    gsap.set(targetList, { x: `${100 * direction}%`, autoAlpha: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onTransitionComplete();
          gsap.set([currentList, targetList], { clearProps: "all" });
        }, 300);
      }
    });

    tl.to(currentList, {
      x: `${-105 * direction}%`,
      duration: 0.3,
      ease: "power2.inOut"
    })
    .to(targetList, {
      x: "0%",
      duration: 0.3,
      ease: "power2.inOut"
    }, "<");
  }, [slideDirection, displayDate, selectedDate, onTransitionComplete]);

  return { containerRef, listCurrentRef, listNextRef };
}