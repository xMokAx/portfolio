import { useState, useLayoutEffect } from "react"

let defaultHeight = 700

if (typeof window !== `undefined`) {
  defaultHeight = window.innerHeight
}

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(defaultHeight)

  useLayoutEffect(() => {
    const cb = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener(`resize`, cb)
    return () => window.removeEventListener(`resize`, cb)
  }, [])

  return windowHeight
}
