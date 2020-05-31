import { realpathSync } from 'fs'
import { resolve } from 'path'

const resolvePath = (...args) => resolve(
  realpathSync(process.cwd()), // eslint-disable-line security/detect-non-literal-fs-filename
  ...args,
)

export default resolvePath
