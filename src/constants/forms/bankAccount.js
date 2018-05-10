import TextInput from '../../components/inputs/TextInput'
import { exists, hasType, minimalLength } from '../../helpers/validators'
import { numerical } from '../../helpers/formatters'

export default [{
  component: TextInput,
  id: 'number',
  validators: [exists, hasType('string'), minimalLength(2)],
  label: 'Account Number',
}, {
  component: TextInput,
  id: 'balance',
  validators: [hasType('number'), minimalLength(2)],
  label: 'Balance',
  formatter: numerical,
}]
