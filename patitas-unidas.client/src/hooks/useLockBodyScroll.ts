import { useEffect } from "react"

/**
 * Hook to control body scroll lock.
 * @param lock - When true, prevents body scrolling. When false, restores original state.
 */
export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow || "auto"
    
    if (lock) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [lock])
}
