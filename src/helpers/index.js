exports.slugify = (string) => {
  return string.toLowerCase().replace(/ /g, '-')
}