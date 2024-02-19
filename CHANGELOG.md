# Changelog

## [1.1.1] - 2024-02-19

### Bugfixes:

-   Fixed test failing when uploading 8 or more images.
    The Explanation:
    Every image upload is a POST request. Also, while the page loads there are additional requests that are sent in the background. When we upload 8 or more images at once, sometimes Cypress isn't able to catch every request. So later when we do the "cy.wait()" to check if all the images are uploaded, there is a possibility that the test will fail, because, for example, if we upload 12 images at once, Cypress will catch only 9.

-   Improved the bugfix from version [1.0.2] (Test failing because of modal window appearance after posting an ad).

### Changed:

-   Updated the "README.md" file information according to the new terms and conditions of the "Kupujem Prodajem" site.
-   Made some cosmetic changes.
-   Renamed all the Page Object Model files.
-   Added the "CHANGELOG.md" file.

### Dependency Updates:

-   Cypress, Version: from 13.6.1 to 13.6.4
-   Cypress-mochawesome-reporter, Version: from 3.7.0 to 3.8.1
-   dotenv, Version: from 16.3.1 to 16.4.3
-   Puppeteer, Version: from 21.6.1 to 22.0.0

## [1.1.0] - 2023-12-19

### Features:

-   The previous version of the app used the "postavljanjeOglasa()" method which asked for 9 parameters. This version uses the "postAd()" method which asks for only 1 parameter - an object with all the data for the specific ad. Every ad object is defined and exported from the "adData.js" file. The result is clearer code, fewer lines of code, and a little bit easier usage of the application.

### Changed:

-   Adapted instruction information in the "README.md" file according to the new feature addition.

## [1.0.2] - 2023-12-16

### Bugfixes:

-   Fixed test failing because of modal window appearance after posting an ad.

### Changed:

-   Made some corrections in the "loginViaFacebook.js" file.
-   Added an additional information in the "README.md" file.

### Dependency Updates:

-   Cypress, Version: from 13.6.0 to 13.6.1
-   Puppeteer, Version: from 21.5.2 to 21.6.1

## [1.0.1] - 2023-12-04

### Bugfixes:

-   Unable to login programmatically, because "Kupujem Prodajem" added the hCaptcha as a part of the login process.
    The Explanation:
    Couldn't find a way to automate solving the hCaptcha, except maybe with the help of a some hCaptcha solver. But the hCaptcha solver has to be paid and I was looking for a free solution. So instead of solving the hCaptcha I decided to avoid it by logging in via social media, that is, via Facebook.
    Click on the "Login via Facebook" button opens up a new browser window with a dynamic link to the Facebook login page. The condition for this to work is that the email address must be the same for both accounts. After logging, the accounts become synched. The browser window of Facebook login then automatically closes and suddenly, we are logged in to our KupujemProdajem account on our primary browser window.
    The Problem:
    The Cypress is only able to run in one browser window and can't interact with other opened windows or tabs. So, instead of opening a link in the new browser window, I found a way to open it in the primary browser window with the help of the "cy.orygin()". However, in doing so I disrupted the flow of the whole login process and I just wasn't able to make it work.
    The Solution:
    The last solution was to try to use another test automation framework that can interact with multiple browser windows. But I didn't want to abandon the Cypress completely. So the middle solution was to run the Puppeteer test framework through the "cy.task()". It was a bit of a challenge because I had to learn how to write the code for the Puppeteer which I was using for the first time. In the end, I managed to implement a code that did a login via Facebook and saved the needed cookies in the "cookies.json" file from which I later set the cookies in the Cypress browser. Also, in order for the cookies to work, we must choose one browser for running the Puppeteer and the Cypress. If the cookies are saved through Electron, they can't be later reused in Chrome or Mozilla...

-   Solved the occasional test fail due to the "ResizeObserver loop limit exceeded" error by implementing a code in the "cypress/support/e2e.js".

### Changed:

-   Updated the ".gitignore" file.
-   Edited old and added new getters in the existing Page Object Model files.
-   Deleted the old "loginPage.js" file from the POM folder.
-   Created the new "homePage.js" file in the POM folder.
-   Edited the "postavljanjeOglasa()" method from the "postavljanjeOglasaPage.js" file.
-   Replaced the old "loginViaBackend" command with the new "loginViaPuppeteer" command.
-   Added the puppeteer task in the "cypress.config.js" file.
-   Renamed the "PostavljanjeOglasa.cy.js" file into the "automatedAdPosting.cy.js".
-   Edited the "beforeEach()" in the "automatedAdPosting.cy.js" file.
-   The sequence for the article condition options was changed on the "Kupujem Prodajem" so the code was adapted according to it.
-   Made some edits in the "README.md" file.
-   Created the ".env" file which serves to hold the Facebook credentials for the Puppeteer task.
-   Added example ads in the "fixtures" folder.
-   Created the "adData.js" which serves as a container for the ad objects.

### Dependency Updates:

-   Cypress, Version: from 12.11.0 to 13.6.0
-   Cypress-mochawesome-reporter, Version: from 3.4.0 to 3.7.0

### New Dependencies:

-   dotenv, Version: 16.3.1
-   Puppeteer, Version: 21.5.2
