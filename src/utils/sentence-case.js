export const sentenceCase = str => {
  const input = str ?? ''

  return input
    .toLowerCase()
    .toString()
    .replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
      return separator + char.toUpperCase()
    })
}
