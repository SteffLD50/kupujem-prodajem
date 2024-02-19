require("dotenv").config();
const puppeteer = require("puppeteer");
const fse = require("fs-extra");

const saveCookiesToFile = async () => {
    const EMAIL = process.env.FB_EMAIL;
    const PASSWORD = process.env.FB_PASSWORD;
    const cookies = "./cypress/fixtures/cookies.json";
    const cookiesExist = await fse.pathExists(cookies);

    if (!cookiesExist) {
        await puppeteer.launch({ headless: false }).then(async (browser) => {
            try {
                const page = await browser.newPage();
                await page.setViewport({ width: 1000, height: 500 });
                await page.goto("https://novi.kupujemprodajem.com/login", {
                    waitUntil: "networkidle0",
                });

                const loginViaFbBtn = ".facebook";
                await Promise.all([
                    await page.waitForSelector(loginViaFbBtn, {
                        visible: true,
                    }),
                    await page.click(loginViaFbBtn),
                    await new Promise((resolve) => setTimeout(resolve, 5000)),
                ]);

                const newWindow = await browser.waitForTarget((target) =>
                    target.url().includes("www.facebook.com/login.php")
                );
                const popUp = await newWindow.page();

                const emailInput = 'input[id="email"]';
                await popUp.waitForSelector(emailInput, {
                    visible: true,
                });
                await popUp.click(emailInput);
                await popUp.type(emailInput, EMAIL);

                const passwordInput = 'input[type="password"]';
                await popUp.waitForSelector(passwordInput, {
                    visible: true,
                });
                await popUp.click(passwordInput);
                await popUp.type(passwordInput, PASSWORD);

                const submitBtn = 'button[type="submit"]';
                await Promise.all([
                    popUp.waitForNavigation(),
                    popUp.click(submitBtn),
                ]);

                if ((await popUp.$('div[aria-label^="Continue"]')) !== null) {
                    const continueAsBtn = 'div[aria-label^="Continue"]';
                    await popUp.waitForSelector(continueAsBtn, {
                        visible: true,
                    });
                    await Promise.all([
                        popUp.waitForNavigation(),
                        popUp.click(continueAsBtn),
                        new Promise((resolve) => setTimeout(resolve, 10000)),
                    ]);
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }

                // Use this to include Third-Party Cookies:
                // const client = await page.createCDPSession();
                // const allCookies = (await client.send("Network.getAllCookies"))
                //     .cookies;

                const allCookies = await page.cookies();
                await fse.writeJSON(cookies, allCookies);

                browser.close();
            } catch (error) {
                console.error(error);
                browser.close();
            }
        });
    }

    const currentCookies = await fse.readJSON(cookies);
    const today = new Date();
    const expiryDate = new Date(currentCookies.expires * 1000);

    if (today > expiryDate) {
        await fse.remove(cookies);
        await saveCookiesToFile();
    }

    return cookiesExist;
};

module.exports = saveCookiesToFile;
