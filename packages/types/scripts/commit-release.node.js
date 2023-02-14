const { promisify } = require('node:util')
const { exec: execCb } = require('node:child_process')
const exec = promisify(execCb)

const pkgJson = require('../package.json')
const { version } = pkgJson

async function main() {
  const { stdout, stderr } = await exec(`git add package.json && git commit -m "release(types): ${version}" && git tag ${version}`)
  const [trimmedOut, trimmedErr] = [stdout?.trim?.(), stderr?.trim?.()]
  if (trimmedOut) console.log(`stdout:\n${trimmedOut}`)
  if (trimmedErr) throw new Error(trimmedErr)
}

main()