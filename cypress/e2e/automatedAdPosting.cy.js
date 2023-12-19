/// <reference types="Cypress"/>

import { mojiOglasiPage } from "../POM/mojiOglasiPage";
import { postavljanjeOglasaPage } from "../POM/postavljanjeOglasaPage";
import * as adObject from "../fixtures/adData";

describe("Automated Ad Posting", () => {
    beforeEach("Login Via Puppeteer", () => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/me`).as("mojiOglasiPage");
        cy.intercept("GET", `${Cypress.env("apiUrl")}/agreements`).as(
            "postaviteOglasPage"
        );

        cy.loginViaPuppeteer();

        cy.visit("/moj-kp/moji-oglasi");
        cy.wait("@mojiOglasiPage").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            cy.url().should(
                "equal",
                "https://www.kupujemprodajem.com/moj-kp/moji-oglasi"
            );
            mojiOglasiPage.headerTitle.should("contain.text", "Moji oglasi");
            mojiOglasiPage.sidebarPorukeLink.should("exist").and("be.visible");
        });

        mojiOglasiPage.postaviteOglasBtn.should("exist").click();
        cy.wait("@postaviteOglasPage").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            cy.url().should(
                "equal",
                "https://www.kupujemprodajem.com/postavljanje-oglasa"
            );
            postavljanjeOglasaPage.headerStepper
                .should("exist")
                .and("contain.text", "1. Izbor kategorije");
        });
    });

    it("HDMI Kabl 1.5m", () => {
        postavljanjeOglasaPage.postAd(adObject.HDMI_KABL);
    });

    it("Miš Scorpion M207 - Marvo", () => {
        postavljanjeOglasaPage.postAd(adObject.MIS_SCORPION);
    });

    it("Procesor Intel Core i7-6700 - 3.40 GHz", () => {
        postavljanjeOglasaPage.postAd(adObject.PROCESSOR_INTEL);
    });

    it("Suvenir - Lambis Scorpius", () => {
        postavljanjeOglasaPage.postAd(adObject.SUVENIR_LAMBIS_SCORPIUS);
    });
});
