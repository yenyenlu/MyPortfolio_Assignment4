import { useEffect, useRef } from 'react'

export default function BackgroundAudio(){
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.volume = 0.15
  }, [])
  return <audio ref={ref} src="/assets/bg-music.mp3" controls loop className="audio-widget" />
}