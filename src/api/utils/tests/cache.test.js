import { always, identity, type } from 'ramda'
import cached from '../cached'

describe('api/utils/cache', () => {
  it('returns function', async () => {
    const f = cached(identity)
    return expect(type(f)).toEqual('Function')
  })

  it('creates new cache', async () => {
    const f = cached(always(true))
    const output = await f()
    return expect(output).toEqual(true)
  })

  it('calls function once', async () => {
    const f = jest.fn()
    const fc = cached(f)
    await fc()
    await fc()
    expect(f).toBeCalledTimes(1)
  })

  it('does not cache without delay', async () => {
    const f = jest.fn()
    const fc = cached(f, 0)
    await fc()
    await fc()
    expect(f).toBeCalledTimes(2)
  })

  it('does not cache after delay', async () => {
    const f = jest.fn()
    const fc = cached(f, 100)
    await fc()
    return new Promise(resolve => {
      setTimeout(async () => {
        await fc()
        resolve(expect(f).toBeCalledTimes(2))
      }, 200)
    })
  })

  it('does long cache by default', async () => {
    const fc = cached(identity)
    await fc(true)
    return new Promise(resolve => {
      setTimeout(async () => {
        resolve(expect(await fc(false)).toEqual(true))
      }, 500)
    })
  })
})
