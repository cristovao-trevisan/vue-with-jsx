export const exists = (value) => {
  if (value === undefined
    || value === null
    || value === '') return 'Required'
  return null
}

export const hasType = type => (value) => {
  // eslint-disable-next-line valid-typeof
  if (typeof value === type) return null
  if (!value) return null
  return 'Invalid type'
}

export const isInstanceOf = instance => (value) => {
  // eslint-disable-next-line valid-typeof
  if (value instanceof instance) return null
  return 'Invalid type'
}

export const minimalLength = length => (str) => {
  if (str && str.length < length) return `At least ${length} characters`
  return null
}

export const isDate = date => (/\d{2}\/\d{2}\/\d{4}/.test(date) ? null : 'Invalid date (MM/DD/YYYY)')
