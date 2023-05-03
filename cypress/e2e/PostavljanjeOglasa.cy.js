/// <reference types="Cypress"/>

import { loginPage } from "../POM/loginPagePOM";
import { mojiOglasiPage } from "../POM/mojiOglasiPagePOM";
import { postavljanjeOglasaPage } from "../POM/postavljanjeOglasaPagePOM";

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

    it("Miš Scorpion M207 - Marvo", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            0,
            "Kompjuteri | Desktop",
            "Miševi i podloge",
            "Miš Scorpion M207 - Marvo",
            "800",
            "rsd",
            0,
            "Miš Scorpion M207 - Marvo\n\nSensor: Optical\nDPI: 800-1200-2400-3200\nButtons: 6\nSwitch rating: 3 million clicks\nBacklight: 7 colors\nInterface: USB 2.0\nCable length: 1.5m\nOS support: Windows 7, 8, 10, or newer...\n\nMiš nije korišćen.\n\n(mouse, kompjuter, gaming, gejming)",
            [
                "cypress/fixtures/PC/Miš Scorpion M207 - Marvo/1.jpg",
                "cypress/fixtures/PC/Miš Scorpion M207 - Marvo/2.jpg",
            ]
        );
    });

    it("Procesor Intel Core i7-6700 - 3.40 GHz", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            0,
            "Kompjuteri | Desktop",
            "Procesori",
            "Procesor Intel Core i7-6700 - 3.40 GHz",
            "100",
            "eur",
            1,
            "Procesor Intel Core i7-6700\n\nSocket: LGA 1151\nClockspeed: 3.4 GHZ\nTurbo Speed: 4.0 GHZ\nCores: 4 Threads: 8\nTypical TDP: 65 W\n\n6th Generation Intel® Core™ i7 Processors",
            [
                "cypress/fixtures/PC/Procesor Intel Core i7-6700 - 3.40 GHz/1.jpg",
                "cypress/fixtures/PC/Procesor Intel Core i7-6700 - 3.40 GHz/2.jpg",
                "cypress/fixtures/PC/Procesor Intel Core i7-6700 - 3.40 GHz/3.jpg",
            ]
        );
    });

    it("Slika - Paukova školjka", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            0,
            "Kolekcionarstvo",
            "Suveniri",
            "Slika - Paukova školjka",
            "700",
            "rsd",
            undefined,
            "Slika / suvenir - Paukova školjka (Lambis scorpius)\n\nDimenzije uključujući ram: 13 x 18cm\n\nMože i uplata na račun radi jeftinije poštarine.",
            ["cypress/fixtures/Slika - Paukova školjka/1.jpg"]
        );
    });

    it("Zaštitno staklo za kameru - Samsung S20 FE", () => {
        postavljanjeOglasaPage.postavljanjeOglasa(
            0,
            "Mobilni tel. | Oprema i delovi",
            "Samsung | Futrole, maske i folije",
            "Zaštitno staklo za kameru - Samsung S20 FE",
            "400",
            "rsd",
            0,
            "Zaštitno staklo za zadnju kameru za Samsung Galaxy S20 FE.\n\nStaklo ne utiče na kvalitet fotografije, provereno, imam isto takvo na svom telefonu.",
            [
                "cypress/fixtures/Zaštitno staklo za kameru - Samsung S20 FE/1.jpg",
                "cypress/fixtures/Zaštitno staklo za kameru - Samsung S20 FE/2.jpg",
                "cypress/fixtures/Zaštitno staklo za kameru - Samsung S20 FE/3.jpg",
            ]
        );
    });
});
