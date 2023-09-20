export default function textShorter(text) {
  return text.length > 204 ? `${text.slice(0, 204 - 3)}...` : text
}
