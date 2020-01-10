import { initialize, registerModules } from ''

function makeTestableModule(callback) {
  return class TestableModule {
    constructor(element, options) {
      callback(element, options)
    }
  }
}

describe('', () => {
  it('calls the module constructor when intializing modules on a page', () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    let target = document.createElement('div')
    target.setAttribute('data-module', 'test')

    initialize()

    assert(stub).calledWith(target, {})
  })
})
