let instanceMap = new WeakMap()

/**
 * Checks whether the given element has an associated instance of the module
 *
 * @param {HTMLElement} element - the element to check
 * @param {string} moduleName - the name of the module to check
 * @returns {Object}
 */
export function hasInstance(element, moduleName) {
  return instanceMap.has(element) && instanceMap.get(element)[moduleName]
}

/**
 * Stores an instance of a module to the cache by the element key
 *
 * @param {HTMLElement} element - the element associated with the module instance
 * @param {string} moduleName - the name of the associated module
 * @param {Object} instance - the instance of the specified module
 * @returns {WeakMap}
 */
export function cache(element, moduleName, instance) {
  return instanceMap.set(
    element,
    Object.assign({}, instanceMap.get(element), { [moduleName]: instance })
  )
}

/**
 * Clears out the specified module instance from the cache for a given element
 *
 * @param {HTMLElement} element - the element to dispose an instance of a module for
 * @param {string} moduleName - the name of the module to dispose of
 */
export function dispose(element, moduleName) {
  if (instanceMap.has(element)) {
    let instances = instanceMap.get(element)

    delete instances[moduleName]

    if (Object.keys(instances).length === 0) {
      instanceMap.delete(element)
    }
  }
}
