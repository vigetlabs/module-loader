/**
 * Collects a hash of all the matching module attributes for an element
 *
 * @param {HTMLElement} element - the element to check
 * @param {string} moduleName - the name of the module to get options for
 * @returns {Object} the collected attributes associated with the given module
 */
export function collectModuleOptions(element, moduleName) {
  return Object.keys(element.dataset)
    .filter(attribute => attribute.startsWith(`${moduleName}`))
    .reduce((options, attribute) => {
      let key = attribute.replace(new RegExp(`^${moduleName}`), '')
      let normalizedKey = key.charAt(0).toLowerCase() + key.slice(1)

      return Object.assign({}, options, {
        [normalizedKey]: element.dataset[attribute]
      })
    }, {})
}
