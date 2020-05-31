import rotate from '../rotate'

describe('api/utils/rotate', () => {
  it('appends array', () => {
    expect(rotate(10, [1, 2], 3)).toEqual([1, 2, 3])
  })

  it('appends and clips array', () => {
    expect(rotate(3, [1, 2, 3], 4)).toEqual([2, 3, 4])
  })

  it('appends empty array', () => {
    expect(rotate(3, [], 4)).toEqual([4])
  })
})
