let moduleConfiguration = {
  directory: 'modules',
  moduleMap: {}
}

export function getModules() {
  return moduleConfiguration.moduleMap
}

export function registerModules(modules) {
  moduleConfiguration.moduleMap = Object.assign({}, moduleMap, modules)
}

export function configureModules(config) {
  moduleConfiguration = Object.assign({}, moduleConfiguration, config)
}

export function loadModule(moduleName) {
  if (moduleName in moduleConfiguration.moduleMap) {
    return Promise.resolve(moduleConfiguration.moduleMap[moduleName])
  }

  return import(`./${moduleConfiguration.directory}/${moduleName}`)
}
