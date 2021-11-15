import crypto from 'crypto'

const randomToken = async (length = 20) => new Promise((resolve, reject) => {
  crypto.randomBytes(length, (err, buffer) => {
    if (err) {
      reject(err)
    }
    const token = buffer.toString('hex')
    resolve(token)
  })
})

export default randomToken
