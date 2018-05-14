import personalInfo from '../constants/forms/personalInfo'
import bankAccount from '../constants/forms/bankAccount'
import { sleep } from '../helpers'

import LocalStorageForm from '../containers/LocalStorageForm'

const upload = id => (values) => {
  console.log('upload', id, values)
  return sleep(1500)
}

export const PersonalInfoForm = LocalStorageForm({ id: 'personalInfo', items: personalInfo, upload: upload('personalInfo') })
export const BankAccountForm = LocalStorageForm({ id: 'bankAccount', items: bankAccount, upload: upload('bankAccount') })


export default [{
  name: 'Personal Info',
  content: PersonalInfoForm,
}, {
  name: 'Bank Account',
  content: BankAccountForm,
}]
