const { defineConfig } = require("cypress");
const saveCookiesToFile = require("./cypress/tasks/facebookLogin");

module.exports = defineConfig({
    projectId: "ckhiqk",
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
            on("task", {
                "puppeteer:saveCookiesToFile": async () => {
                    const cookies = await saveCookiesToFile();
                    return cookies;
                },
            });
        },
        baseUrl: "https://www.kupujemprodajem.com",
    },
    watchForFileChanges: false,
    env: {
        apiUrl: "https://www.kupujemprodajem.com/api/web/v1",
    },
});
