import { initialize, registerModules } from '../index'
import { makeTestableModule, appendDiv } from 'test-helpers'

describe('options', () => {
  it('automatically collects module options specified as data attributes that match the module name', async () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    let target = appendDiv({
      'data-module': 'test',
      'data-test-flavor': 'strawberry',
      'data-test-quantity': 'lots',
      'data-unrelated': 'unimportant'
    })

    await initialize()

    expect(stub).toHaveBeenCalledWith(target, {
      flavor: 'strawberry',
      quantity: 'lots'
    })
  })
})
