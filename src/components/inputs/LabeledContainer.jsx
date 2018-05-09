import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()

const styles = prefixer.prefix({
  outerContainer: {
    width: '100%',
    maxWidth: '350px',
  },
  container: {
    minHeight: '28px',
    display: 'flex',
    border: '1px solid #0006',
    borderRadius: '2px',
  },
  label: {
    backgroundColor: '#ccc',
    maxWidth: '30%',
    fontSize: '14px',
    padding: '2px',
    paddingTop: '2px',
  },
  error: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '12px',
    color: '#f22',
  },
})

const Error = ({ props: { err } }) => <div style={styles.error}> { err } </div>
const Label = ({ props: { text } }) => <div style={styles.label}> { text }: </div>

export default {
  name: 'LabeledContainer',
  props: {
    error: { type: [String, Boolean] },
    label: { type: String, required: true },
  },

  render() {
    const {
      label,
      error,
    } = this

    return (
      <div style={styles.outerContainer}>
        <div style={styles.container}>
          <Label text={label} />
          { this.$slots.default }
        </div>
        {error && <Error err={error} />}
      </div>
    )
  },
}
