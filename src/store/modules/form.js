import { sleep } from '../../helpers'

/* eslint-disable no-param-reassign */
const localStorageAvailable = () => typeof localStorage !== 'undefined'

const buildState = id => ({
  id,
  values: {},
  dirty: false,
  uploading: false,
})

/**
 * @param {String} id
 */
export default (id) => {
  const ID = id.toUpperCase()
  return {
    state: buildState(id),
    mutations: {
      [`SET_FORM_${ID}_DATA`](state, { values, dirty }) {
        state.values = values
        state.dirty = dirty

        if (localStorageAvailable()) {
          localStorage.setItem(id, JSON.stringify({ values, dirty }))
        }
      },
      [`SET_FORM_${ID}_UPLOADING`](state, uploading = true) { state.uploading = uploading },
      [`RESET_FORM_${ID}`](state) {
        state.values = {}
        state.dirty = false

        if (localStorageAvailable()) localStorage.removeItem(id)
      },
    },
    actions: {
      [`loadForm${id}`]({ commit }) {
        if (!localStorageAvailable()) return
        const data = localStorage.getItem(id)
        if (!data) return

        commit(`SET_FORM_${ID}_DATA`, JSON.parse(data))
      },
      async [`uploadForm${id}`]({ commit, state }) {
        commit(`SET_FORM_${ID}_UPLOADING`, true)
        console.log(`sending from ${id}`, state.values)
        await sleep(1500)
        commit(`SET_FORM_${ID}_UPLOADING`, false)
      },
    },
  }
}
