import Prefixer from 'inline-style-prefixer'

import Button from './Button'

const prefixer = new Prefixer()
const styles = prefixer.prefix({
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '1px',
    borderBottom: '2px solid #ccc',
    marginBottom: '2px',
  },
  tabSelected: {
    background: 'lightblue',
  },
})

const Tab = ({ props: { name, selected = false }, listeners: { click } }) => (
  <div style={selected && styles.tabSelected}>
    <Button text={name} onClick={click} />
  </div>
)

export default {
  name: 'TabNavigator',
  props: {
    tabs: { type: Array, require: true },
  },
  data() {
    return {
      activeTab: this.tabs[0],
    }
  },
  render() {
    const {
      tabs,
      activeTab,
    } = this
    return (
      <div>
        <div style={styles.tabsContainer}>
          {tabs.map(tab => (
            <Tab
              name={tab.name}
              selected={activeTab === tab}
              onClick={() => { this.activeTab = tab }}
            />
          ))}
        </div>
        <activeTab.content />
      </div>
    )
  },
}
