const input = `
color:#000000;
background-color:#FFFFFF;
}
`


const inputLines = input.split(';')

const result = []
inputLines.forEach((line) => {
  let [name, value] = line.split(':')
  if (!name || !value) return

  for (let j = 0; j < name.length; j += 1) {
    if (name[j] === '-') {
      name = name.slice(0, j) + name[j+1].toUpperCase() + name.slice(j + 2)
      j -= 1
    }
  }
  value = value.trim()
  if (value !== '0') value = `'${value}'`
  result.push(`${name}: ${value}`)
})

console.log(result.join(','))
