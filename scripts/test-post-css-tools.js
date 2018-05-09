const Prefixer = require('inline-style-prefixer')

const style = {
  container: {
    transition: '200ms all linear',
    userSelect: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    color: 'blue',
  },
}

console.time('prefix')
const prefixer = new Prefixer()
let prefixedStyle = prefixer.prefix(style)
for (let i = 0; i < 1000; i++) prefixedStyle = prefixer.prefix(style)
console.timeEnd('prefix')

console.log(prefixedStyle)
