
import Prefixer from 'inline-style-prefixer'
import { mapActions, mapMutations, mapState } from 'vuex'

import form from '../store/modules/form'
import personalInfo from '../constants/forms/personalInfo'
import bankAccount from '../constants/forms/bankAccount'
import { sleep } from '../helpers'

import Button from '../components/Button'
import Spinner from '../components/Spinner'

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

export default function LocalStorageForm({ id, items, upload }) {
  return {
    name: 'Form',

    beforeCreate() { this.$store.registerModule(id, form(id, upload)) },
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
      async onSubmit() {
        const { errors, values } = this
        this.setFormDirty()
        const hasAnError = errors.some(error => error.length > 0)

        if (hasAnError) {
          const firstIndexWithError = errors.findIndex(error => error.length > 0)
          const element = this.$refs[firstIndexWithError]
          if (element.focus) element.focus()
          // TODO focus
          return
        }

        await this.uploadForm(values)
        this.resetForm()
      },
    },

    render() {
      const {
        values,
        dirty,
        errors,
        loading,
        uploading,
      } = this

      if (loading) return <div style={styles.container}> <Spinner /> </div>

      return (
        <div style={styles.container}>
          {items.map(({ component: Input, id: inputId, ...props }, index) => (
            <Input
              {...{
                ref: index,
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
            {uploading
              ? <Spinner />
              : <Button onClick={this.onSubmit} text="Submit" />
            }
          </div>
        </div>
      )
    },
  }
}

const upload = id => (values) => {
  console.log('upload', id, values)
  return sleep(1500)
}

/* eslint-disable import/prefer-default-export */
export const PersonalInfoForm = LocalStorageForm({ id: 'personalInfo', items: personalInfo, upload: upload('personalInfo') })
export const BankAccountForm = LocalStorageForm({ id: 'bankAccount', items: bankAccount, upload: upload('bankAccount') })
