/// <reference types="Cypress"/>

import { mojiOglasiPage } from "../POM/mojiOglasiPage";
import { postavljanjeOglasaPage } from "../POM/postavljanjeOglasaPage";
import { AD_TYPE, CONDITION, CURRENCY, AD_ARGUMENTS } from "../fixtures/adData";

describe("Postavljanje oglasa", () => {
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
        postavljanjeOglasaPage.postavljanjeOglasa(
            AD_TYPE.STVAR,
            AD_ARGUMENTS.hdmiKabl.adCategory,
            AD_ARGUMENTS.hdmiKabl.adGroup,
            AD_ARGUMENTS.hdmiKabl.adTitle,
            AD_ARGUMENTS.hdmiKabl.adPrice,
            CURRENCY.RSD,
            CONDITION.KAO_NOVO,
            AD_ARGUMENTS.hdmiKabl.adDescription,
            AD_ARGUMENTS.hdmiKabl.imageFiles
        );
    });

    it("Miš Scorpion M207 - Marvo", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            AD_TYPE.STVAR,
            AD_ARGUMENTS.misScorpion.adCategory,
            AD_ARGUMENTS.misScorpion.adGroup,
            AD_ARGUMENTS.misScorpion.adTitle,
            AD_ARGUMENTS.misScorpion.adPrice,
            CURRENCY.RSD,
            CONDITION.KAO_NOVO,
            AD_ARGUMENTS.misScorpion.adDescription,
            AD_ARGUMENTS.misScorpion.imageFiles
        );
    });

    it("Procesor Intel Core i7-6700 - 3.40 GHz", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            AD_TYPE.STVAR,
            AD_ARGUMENTS.procesorIntel.adCategory,
            AD_ARGUMENTS.procesorIntel.adGroup,
            AD_ARGUMENTS.procesorIntel.adTitle,
            AD_ARGUMENTS.procesorIntel.adPrice,
            CURRENCY.EUR,
            CONDITION.KORISCENO,
            AD_ARGUMENTS.procesorIntel.adDescription,
            AD_ARGUMENTS.procesorIntel.imageFiles
        );
    });

    it("Suvenir - Lambis Scorpius", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            AD_TYPE.STVAR,
            AD_ARGUMENTS.suvenirLambisScorpius.adCategory,
            AD_ARGUMENTS.suvenirLambisScorpius.adGroup,
            AD_ARGUMENTS.suvenirLambisScorpius.adTitle,
            AD_ARGUMENTS.suvenirLambisScorpius.adPrice,
            CURRENCY.RSD,
            undefined,
            AD_ARGUMENTS.suvenirLambisScorpius.adDescription,
            AD_ARGUMENTS.suvenirLambisScorpius.imageFiles
        );
    });
});
