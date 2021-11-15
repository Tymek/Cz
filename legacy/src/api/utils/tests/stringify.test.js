import stringify from '../stringify'

describe('api/utils/stringify', () => {
  it('serializes JSON', () => {
    const input = { a: 1, b: 'test', test: 5.5 }
    return expect(stringify(input)).toEqual(JSON.stringify(input))
  })
  it('serializes curcular structure', () => {
    const input = {
      a: 'foo',
    }
    input.b = input
    return expect(stringify(input)).toMatchSnapshot()
  })
  it('serializes deep curcular structure', () => {
    const input = {
      id: 201,
      box: {
        owner: null,
        key: 'storm',
      },
      lines: [
        'item1',
        23,
      ],
    }

    input.box.input = input
    input.lines.box = input.box

    return expect(stringify(input)).toMatchSnapshot()
  })
})
