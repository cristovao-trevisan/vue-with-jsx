import Vue from 'vue'
import App from './components/App'

import store from './store'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  render: h => ( // eslint-disable-line no-unused-vars
    <div>
      <App />
    </div>
  ),
})
