import { useEffect, useState } from 'react'

function useWindowSize() {
  const [size, setSize] = useState<any>([])
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
export default useWindowSize
