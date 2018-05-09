import { exists, hasType, minimalLength, isDate } from '../../helpers/validators'
import { date } from '../../helpers/formatters'

import TextInput from '../../components/inputs/TextInput'
import Radio from '../../components/inputs/Radio'

const genderItems = [{
  value: 'male',
  label: 'Male',
}, {
  value: 'female',
  label: 'Female',
}]

export default [{
  component: TextInput,
  id: 'name',
  validators: [exists, hasType('string'), minimalLength(2)],
  label: 'Full Name',
}, {
  component: Radio,
  items: genderItems,
  validators: [exists],
  id: 'gender',
  label: 'Gender',
}, {
  component: TextInput,
  id: 'birth',
  validators: [isDate],
  label: 'Birth Date',
  formatter: date,
}]
