export const numerical = (value) => {
  const parsed = Number(String(value).replace(/[^\-.0-9]/g, ''))
  if (Number.isNaN(parsed)) return 0
  return parsed
}

export const date = value => String(value)
  .replace(/[^0-9]/g, '') // remove non number characters
  .split('')
  .slice(0, 8) // remove extra characters
  .reduce(
    (acc, v, i) =>
      acc // current
      + ((i === 2 || i === 4) ? '/' : '') // add "/" (10112010 -> 10/11/2010)
      + v, // add char
    '',
  )
