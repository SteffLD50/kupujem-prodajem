# Automated Ad Posting on KupujemProdajem

Automated Ad Posting is used to facilitate the process of reposting standard (free) ads without any promotions after they expire. It's made specifically for the site [KupujemProdajem](https://novi.kupujemprodajem.com/).

## Table of Contents

-   [ About the Project ](#about-the-project)
-   [ How Ads Work on KupujemProdajem? ](#how-ads-work-on-kupujemprodajem)
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

I am a long-term user of the site [KupujemProdajem](https://novi.kupujemprodajem.com/). Since I'm posting and reposting about 30 ads every month, I decided to make the whole process easier for myself with the help of test automation. While manually posting 30 ads, it took me more than one hour to complete the process. It was a draining and boring process... Now, it's all done in about 20 minutes, and on the plus side, I can play my bass or chill with the book while the ads are posted by themself.

The purpose of this project is to learn and gain new experiences without gaining any money. I'm still looking for ways to speed up the whole process. Feel free to contact me and give me some feedback.

## How Ads Work on KupujemProdajem?

The validity period of a standard ad (without any paid promotion or KP Obnavljač) is 30 days. Soon as this period ends the ad will be automatically deleted. On a monthly basis, 30 ads can be placed for free, everything above has to be paid.

## Technologies

-   HTML5
-   JavaScript ES6

## Development and Testing Environment:

-   OS Windows 10 Pro
-   Chrome, Version: 113.0.5672.64 (Official Build) (64-bit)
-   Visual Studio Code, Version: 1.78 .0
-   Git, Version: 2.39.0.windows.2
-   Cypress, Version: 12.11.0
-   Node.js, Version: 16.17.1

## Instructions

Download the repository by using the command:

```bash
git clone https://github.com/SteffLD50/kupujem-prodajem.git
```

### 1. Credentials

In the project's root folder `../kupujem-prodajem` we need to create the file `cypress.env.json`. Copy and paste this code inside of the file:

```
{
    "validEmail": "",
    "validPassword": ""
}
```

Enter valid login credentials inside of the quotation marks for the existing account.

### 2. Creation of an Ad

Open the file `PostavljanjeOglasa.cy.js` located in the folder `../kupujem-prodajem/cypress/e2e/`. There are already a couple of examples in the file. If we look at the examples we'll notice that every ad is an `it()` block in which we're calling a method. The method is called by typing:

```
postavljanjeOglasaPage.postavljanjeOglasa()
```

The method has 9 parameters:

`postavljanjeOglasa(adType, adCategory, adGroup, adTitle, adPrice, currency, condition, adDescription, imageFiles)`

#### An explanation for every parameter:

| Parameter:   | `adType`                                                     |
| ------------ | ------------------------------------------------------------ |
| Type:        | `number`                                                     |
| Description: | Enter one of the following numbers depending on the ad type: |
|              | `0` = Stvar / Article                                        |
|              | `1` = Usluga / Service (not tested)                          |
|              | `2` = Posao / Job (not tested)                               |

| Parameter:   | `adCategory`                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Type:        | `string`                                                                                                                                 |
| Description: | Enter the category name. Visit the [KupujemProdajem](https://novi.kupujemprodajem.com/) site to find out which categories are available. |

| Parameter:   | `adGroup`                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type:        | `string`                                                                                                                                            |
| Description: | Enter the category group name. Visit the [KupujemProdajem](https://novi.kupujemprodajem.com/) site to find out which category groups are available. |

| Parameter:   | `adTitle`           |
| ------------ | ------------------- |
| Type:        | `string`            |
| Description: | Enter the ad title. |

| Parameter:   | `adPrice`           |
| ------------ | ------------------- |
| Type:        | `string`            |
| Description: | Enter the ad price. |

| Parameter:   | `currency`              |
| ------------ | ----------------------- |
| Type:        | `string`                |
| Description: | Choose the currency:    |
|              | `"rsd"` = Serbian Dinar |
|              | `"eur"` = Euro          |

| Parameter:   | `condition`                                                                            |
| ------------ | -------------------------------------------------------------------------------------- |
| Type:        | `number`                                                                               |
| Description: | Choose the condition of an article by entering one of the following numbers:           |
|              | `0` = Kao novo (Nekorišćeno) / Like New (Unused)                                       |
|              | `1` = Korišćeno (Ispravno) / Used (Correct)                                            |
|              | `2` = Novo (Samo za firme) / New (Only for the Companies)                              |
|              | `3` = Oštećeno (Neispravno) / Damaged (Faulty)                                         |
|              | `undefined` = in case the condition option is unavailable (depends on the ad category) |

| Parameter:   | `adDescription`                                                                            |
| ------------ | ------------------------------------------------------------------------------------------ |
| Type:        | `string`                                                                                   |
| Description: | Enter the ad description. Type `\n` instead of pressing the button `Enter` for a new line. |

| Parameter:        | `imageFiles`                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Type:             | `string`                                                                                                               |
| Description:      | Add ad photos. The photos must be placed in the project, located in the folder `../kupujem-prodajem/cypress/fixtures`. |
| Argument example: | `["cypress/fixtures/"ad_folder"/"image_name1.jpg", "cypress/fixtures/"ad_folder"/"image_name2.jpg"]`                   |

If there are any ambiguities, analyze the existing examples.

### 3. Ad Posting

After the ads are implemented, automated ad posting can be launched. Enter one of the following commands in the terminal. For the headed mode (cypress open):

```
npm run cypress
```

or for the headless mode (cypress run):

```
npm run cy-headless
```

That's it!

If everything was done as described above, the ads should be posted.

### For Linux Users:

When running on Linux OS, minor changes are required in the file `package.json` for test runner commands to work. Find the object `"scripts"` and replace every `\\` with `/` inside of it. After the changes are done, the object `"scripts"` should look like this:

```
"scripts": {
        "cypress": "./node_modules/.bin/cypress open",
        "cy-headless": "./node_modules/.bin/cypress run",
        "html-report": "cypress run --spec cypress/e2e/PostavljanjeOglasa.cy.js --browser chrome --headed"
    },
```

# Attention

It should be noted that every time the tests are launched, all the implemented ads will be posted. That means there will be duplicate ads if the same tests are repeated. Also, don't forget that the monthly free amount of ads is 30.

## Few Tips

To skip some of the implemented ads instead of deleting them, mark them as a comment. Commenting is done by marking the desired code and pressing `ctrl` + `/`. Press the same buttons to cancel a comment.

Also, if we have implemented several ads in the project, but we only want to post just one specific ad and ignore all the rest, we can do that by adding `".only"` to the desired `"it()"` block, which would look like this: `it.only()`.

## Author

-   [@github](https://github.com/SteffLD50)
-   [@linkedin](https://www.linkedin.com/in/stefan-na%C4%91luka%C4%8D-205591267/)

## 🚀 About Me

Hello there, I'm Stefan Nađlukač and, currently, I'm looking for a Quality Assurance Engineer internship opportunity.
