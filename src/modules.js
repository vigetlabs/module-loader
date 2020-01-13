let moduleConfiguration = {
  directory: 'modules',
  moduleMap: {}
}

export function getModules() {
  return moduleConfiguration.moduleMap
}

export function registerModules(modules) {
  moduleConfiguration.moduleMap = Object.assign(
    {},
    moduleConfiguration.moduleMap,
    modules
  )
}

export function configureModules(config) {
  moduleConfiguration = Object.assign({}, moduleConfiguration, config)
}

export function loadModule(moduleName) {
  if (moduleName in moduleConfiguration.moduleMap) {
    return Promise.resolve(moduleConfiguration.moduleMap[moduleName])
  }

  return import(`./${moduleConfiguration.directory}/${moduleName}`).then(
    Module => {
      moduleMap[moduleName] = Module
      return Module
    }
  )
}
