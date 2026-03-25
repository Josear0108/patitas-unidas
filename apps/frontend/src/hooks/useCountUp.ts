import { useEffect, useRef, useState } from 'react';

/**
 * Hook de animación de contadores con easing easeOutQuart.
 * Se activa una sola vez cuando el elemento entra en el viewport (IntersectionObserver).
 *
 * @param target - Valor final del contador
 * @param duration - Duración de la animación en ms (default: 1500)
 * @returns { count, ref } — ref debe asignarse al elemento DOM del contador
 */
export function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}
