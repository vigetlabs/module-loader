import { defaultConfig } from './config'
import { hasInstance, cache } from './cache'
import { collectModuleOptions } from './options'
import { loadModule } from './modules'
import { modulesForElement, collectElements } from './elements'

/**
 * Initializes registered modules
 *
 * @param {Config} userConfig - user specified config options (merged into defaults)
 * @param {string[]} [modules=[]] - modules to instantiate
 * @returns {Promise} whether all of the modules were successfully initialized
 */
export function initialize(userConfig, modules = []) {
  let config = Object.assign({ modules }, defaultConfig, userConfig)
  let elements = collectElements(config)

  return Promise.all(
    elements.map(element => {
      let moduleNames = modulesForElement(element, config)

      return Promise.all(
        moduleNames.map(moduleName =>
          initializeModule(element, moduleName, config)
        )
      )
    })
  )
}

/**
 * Initializes a single module for an element
 *
 * @param {HTMLElement} element - the element to initialize the module for
 * @param {string} moduleName - the name of the module to initialize
 * @param {Config} config - the module-loader configuration
 * @throws {Error}
 * @returns {Promise} whether the module was successfully loaded and initialized
 */
function initializeModule(
  element,
  moduleName,
  { warnOnModuleNotFound, warnOnMultipleInstantiation, moduleAttribute }
) {
  if (hasInstance(element, moduleName)) {
    let message =
      `Multiple instantiation detected. This element already has an instance of ` +
      `"${moduleName}" associated with it but you're trying to reinitialize it`

    if (warnOnMultipleInstantiation) {
      console.log(message)
      return Promise.resolve()
    } else {
      return Promise.reject(new Error(message))
    }
  }

  return loadModule(moduleName)
    .then(Module => {
      let options = collectModuleOptions(element, moduleName)
      let instance = new Module(element, options)

      cache(element, moduleName, instance)
    })
    .catch(() => {
      let message =
        `Cannot construct module "${moduleName}", it has not been registered. ` +
        `Check that the attribute "${moduleAttribute}" exists and that its value ` +
        `matches a registered name in the ModuleBootstrapper module map.`

      if (warnOnModuleNotFound) {
        console.log(message)
      } else {
        throw new Error(message)
      }
    })
}
