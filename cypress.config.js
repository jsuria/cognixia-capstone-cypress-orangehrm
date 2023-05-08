const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/scenarios/**/*.cy.{js,jsx,ts,tsx}"
  },

  "reporter": "cypress-mochawesome-reporter",
  "reporterOptions": {
    "reportDir": "cypress/reports",
    "reportFilename":"mochaTestRun",
    "charts": true,
    "reportPageTitle": "Mocha Test Suite",
    "html": true,
    "embeddedScreenshots": true,
    "inlineAssets": true
  },
});
