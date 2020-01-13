import { initialize, registerModules } from '../index'
import { makeTestableModule, appendDiv } from 'test-helpers'

describe('initialize', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('calls the module constructor when intializing modules on a page', async () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    let target = appendDiv({
      'data-module': 'test'
    })

    await initialize()

    expect(stub).toHaveBeenCalledWith(target, {})
  })

  it('can initialize multiple modules per element', async () => {
    let stubFoo = jest.fn()
    let stubBar = jest.fn()

    registerModules({
      foo: makeTestableModule(stubFoo),
      bar: makeTestableModule(stubBar)
    })

    let target = appendDiv({
      'data-module': 'foo bar'
    })

    await initialize()

    expect(stubFoo).toHaveBeenCalledWith(target, {})
    expect(stubBar).toHaveBeenCalledWith(target, {})
  })

  it('allows you to specify a different module name delimiter', async () => {
    let stubFoo = jest.fn()
    let stubBar = jest.fn()

    registerModules({
      foo: makeTestableModule(stubFoo),
      bar: makeTestableModule(stubBar)
    })

    let target = appendDiv({
      'data-module': 'foo, bar'
    })

    await initialize({ delimiter: ', ' })

    expect(stubFoo).toHaveBeenCalledWith(target, {})
    expect(stubBar).toHaveBeenCalledWith(target, {})
  })

  it('allows you to initialize modules within a specific scope', async () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    let parent = appendDiv()

    // test module outside of initialize scope (will not get initialized)
    appendDiv({
      'data-module': 'test'
    })

    let target = appendDiv(
      {
        'data-module': 'test'
      },
      parent
    )

    await initialize({ scope: parent })

    expect(stub).toHaveBeenCalledTimes(1)
    expect(stub).toHaveBeenCalledWith(target, {})
  })

  it('allows you to initialize only a subset of all modules', async () => {
    let stubFoo = jest.fn()
    let stubBar = jest.fn()

    registerModules({
      foo: makeTestableModule(stubFoo),
      bar: makeTestableModule(stubBar)
    })

    let target = appendDiv({
      'data-module': 'foo bar'
    })

    await initialize({ modules: ['foo'] })

    expect(stubFoo).toHaveBeenCalledWith(target, {})
    expect(stubBar).not.toHaveBeenCalled()
  })

  it('can be configured with a different module attribute', async () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    let target = appendDiv({
      'data-component': 'test'
    })

    await initialize({ moduleAttribute: 'data-component' })

    expect(stub).toHaveBeenCalledWith(target, {})
  })

  it('throws an error when a module is initialized multiple times', async () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    let target = appendDiv({
      'data-module': 'test'
    })

    await initialize()

    await expect(initialize()).rejects.toThrow(
      /Multiple instantiation detected/
    )
  })

  it('warns against multiple instantiation', async () => {
    let stub = jest.fn()

    registerModules({
      test: makeTestableModule(stub)
    })

    appendDiv({
      'data-module': 'test'
    })

    await initialize()

    // second call to initialize throws
    await expect(initialize()).rejects.toThrow(
      /Multiple instantiation detected/
    )
  })
})
