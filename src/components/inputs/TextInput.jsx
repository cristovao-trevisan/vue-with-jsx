import Prefixer from 'inline-style-prefixer'

import LabeledContainer from './LabeledContainer'

const prefixer = new Prefixer()

const styles = prefixer.prefix({
  input: {
    flex: 1,
  },
  error: {
    border: '1px solid #f00',
    borderRadius: '2px',
  },
})

let incrementalId = 0
/**
 * @fires change
 * @fires submit
 */
export default {
  name: 'TextInput',
  props: {
    value: { default: '' },
    dirty: { type: Boolean, required: true },
    id: { default: () => incrementalId++ },
    label: { type: String, required: true },
    errors: { type: Array, required: true },
    formatter: { type: Function, default: v => v },
  },

  methods: {
    focus() { this.$refs.input.focus() },
    onInput({ srcElement: { value } }) {
      const { formatter } = this
      const formatedValue = formatter(value)
      this.$emit('change', formatedValue)
      this.$nextTick(() => { this.$refs.input.value = formatedValue })
    },
  },

  render() {
    const {
      value,
      id,
      label,
      dirty,
      errors,
      formatter,
    } = this
    const error = dirty && errors.length > 0 && errors[0]

    return (
      <LabeledContainer
        error={error}
        label={label}
      >
        <input
          ref="input"
          style={[styles.input, error && styles.error]}
          name={id}
          type="text"
          value={value}
          onInput={this.onInput}
          onChange={() => this.$emit('submit', formatter(value))}
        />
      </LabeledContainer>
    )
  },
}
