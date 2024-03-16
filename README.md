# KP Automated Ad Posting v.0.0.5

KP Automated Ad Posting is made specifically for the site [KupujemProdajem](https://novi.kupujemprodajem.com/). It is used to facilitate the process of reposting standard (free) ads without any promotions after they expire.

## Table of Contents

-   [ About the Project ](#about-the-project)
-   [ How Do Ads Work on KupujemProdajem? ](#how-do-ads-work-on-kupujemprodajem)
-   [ Technologies ](#technologies)
-   [ Development and Testing Environment ](#development-and-testing-environment)
-   [ Instructions ](#instructions)
    -   [ 1. Credentials ](#1-credentials)
    -   [ 2. Creation of an Ad ](#2-creation-of-an-ad)
    -   [ 3. Ad Posting ](#3-ad-posting)
-   [ Attention ](#attention)
-   [ Few Tips ](#few-tips)

## About the Project

It's a solo project, and it's still a work in progress.

I am a long-term user of the site [KupujemProdajem](https://novi.kupujemprodajem.com/). Since I'm posting and reposting about 20 ads every month, I decided to make the whole process easier for myself with the help of test automation. While manually posting 20 ads, it took me about one hour to complete the process. It was a draining and boring process... Now, it's all done in about 10 minutes, and on the plus side, I can just sit and watch while the ads are posted by themself.

The purpose of this project is to learn and gain new experiences without gaining any money. I'm still looking for ways to speed up the whole process. Feel free to reach out to me and give me some feedback.

## How Do Ads Work on KupujemProdajem?

The validity period of a standard ad (without any paid promotion or KP Obnavljač) is one month. After one month the ad will be automatically deleted. The latest announcement was that after 01/24/2024, for setting more than 20 ads per month you will need to activate KP Obnavljač.

## Technologies

-   HTML5
-   JavaScript ES6

## Development and Testing Environment:

-   OS Windows 10 Pro
-   Visual Studio Code, Version: 1.87.2
-   Git, Version: 2.43.0.windows.1
-   Node.js, Version: 21.0.0
-   Cypress, Version: 13.7.0
-   Electron, Version: 27.3.2
-   Chromium, Version: 118.0.5993.159
-   dotenv, Version: 16.4.5
-   Puppeteer, Version: 22.5.0

## Instructions

Download the repository by using the command:

```
git clone https://github.com/SteffLD50/kupujem-prodajem.git
```

then use this command to install the required dependencies:

```
npm install
```

### 1. Credentials

The precondition for successful login is to have KupujemProdajem and Facebook accounts created using the same email address.

In the project's root folder `../kupujem-prodajem` find the file `.env` and open it.
Enter the valid Facebook login credentials like in the example below:

```
FB_EMAIL=testexample0@gmail.com
FB_PASSWORD=testexample0
```

The KupujemProdajem credentials are not needed, because the accounts will be synced right after Facebook login.

### 2. Creation of an Ad

Open the file `adData.js` located in the folder `../kupujem-prodajem/cypress/fixtures/`. Every ad is a separate object. For the data entry explaination I'll be using the following ad object:

```
export const AD_NAME = {
    title: "adTitle",
    type: TYPE.stvar,
    category: "adCategory",
    group: "adGroup",
    price: "adPrice",
    currency: CURRENCY.rsd,
    condition: CONDITION.korisceno,
    description: "adDescription",
    imageFiles: [],
};
```

#### Instructions for data entry:

Replace `AD_NAME` with the desired object name. This name will be later used for summoning the object as a parameter in the method.

An explanation for each `key: value`:

| Key:   | `title`                         |
| ------ | ------------------------------- |
| Value: | Enter the ad title as a string. |

| Key:   | `type`                                               |
| ------ | ---------------------------------------------------- |
| Value: | Enter one of the following depending on the ad type: |
|        | `TYPE.stvar` = Stvar / Article                       |
|        | `TYPE.usluga` = Usluga / Service (not tested)        |
|        | `TYPE.posao` = Posao / Job (not tested)              |

| Key:   | `category`                                                                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value: | Enter the category name as a string. Visit the [KupujemProdajem](https://novi.kupujemprodajem.com/) site to find out which categories are available. |

| Key:   | `group`                                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value: | Enter the category group name as a string. Visit the [KupujemProdajem](https://novi.kupujemprodajem.com/) site to find out which category groups are available. |

| Key:   | `price`                      |
| ------ | ---------------------------- |
| Value: | Enter the price as a string. |

| Key:   | `currency`                                            |
| ------ | ----------------------------------------------------- |
| Value: | Choose the currency by entering one of the following: |
|        | `CURRENCY.rsd` = Serbian Dinar                        |
|        | `CURRENCY.eur` = Euro                                 |

| Key:   | `condition`                                                                              |
| ------ | ---------------------------------------------------------------------------------------- |
| Value: | Choose the condition of an article by entering one of the following:                     |
|        | `CONDITION.kaoNovo` = Kao novo (Nekorišćeno) / Like New (Unused)                         |
|        | `CONDITION.korisceno` = Korišćeno (Ispravno) / Used (Correct)                            |
|        | `CONDITION.osteceno` = Oštećeno (Neispravno) / Damaged (Faulty)                          |
|        | `CONDITION.novo` = Novo (Samo za firme) / New (Only for the Companies)                   |
|        | `undefined` = in case the condition option is unavailable (depending on the ad category) |

| Key:           | `description`                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Value:         | Enter the path of the `.txt` file which contains the ad description. The display of description text will be exactly as it's in the `.txt` file. |
| Value example: | `"cypress/fixtures/ad_folder/text.txt"`                                                                                                          |

| Key:           | `imageFiles`                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value:         | Add ad photos to the array. The photos must be placed in the project, located in the folder `../kupujem-prodajem/cypress/fixtures`. Max number of photos is 20. |
| Value example: | `["cypress/fixtures/ad_folder/"image_name1.jpg", "cypress/fixtures/"ad_folder"/"image_name2.jpg"]`                                                              |

After we entered all the ad object values, next we have to open the file `automatedAdPosting.cy.js` located in the folder `../kupujem-prodajem/cypress/e2e/`. There are already a couple of examples in the file. If we look at the examples we'll notice that every ad is an `it()` block in which we're calling a method. The method is called by typing:

```
postavljanjeOglasaPage.postAd()
```

The method accepts only one parameter. Type `adObject.` and select one of the existing ad objects by the object name (`AD_NAME`).

If there are any ambiguities, analyze the existing examples.

### 3. Ad Posting

After the ads are implemented, KP Automated Ad Posting can be launched. Enter the following command in the terminal:

```
npm run cypress
```

Cypress will launch in the headed mode (cypress open).

-   Choose "E2E Testing".
-   Check "Electron" browser and click "Start E2E Testing in Electron".
-   Click on "automatedAdPosting.cy.js"

That's it!

If everything was done as described above, the ads should be posted.

### For Linux Users:

When running on Linux OS, minor changes are required in the file `package.json` for test runner commands to work. Find the object `"scripts"` and inside of it replace every `\\` with `/`. After the changes are done, the object `"scripts"` should look like this:

```
"scripts": {
        "cypress": "./node_modules/.bin/cypress open",
        "cy-headless": "./node_modules/.bin/cypress run",
        "html-report": "cypress run --spec cypress/e2e/automatedAdPosting.cy.js --browser electron --headed"
    },
```

# Attention

It should be noted that every time the tests are launched, all the implemented ads will be posted. That means there will be duplicate ads if the same tests are repeated. Also, don't forget that the monthly free amount of ads is 20.

## Few Tips

To skip some of the implemented ads instead of deleting them, mark them as a comment. Commenting is done by marking the desired code and pressing `ctrl` + `/`. Press the same buttons to cancel a comment.

Also, if we have implemented several ads in the project, but we only want to post just one specific ad and ignore all the rest, we can do that by adding `".only"` to the desired `"it()"` block, which would look like this: `it.only()`.

## Author

-   [@github](https://github.com/SteffLD50)
-   [@linkedin](https://www.linkedin.com/in/stefan-na%C4%91luka%C4%8D-205591267/)

## 🚀 About Me

Hello there, I'm Stefan Nađlukač and I'm currently looking for a Quality Assurance Engineer internship or job opportunity.
