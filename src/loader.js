import { defaultConfig } from './config'
import { hasInstance, cache } from './cache'
import { collectModuleOptions } from './options'
import { loadModule } from './modules'
import { modulesForElement, collectElements } from './elements'

export function initialize(userConfig, modules = []) {
  let config = Object.assign({ modules }, defaultConfig, userConfig)
  let elements = collectElements(config)

  elements.forEach(element => {
    let moduleNames = modulesForElement(element, config)

    moduleNames.forEach(moduleName =>
      initializeModule(element, moduleName, config)
    )
  })
}

function initializeModule(element, moduleName, { moduleAttribute }) {
  return loadModule(moduleName)
    .then(Module => {
      // ensure element hasn't already been initialized for this module
      if (hasInstance(element, moduleName)) {
        // TODO: better error message
        throw new Error(
          `Multiple instantiation detected. This element already has an instance of ` +
            `"${moduleName}" associated with it but you're trying to reinitialize it`
        )
      }

      // collect all data-* attributes and store them in a hash of options
      let options = collectModuleOptions(element, moduleName)
      let instance = new Module(element, options)

      // cache the element instance for the element/module combo
      cache(element, moduleName, instance)
    })
    .catch(error => {
      // TODO: better error message
      throw new Error(
        `Cannot construct module "${moduleName}", it has not been registered. ` +
          `Check that the attribute "${moduleAttribute}" exists and that its value ` +
          `matches a registered name in the ModuleBootstrapper module map.`
      )
    })
}
