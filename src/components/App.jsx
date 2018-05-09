import { PersonalInfoForm, BankAccountForm } from '../containers/LocalStorageForm'
import TabNavigator from './TabNavigator'

const tabs = [{
  name: 'Personal Info',
  content: PersonalInfoForm,
}, {
  name: 'Bank Account',
  content: BankAccountForm,
}]

export default {
  name: 'App',
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Vue with JSX</h1>
        <TabNavigator tabs={tabs} />
      </div>
    )
  },
}
