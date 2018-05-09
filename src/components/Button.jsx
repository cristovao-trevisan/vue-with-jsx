import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()

const clickedTime = 0.2 // seconds
const styles = prefixer.prefix({
  button: {
    cursor: 'pointer',
    display: 'inline-block',
    padding: '0.35em 1.2em',
    border: '0.1em solid #ccc',
    borderRadius: '0.12em',
    textAlign: 'center',
    transition: `background ${clickedTime / 4}s`,
  },
  hovered: {
    color: 'white',
    backgroundColor: '#ccc',
  },
  clicked: {
    color: 'white',
    backgroundColor: '#000c',
    backgroundSize: '100%',
  },
})

/** @fires click */
export default {
  name: 'Button',
  props: {
    text: { type: String, require: true },
  },
  data: () => ({
    hovered: false,
    clicked: false,
  }),

  methods: {
    onClick() {
      this.clicked = true
      setTimeout(() => { this.clicked = false }, clickedTime * 1000)
      this.$emit('click')
    },
  },
  render() {
    const { text, hovered, clicked } = this
    return (
      <div
        style={[styles.button, hovered && styles.hovered, clicked && styles.clicked]}
        onClick={this.onClick}
        onMouseover={() => { this.hovered = true }}
        onMouseout={() => { this.hovered = false }}
      >
        { text }
      </div>
    )
  },
}
