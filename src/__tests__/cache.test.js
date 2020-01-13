import { cache, dispose, hasInstance } from '../cache'

describe('cache', () => {
  it('stores a map of module names to instance per element key', () => {
    let element = document.createElement('div')
    let moduleInstance = {}

    document.body.appendChild(element)

    expect(hasInstance(element, 'test')).toBe(false)

    cache(element, 'test', moduleInstance)

    expect(hasInstance(element, 'test')).toBe(moduleInstance)
  })

  it("can remove an associated module from an element's cached module map", () => {
    let element = document.createElement('div')
    let moduleInstance = {}

    document.body.appendChild(element)

    cache(element, 'test', moduleInstance)

    dispose(element, 'test')

    expect(hasInstance(element, 'test')).toBe(false)
  })
})
