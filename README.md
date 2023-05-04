# "Create Ad" Automatization on [KupujemProdajem.com](https://novi.kupujemprodajem.com/)

"Create Ad" automatization is used to facilitate the process of reposting ads after they expire. The project is made for posting standard (free) ads without any promotions.

## Table of Contents

1. [ How ads work on KupujemProdajem.com? ](#work)
2. [ Technologies ](#techno)
3. [ Development and testing environment ](#env)
4. [ Instructions ](#instructions)

-   [ 1. Credentials ](#credentials)
-   [ 2. Creation of an Ad ](#create)
-   [ 3. Posting of the Ad ](#usage)

5. [ Attention! ](#attention)
6. [ Few Tips ](#tips)

## How ads work on KupujemProdajem.com?

The validity period of a standard ad (without any paid promotion or KP Obnavljač) is 30 days and after that period it will be automatically deleted. On a monthly basis, 30 ads can be placed for free, everything above that has to be paid for.

## Technologies

-   HTML5
-   JavaScript ES6

## Development and testing environment:

-   OS Windows 10 Pro
-   Chrome, Version: 113.0.5672.64 (Official Build) (64-bit)
-   Visual Studio Code, Version: 1.78 .0
-   Git, Version: 2.39.0.windows.2
-   Cypress, Version: 12.11.0
-   Node.js, Version: 16.17.1

## Instructions

Download the repository using this command:

```bash
git clone https://github.com/SteffLD50/kupujem-prodajem.git
```

### 1. Credentials

In the projects root folder `../kupujem-prodajem` we need to create a `cypress.env.json` file. Copy and paste this code inside of the file:

```
{
    "validEmail": "",
    "validPassword": ""
}
```

Inside the quotation marks type valid credentials of the existing account.

### 2. Creation of an Ad

We need to open the `PostavljanjeOglasa.cy.js` file, which is located in `cypress/e2e/PostavljanjeOglasa.cy.js`. A couple of examples are already in this file. We can see that every ad is actually a test in which we're calling a function. The function is called using:

```
postavljanjeOglasaPage.postavljanjeOglasa()
```

A function has 9 parameters:

`postavljanjeOglasa(adType, adCategory, adGroup, adTitle, adPrice, currency, condition, adDescription, imageFiles)`

#### The explanation for every parameter:

-   `adType`, `type=number`
    Depending on the ad type we're entering one of the following numbers:

`0` = Stvar (Article)

`1` = Usluga (Service) (not tested)

`2` = Posao (Job) (not tested)

-   `adCategory`, `type=string`
    Enter the category name. In order to know which categories exist, we need to visit the KupujemProdajem site and check that out.

-   `adGroup`, `type=string`
    Enter the category group name. In order to know which category groups exist, we need to visit the KupujemProdajem site and check that out.

-   `adTitle`, `type=string`
    Enter the ad title.

-   `adPrice`, `type=string`
    Enter the ad price.

-   `currency`, `type=string`
    Choosing the currency of the price. It can be `"rsd"` or `"eur"`.

-   `condition`, `type=number`
    Choosing the condition of the article by entering one of the following numbers:

`0` = Kao novo (Nekorišćeno) / Like New (Unused)

`1` = Korišćeno (Ispravno) / Used (Correct)

`2` = Novo (Samo za firme) / New (Only for the Companies)

`3` = Oštećeno (Neispravno) / Damaged (Faulty)

`undefined` – in case the condition option is unavailable (depending on the ad category)

-   `adDescription`, `type=string`
    Enter the ad text/description. While typing text, instead of using `Enter` button, we type `\n`.

-   `imageFiles`, `type=string`
    Images must be in the project, located in the `fixtures` folder. Image argument example: `["cypress/fixtures/"ad_folder"/"image_name.extension"]`

If there are any ambiguities, analyze the existing examples.

### 3. Posting of the Ad

After we implemented desired ads, automated ad posting can be launched. We do that through terminal by entering the command:

```
npm run cypress
```

for headed mode (cypress open)

or

```
npm run cy-headless
```

for headless mode (cypress run)

That's it! If everything was entered correctly, ads will be posted. Otherwise, read the instructions again.

#### For Linux Users:

For test runner commands on Linux OS to work, some minor changes in the `package.json` file are required. Find the `"scripts"` object and replace every `\\` with `/` inside of it. After the changes are done, the `"scripts"` object should look like this:

```
"scripts": {
        "cypress": "./node_modules/.bin/cypress open",
        "cy-headless": "./node_modules/.bin/cypress run",
        "html-report": "cypress run --spec cypress/e2e/PostavljanjeOglasa.cy.js --browser chrome --headed"
    },
```

# Attention!

It should be noted that every time the tests are launched, all implemented ads will be posted. In other words, there will be duplicate ads if the same tests are run again. Also, don't forget that the monthly free amount of ads is 30.

## Few Tips

However, if we want to skip some of the implemented ads, we can mark them as a comment. We do that by marking the text and pressing `ctrl` + `/`. Canceling the comment is done in the same way.

Also, if we have a number of implemented ads in the project, but we only want to post one specific ad and ignore all the rest, we can do that by adding `".only"` after `"it"`, which would look like this: `it.only()`.

## Author

-   [@github](https://github.com/SteffLD50)
-   [@linkedin](https://www.linkedin.com/in/stefan-na%C4%91luka%C4%8D-205591267/)

## 🚀 About Me

Hello there, I'm Stefan Nađlukač and, currently, I'm looking for a Quality Assurance Engineer internship opportunity.
