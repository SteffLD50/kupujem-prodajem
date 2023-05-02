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

Cypress.Commands.add("loginViaBackend", () => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/login`,
        headers: {
            "x-kp-signature": "956570ad7313c3170baf4b942a4e5d6abb1aab08",
        },
        body: {
            email: Cypress.env("validEmail"),
            password: Cypress.env("validPassword"),
            // remember: "no",
        },
        // }).then((resp) => {
        //     console.debug("autentication response", resp);
        //     const cookies = resp.headers["set-cookie"];
        //     cookies.forEach((cookie) => {
        //         const firstPart = cookie.split(";")[0];
        //         const separator = firstPart.indexOf("=");
        //         const name = firstPart.substring(0, separator);
        //         const value = firstPart.substring(separator + 1);
        //         console.debug("cookie", name, value);
        //         cy.setCookie(name, value);
        //     });
    });
});

Cypress.Commands.add("getIframe", (iframe) => {
    return cy
        .get(iframe)
        .its("0.contentDocument.body")
        .should("be.visible")
        .then(cy.wrap);
});
