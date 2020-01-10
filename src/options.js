export function collectModuleOptions(element, moduleName) {
  return Object.keys(element.dataset)
    .filter(attribute => attribute.startsWith(`${moduleName}-`))
    .reduce((options, attribute) => {
      let key = attribute.replace(new RegExp(`^${moduleName}-`), '')

      return Object.assign({}, options, {
        [key]: element.getAttribute(attribute)
      })
    }, {})
}
