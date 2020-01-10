let instanceMap = new WeakMap()

export function hasInstance(element, moduleName) {
  return instanceMap.has(element) && instanceMap.get(element)[moduleName]
}

export function cache(element, moduleName, instance) {
  return instanceMap.set(
    element,
    Object.assign({}, instanceMap.get(element), { [moduleName]: instance })
  )
}

export function dispose(element, moduleName) {
  if (instanceMap.has(element)) {
    let instances = instanceMap.get(element)

    delete instances[moduleName]

    if (Object.keys(instances).length === 0) {
      instanceMap.delete(element)
    }
  }
}
