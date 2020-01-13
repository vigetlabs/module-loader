/**
 * Returns all module elements based on the module loader config rules
 *
 * @param {Config} config - the module loader configuration
 * @returns {HTMLElement[]}
 */
export function collectElements(config) {
  let { scope, moduleAttribute } = config
  let elements = scope.querySelectorAll(`[${moduleAttribute}]`)

  return Array.prototype.slice.call(elements).filter(isValidTarget(config))
}

/**
 * Returns a list of all the modules to initialize for an element
 *
 * @param {HTMLElement} element - the element to match modules for
 * @param {Config} config - the module loader configuration
 * @returns {string[]} a list string module names
 */
export function modulesForElement(
  element,
  { modules, moduleAttribute, delimiter }
) {
  return element
    .getAttribute(moduleAttribute)
    .split(delimiter)
    .filter(moduleName =>
      modules.length ? modules.includes(moduleName) : true
    )
}

/**
 * Tests whether an element is a valid target for initialization
 *
 * @param {Config} config - the module loader configuration
 */
export function isValidTarget({ modules, moduleAttribute }) {
  return element => {
    let associatedModules = element.getAttribute(moduleAttribute)

    if (associatedModules && modules.length) {
      return modules.some(moduleName => {
        return associatedModules.includes(moduleName)
      })
    }

    return true
  }
}
