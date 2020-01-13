export function makeTestableModule(callback) {
  return class TestableModule {
    constructor(element, options) {
      callback(element, options)
    }
  }
}
export function resetDocument() {
  document.body.innerHTML = ''
}

export function appendDiv(attributes, container = document) {
  let element = document.createElement('div')

  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute])
  }

  if (container == document) {
    document.body.appendChild(element)
  } else {
    container.appendChild(element)
  }

  return element
}
