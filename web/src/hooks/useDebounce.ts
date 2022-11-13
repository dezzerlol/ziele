import { useRef, useCallback } from 'react'

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param func The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */
export default function useDebouncedCallback<T extends (...args: any) => ReturnType<T>>(func: T, wait: number) {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout: { current: NodeJS.Timeout | null } = useRef(null)

  return useCallback(
    (...args: any) => {
      const later = () => {
        clearTimeout(timeout.current as NodeJS.Timeout)
        func(...args)
      }

      clearTimeout(timeout.current as NodeJS.Timeout)
      timeout.current = setTimeout(later, wait)
    },
    [func, wait]
  )
}
