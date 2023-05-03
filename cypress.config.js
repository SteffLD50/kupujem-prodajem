const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "ckhiqk",
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl: "https://novi.kupujemprodajem.com",
    },
    env: {
        apiUrl: "https://www.kupujemprodajem.com/api/web/v1",
    },
    video: false,
    retries: {
        runMode: 3,
        openMode: 0,
    },
});
