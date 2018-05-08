/** @returns {Promise<void>} */
// eslint-disable-next-line import/prefer-default-export
export const sleep = (time = 2000) => new Promise(resolve => setTimeout(resolve, time))
