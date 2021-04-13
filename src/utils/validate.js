/**
 * Created by PanJiaChen on 16/11/18.
 */

const baseURL = 'https://dominikcloud.ltd'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function getlocalPath(path) {
  return `${baseURL}${path}`
}