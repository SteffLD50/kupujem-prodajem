/// <reference types="Cypress"/>

import { loginPage } from "../POM/loginPage";
import { mojiOglasiPage } from "../POM/mojiOglasiPage";
import { postavljanjeOglasaPage } from "../POM/postavljanjeOglasaPage";
import { AD_TYPE, CONDITION, CURRENCY, AD_ARGUMENTS } from "../fixtures/adData";

describe("Postavljanje oglasa", () => {
    beforeEach("Programmatic Login", () => {
        cy.intercept(
            "GET",
            `${Cypress.env("apiUrl")}/general/feature-flags`
        ).as("getMoji-oglasi");
        cy.intercept(
            "GET",
            `${Cypress.env(
                "apiUrl"
            )}/categories?filters[banner_price_rank_exclude]=-1&filters[active]=visible`
        ).as("getPostavljanje-oglasa");

        cy.visit("/login");
        loginPage.emailInput.should("exist").and("be.visible");
        cy.loginViaBackend();
        cy.visit("/moj-kp/moji-oglasi");
        cy.wait("@getMoji-oglasi").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            cy.url().should(
                "equal",
                "https://novi.kupujemprodajem.com/moj-kp/moji-oglasi"
            );
            mojiOglasiPage.headerTitle.should("contain.text", "Moji oglasi");
            mojiOglasiPage.sidebarPorukeLink.should("exist").and("be.visible");
        });
        mojiOglasiPage.postaviteOglasBtn.should("exist").click();
        cy.wait("@getPostavljanje-oglasa").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            cy.url().should(
                "not.equal",
                "https://novi.kupujemprodajem.com/moj-kp/moji-oglasi"
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
