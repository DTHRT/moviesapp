export default function textShorter(text) {
  const maxLength = 150

  if (text.length <= maxLength) {
    return text
  }

  const shortenedText = text.slice(0, maxLength)
  const lastSpaceIndex = shortenedText.lastIndexOf(' ')

  if (lastSpaceIndex !== -1) {
    return `${shortenedText.slice(0, lastSpaceIndex)}...`
  }

  return `${shortenedText}...`
}
