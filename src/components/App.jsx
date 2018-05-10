import Prefixer from 'inline-style-prefixer'

import { PersonalInfoForm, BankAccountForm } from '../containers/LocalStorageForm'
import TabNavigator from './TabNavigator'

const prefixer = new Prefixer()

const tabs = [{
  name: 'Personal Info',
  content: PersonalInfoForm,
}, {
  name: 'Bank Account',
  content: BankAccountForm,
}]

const styles = prefixer.prefix({
  header: {
    width: '100%',
    height: '90px',
    backgroundColor: '#d5d5d5',
    marginBottom: '8px',
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { textAlign: 'center' },
})

const Header = () => <div style={styles.header}>Vue with JSX</div>

export default {
  name: 'App',
  render() {
    return (
      <div style={styles.container}>
        <Header />
        <TabNavigator tabs={tabs} />
      </div>
    )
  },
}
