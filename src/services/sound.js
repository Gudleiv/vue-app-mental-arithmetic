class SoundNumbers {
  constructor(numbers, language) {
    this.numbers = [...new Set(numbers)]
    this.lang = language
    this.sounds = {}
    this.sound = null
    this.preLoadSound(numbers[0])
  }

  getSound(num) {
    // Для повторяющегося числа, иначе число не озвучится
    if (this.sound === this.sounds[num]) return this.sound.cloneNode()
    return this.sounds[num]
  }

  playSound(num, volume = 0.5, playbackRate = 1) {
    this.sound = this.getSound(num)
    this.sound.volume = volume
    this.sound.playbackRate = playbackRate
    this.sound.play()
  }

  preLoadSounds() {
    this.numbers.forEach((num) => {
      const sound = new Audio(getSoundPath(num, this.lang))
      this.sounds[num] = sound
      sound.load()
    })
  }

  preLoadSound(num) {
    const sound = new Audio(getSoundPath(num, this.lang))
    this.sounds[num] = sound
    sound.load()
  }
}

function getSoundPath(num, lang) {
  num = num > 0 ? '+' + String(num) : String(num)
  return `/sounds/${lang}/${num}.mp3`
}

export default SoundNumbers
