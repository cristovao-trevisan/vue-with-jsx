import Vue from 'vue'
import Vuex from 'vuex'

import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    formPersonalInfo: form('personalInfo'),
  },
  strict: process.env.NODE_ENV !== 'production',
})
