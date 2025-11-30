import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /**
   * The target number to count up to
   */
  end: number;
  /**
   * The starting number (default: 0)
   */
  start?: number;
  /**
   * Duration of the animation in milliseconds (default: 2000)
   */
  duration?: number;
  /**
   * Delay before starting the animation in milliseconds (default: 0)
   */
  delay?: number;
  /**
   * Prefix to display before the number (e.g., "$")
   */
  prefix?: string;
  /**
   * Suffix to display after the number (e.g., "+", "k")
   */
  suffix?: string;
  /**
   * Decimal places to show (default: 0)
   */
  decimals?: number;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Easing function type
   */
  easing?: "linear" | "easeOut" | "easeInOut";
}

/**
 * CountUp animation component
 * Animates a number from start to end value with customizable options
 */
export default function CountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  easing = "easeOut",
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  useEffect(() => {
    // Set up Intersection Observer to start animation when visible
    if (countRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasStarted) {
              setHasStarted(true);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      observerRef.current.observe(countRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now() + delay;
    let animationFrame: number;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easedProgress = easingFunctions[easing](progress);
        const currentCount = start + (end - start) * easedProgress;
        setCount(currentCount);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, start, end, duration, delay, easing]);

  const formatNumber = (num: number): string => {
    return num.toFixed(decimals);
  };

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
