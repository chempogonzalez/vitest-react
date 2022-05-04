// @ts-check
const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')
const { cwd } = require('process')

const { name: linterPackageName } = require('../package.json')
const { exitExecutionWithSuccess } = require('./helpers/cli')
const { writeFile } = require('./helpers/file')
const { displayError, log } = require('./helpers/logs')



/* [start] ------------------ CONSTANTS ---------------------------------- */
const STRING_TO_BE_REPLACED = '{{setupFilesPath}}'

const { CI = false, INIT_CWD = cwd() } = process.env

const VITEST_SETUP_PATH = `./node_modules/${linterPackageName}/setup.ts`
/* [end] -------------------- CONSTANTS ---------------------------------- */




/* [start] ------------------ HELPERS ---------------------------------- */
async function findViteConfigFile (projectCWD) {
  const viteConfigFile = await fg('{vite,vitest}.config.ts', {
    cwd: projectCWD,
  })

  if (!viteConfigFile.length) return null

  const viteConfigPath = path.join(projectCWD, viteConfigFile[0])
  return viteConfigPath
}


async function writeVitestConfigFile () {
  const viteConfigFile = await fs.readFile(path.resolve('./config/vitest.config.ts'), 'utf-8')
  const viteConfigFileContent = viteConfigFile.replace(STRING_TO_BE_REPLACED, VITEST_SETUP_PATH)

  const filePathToWrite = path.join(INIT_CWD, 'vitest.config.ts')
  return writeFile(filePathToWrite, viteConfigFileContent)
}
/* [end] -------------------- HELPERS ---------------------------------- */




;(async () => {
  try {
    if (CI) {
      log(`Skipping ${linterPackageName} postinstall due to CI env was detected`)
      exitExecutionWithSuccess()
    }



    const PROJECT_PACKAGE_PATH = path.resolve(INIT_CWD, 'package.json')


    // Get the project's package.json
    const packageJSON = require(PROJECT_PACKAGE_PATH)

    // Extract the fields we want to compare
    const { name } = packageJSON

    // If actual package is the same, avoid the operation (useful when linking the package)
    if (name === linterPackageName) exitExecutionWithSuccess()

    const configFilePath = await findViteConfigFile(INIT_CWD)
    if (!configFilePath) {
      await writeVitestConfigFile()
      exitExecutionWithSuccess()
    }

    // TODO - check if the config file already exists

    log(`✅ Added ${linterPackageName} config successfully!`)
    exitExecutionWithSuccess()
  } catch (e) {
    displayError(`${linterPackageName} couldn't add the vitest config. ${JSON.stringify(e)}, ${INIT_CWD}`)
  }
})()
