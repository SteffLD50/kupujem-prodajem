const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "ckhiqk",
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "https://novi.kupujemprodajem.com",
    },
    env: {
        apiUrl: "https://www.kupujemprodajem.com/api/web/v1",
    },
    videoCompression: false,
});
