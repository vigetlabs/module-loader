export function collectElements(config) {
  let { scope, moduleAttribute } = config

  return [...scope.querySelectorAll(`[${moduleAttribute}]`)].filter(
    isValidTarget(config)
  )
}

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
