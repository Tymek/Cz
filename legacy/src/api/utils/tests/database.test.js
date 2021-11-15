import fs from 'fs'
import { identity } from 'ramda'

import createDatabase, { reset } from '../database'

const restoreFS = (() => {
  const {
    existsSync,
    writeFileSync,
  } = fs

  return () => {
    fs.existsSync = existsSync
    fs.writeFileSync = writeFileSync
  }
})()

afterEach(reset)

describe('server/utils/db', () => {
  it('create new database file', () => {
    let output

    fs.existsSync = jest.fn().mockReturnValue(false)
    fs.writeFileSync = jest.fn()
      .mockImplementation((file, input) => { output = input })

    const db = createDatabase('test')
    db.set('value')

    restoreFS()
    return expect(output).toMatchSnapshot()
  })

  it('reads and writes to and from database', () => {
    fs.writeFileSync = jest.fn().mockImplementation(identity)

    const db = createDatabase('test')
    db.set('value')

    restoreFS()
    return expect(db.get()).toEqual('value')
  })

  it('reads and writes to and from specified path in database', () => {
    fs.writeFileSync = jest.fn().mockImplementation(identity)

    const db = createDatabase('test')
    const path = ['subkey']
    db.set('value', path)

    restoreFS()
    return expect(db.get(path)).toEqual('value')
  })

  it('saves complex path', () => {
    let output
    fs.writeFileSync = jest.fn()
      .mockImplementation((file, input) => { output = input })

    const db = createDatabase('different_test')
    const path = ['path', 'to', 'set']
    db.set({
      value: [],
    }, path)

    restoreFS()
    return expect(output).toMatchSnapshot()
  })
})
