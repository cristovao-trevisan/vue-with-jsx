
import { mapActions, mapMutations, mapState } from 'vuex'
import Prefixer from 'inline-style-prefixer'

import form from '../store/modules/form'
import personalInfo from '../constants/forms/personalInfo'
import backAccount from '../constants/forms/backAccount'

import Button from '../components/Button'

const prefixer = new Prefixer()

const styles = prefixer.prefix({
  container: {
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputs: { marginTop: '4px' },
  button: { marginTop: '8px' },
})

export default function LocalStorageForm({ id, items }) {
  return {
    name: 'Form',

    beforeCreate() { this.$store.registerModule(id, form(id)) },
    created() { this.loadForm() },

    computed: {
      ...mapState({
        values: state => state[id].values,
        dirty: state => state[id].dirty,
        loading: state => state[id].loading,
        uploading: state => state[id].uploading,
      }),
      errors() {
        const { values } = this
        return items.map(({ id: inputId, validators = [] }) => validators
          .map(validate => validate(values[inputId]))
          .filter(error => !!error))
      },
    },

    methods: {
      ...mapMutations(id, {
        setFormData: 'SET_FORM_DATA',
        setFormDirty: 'SET_FORM_DIRTY',
        resetForm: 'RESET_FORM',
      }),
      ...mapActions(id, {
        uploadForm: 'uploadForm',
        loadForm: 'loadForm',
      }),
      onChange(inputId, value) {
        this.setFormData({
          ...this.values,
          [inputId]: value,
        })
      },
      onSubmit() {
        const { errors, values } = this
        this.setFormDirty()
        const hasAnError = errors.some(error => error.length > 0)

        if (hasAnError) {
          console.log('error found', this.id, errors)
          // TODO focus
          return
        }

        console.log('submit', values)
        this.resetForm()
      },
    },

    render() {
      const {
        values,
        dirty,
        errors,
      } = this

      return (
        <div style={styles.container}>
          {items.map(({ component: Input, id: inputId, ...props }, index) => (
            <Input
              {...{
                props: {
                  ...props, // entire props object as props
                  id: inputId,
                  dirty, // ... extra props
                  value: values[inputId],
                  errors: errors[index],
                },
                on: {
                  change: value => this.onChange(inputId, value),
                },
                style: styles.inputs,
              }}
            />
          ))}
          <div style={styles.button}>
            <Button onClick={this.onSubmit} text="Submit" />
          </div>
        </div>
      )
    },
  }
}

/* eslint-disable import/prefer-default-export */
export const PersonalInfoForm = LocalStorageForm({ id: 'personalInfo', items: personalInfo })
export const BankAccountForm = LocalStorageForm({ id: 'backAccount', items: backAccount })
