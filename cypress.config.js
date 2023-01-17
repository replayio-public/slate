const cypressReplay = require('@replayio/cypress')
const { writeFileSync } = require('fs')

module.exports = {
  projectId: 'slate-react',
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config
      cypressReplay.default(on, config)

      on('after:run', afterRun => {
        const data = JSON.stringify(afterRun.totalDuration)
        const filename = 'duration.json'
        writeFileSync(filename, data)
        // console.log('cypress-json-results: wrote results to %s', filename)
      })

      return config
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
}
