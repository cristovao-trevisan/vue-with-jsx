import Prefixer from 'inline-style-prefixer'

import LabeledContainer from './LabeledContainer'

const prefixer = new Prefixer()

const styles = prefixer.prefix({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  itemContainer: {
    cursor: 'pointer',
    display: 'flex',
  },
  error: {
    border: '1px solid #f00',
    borderRadius: '2px',
  },
  box: {
    width: '14px',
    height: '14px',
    border: '2px solid #ccc',
    borderRadius: '2px',
    marginRight: '2px',
  },
  selected: {
    position: 'relative',
    fontSize: '20px',
    border: '2px solid #00c4ff',
  },
  check: {
    position: 'absolute',
    top: '-11px',
    left: '-5px',
    fontSize: '32px',
  },
})

const RadioItem = ({ props: { selected = false, label }, listeners: { click } }) => (
  <div style={styles.itemContainer} onClick={click}>
    <div style={[styles.box, selected && styles.selected]}>
      {selected && (
        <div style={styles.check}> { '✓' } </div>
      )}
    </div>
    <div> { label } </div>
  </div>
)

/**
 * @fires change
 * @fires submit
 */
export default {
  name: 'Radio',
  props: {
    value: { default: '' },
    label: { type: String, required: true },
    errors: { type: Array, required: true },
    dirty: { type: Boolean, required: true },
    items: { type: Array, required: true },
    id: { type: String, required: true },
  },

  methods: {
    onInput(value) {
      this.$emit('change', value)
    },
  },

  render() {
    const {
      value: selectedValue,
      label: globalLabel,
      dirty,
      errors,
      items,
    } = this
    const error = dirty && errors.length > 0 && errors[0]

    return (
      <LabeledContainer
        error={error}
        label={globalLabel}
      >
        <div style={[styles.container, error && styles.error]}>
          {items.map(({ label, value }) => (
            <RadioItem
              onClick={this.onInput.bind(this, value)} // eslint-disable-line
              label={label}
              value={value}
              selected={selectedValue === value}
            />
          ))}
        </div>
      </LabeledContainer>
    )
  },
}
