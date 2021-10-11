import { useCallback, useEffect, useState } from 'react'

interface AudioController {
  isPlaying: boolean
  currentTimeSec: number
  trackDuration: number
  volume: number
  handleRestart: () => void
  handlePlay: () => void
  handlePause: () => void
  handleSkip: (sec: number) => void
  forceSetTime: (time: number) => void
  handleSetVolume: (step: number) => void
}

const INIT_VOLUME = 0.5

export function useAudioController(
  audioElement: HTMLAudioElement | null
): AudioController {
  const [isPlaying, setPlaying] = useState(false)
  const [trackDuration, setTrackDuration] = useState(0)
  const [currentTimeSec, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(INIT_VOLUME)

  useEffect(() => {
    if (audioElement === null) {
      return
    }

    audioElement.volume = INIT_VOLUME

    function handleLoadMetaData(this: HTMLAudioElement): void {
      setTrackDuration(Math.ceil(this.duration))
    }
    function handleTimeUpdate(this: HTMLAudioElement): void {
      setCurrentTime(this.currentTime)
    }

    audioElement.addEventListener('loadedmetadata', handleLoadMetaData)
    audioElement.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadMetaData)
      audioElement.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audioElement])

  const handleRestart = useCallback(() => {
    if (audioElement === null) return
    setCurrentTime(0)
    audioElement.currentTime = 0
    audioElement.play()
    setPlaying(true)
  }, [audioElement])

  const handlePause = useCallback(() => {
    if (audioElement === null) return
    audioElement.pause()
    setPlaying(false)
  }, [audioElement])

  const handlePlay = useCallback(() => {
    if (audioElement === null) return
    audioElement.play()
    setPlaying(true)
  }, [audioElement])

  const handleSkip = useCallback(
    (value: number) => {
      if (audioElement === null) {
        return
      }
      const { currentTime } = audioElement
      if (
        (value > 0 && value + currentTime < trackDuration) ||
        currentTime + value > 0
      ) {
        audioElement.currentTime += value
        setCurrentTime(audioElement.currentTime)
      }
    },
    [audioElement]
  )

  const forceSetTime = useCallback(
    (time: number) => {
      if (audioElement === null) {
        return
      }
      audioElement.currentTime = time
      setCurrentTime(time)
    },
    [audioElement]
  )

  const handleSetVolume = useCallback(
    (step: number) => {
      if (audioElement === null) {
        return
      }
      const nextValue = audioElement.volume + step
      if (nextValue >= 0 && nextValue <= 1) {
        audioElement.volume = +nextValue.toFixed(2)
        setVolume(audioElement.volume)
      }
    },
    [audioElement]
  )

  return {
    currentTimeSec,
    trackDuration,
    isPlaying,
    volume,
    handlePlay,
    handlePause,
    handleRestart,
    handleSetVolume,
    forceSetTime,
    handleSkip,
  }
}
