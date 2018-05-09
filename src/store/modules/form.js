import { sleep } from '../../helpers'

/* eslint-disable no-param-reassign */
const localStorageAvailable = () => typeof localStorage !== 'undefined'

const buildState = id => ({
  id,
  values: {},
  dirty: false,
  loading: false,
  uploading: false,
})

/**
 * @param {String} id
 */
export default id => ({
  namespaced: true,
  state: buildState(id),
  mutations: {
    SET_FORM_DATA(state, values = {}) {
      state.values = JSON.parse(JSON.stringify(values))

      if (localStorageAvailable()) {
        localStorage.setItem(id, JSON.stringify(values))
      }
    },
    SET_FORM_DIRTY(state, dirty = true) { state.dirty = dirty },
    SET_FORM_LOADING(state, loading = true) { state.loading = loading },
    SET_FORM_UPLOADING(state, uploading = true) { state.uploading = uploading },
    RESET_FORM(state) {
      state.values = {}
      state.dirty = false

      if (localStorageAvailable()) localStorage.removeItem(id)
    },
  },
  actions: {
    loadForm({ commit }) {
      if (!localStorageAvailable()) return

      commit('SET_FORM_UPLOADING', true)
      const data = localStorage.getItem(id)
      commit('SET_FORM_UPLOADING', false)

      if (!data) return
      try {
        commit('SET_FORM_DATA', JSON.parse(data))
      } catch (err) {
        console.error('error loading form from local storage', id, err)
        localStorage.removeItem(id)
      }
    },
    async uploadForm({ commit, state }) {
      commit('SET_FORM_UPLOADING', true)
      console.log(`sending from ${id}`, state.values)
      await sleep(1500)
      commit('SET_FORM_UPLOADING', false)
    },
  },
})
