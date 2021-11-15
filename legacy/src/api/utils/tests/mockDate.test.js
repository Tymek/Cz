import mockDate from 'mockdate'

const start = 1541149200

beforeAll(() => {
  mockDate.set(start, 60)
})

afterAll(() => {
  mockDate.reset()
})

test('mock date', () => expect(Date.now()).toEqual(start))

export default start
