// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { homePage } from "../POM/homePage";

Cypress.Commands.add("loginViaPuppeteer", () => {
    cy.session("loginViaPuppeteer", () => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/poll/index`).as(
            "homePage"
        );

        cy.task("puppeteer:saveCookiesToFile");

        cy.visit("/");
        cy.wait("@homePage").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            homePage.sidebarUlogujteSeBtn.should("exist").and("be.visible");
            homePage.sidebarMojiOglasiLink.should("not.exist");
        });

        cy.fixture("cookies.json").then((cookies) => {
            const parsedCookies = JSON.parse(JSON.stringify(cookies));
            parsedCookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value);
            });
        });
    });
});

Cypress.Commands.add("getIframe", (iframe) => {
    return cy
        .get(iframe)
        .its("0.contentDocument.body")
        .should("be.visible")
        .then(cy.wrap);
});
