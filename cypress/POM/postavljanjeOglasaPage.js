import { viewAdPage } from "./viewAdPage";

class PostavljanjeOglasaPage {
    get headerStepper() {
        return cy.get(".StepperCircle_stepper__sRQmy");
    }

    get headerNextBtn() {
        return cy
            .get(".AdSave_navigationTopHolder__hEERw")
            .find("button[type='submit']");
    }

    // 1. Korak - Izbor kategorije
    get adTypeSelect() {
        return cy.get(".AdSaveStepOne_adKindButtonGroup__TKAq0").find("input");
    }

    get adCategoryInput() {
        return cy.get("#react-select-categoryId-input");
    }

    get categoryListbox() {
        return cy.get("#react-select-categoryId-listbox");
    }

    get adGroupInput() {
        return cy.get("#react-select-groupId-input");
    }

    get groupListbox() {
        return cy.get("#react-select-groupId-listbox");
    }

    // 2. Korak - Unos oglasa
    get imageUploadInput() {
        return cy.get("input[type='file']").eq(1);
    }

    get adTitleInput() {
        return cy.get("#name");
    }

    get adPriceInput() {
        return cy.get("#price");
    }

    get currencySelect() {
        return cy.get(".AdSaveStepTwo_currency__BUOIN");
    }

    get conditionSelect() {
        return cy.get(".AdSaveCondition_conditionHolder__Bo1M7").find("button");
    }

    get imageUploadTitle() {
        return cy.get(".AdSaveUploadImage_name__NX02a");
    }

    // 3. Korak - Izbor promocije
    get standardVisibility() {
        return cy
            .get(".Promotion_promoItem__tFpMY")
            .eq(0)
            .find("button[type='button']");
    }

    // 4. Korak - Identifikacija
    get termsAndConditionsCheckbox() {
        return cy.get("#acceptyes");
    }

    get headerPostAnAdBtn() {
        return cy
            .get(".AdSave_navigationTopHolder__hEERw")
            .find("button[type='submit']");
    }

    postavljanjeOglasa(
        adType,
        adCategory,
        adGroup,
        adTitle,
        adPrice,
        currency,
        condition,
        adDescription,
        imageFiles
    ) {
        const numOfImg = Array(imageFiles.length).fill("@uploadImages");

        cy.intercept("POST", `${Cypress.env("apiUrl")}/log/adcreate`).as(
            "getUnosOglasa"
        );
        cy.intercept("POST", `${Cypress.env("apiUrl")}/file`).as(
            "uploadImages"
        );
        cy.intercept("POST", `${Cypress.env("apiUrl")}/eds/save`).as(
            "getSavedAd"
        );

        // 1. Korak - Izbor kategorije
        this.adTypeSelect.eq(adType).check();
        this.adCategoryInput.type(adCategory);
        this.categoryListbox.should("be.visible");
        this.adCategoryInput.type("{enter}");
        this.adGroupInput.type(adGroup);
        this.groupListbox.should("be.visible");
        this.adGroupInput.type("{enter}");

        // 2. Korak - Unos oglasa
        cy.wait("@getUnosOglasa", { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).eq(200);
            this.headerStepper.should("contain.text", "2. Unos oglasa");
        });
        this.imageUploadInput.invoke("show").selectFile(imageFiles);
        this.adTitleInput.type(adTitle);
        this.adPriceInput.type(adPrice);
        this.currencySelect.find(`input[value=${currency}]`).check();

        // U zavisnosti od odabrane kategorije oglasa, biće dostupno/nedostupno označavanje stanja predmeta
        cy.get("body").then((body) => {
            if (
                body.find(".AdSaveCondition_conditionHolder__Bo1M7").length > 0
            ) {
                this.conditionSelect.eq(condition).click();
            }
        });
        cy.getIframe("#text-field-editor_ifr").type(adDescription);

        // Pre nego što pređemo na sledeći korak, čekamo da se završi upload-ovanje svih slika
        cy.wait(numOfImg, { timeout: 30000 }).then(() => {
            this.imageUploadTitle.should("not.exist");
        });
        this.headerNextBtn.click();

        // 3. Korak - Izbor promocije
        cy.wait("@getUnosOglasa").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            this.headerStepper.should("contain.text", "3. Izbor promocije");
        });
        this.standardVisibility.click();
        this.headerNextBtn.click();

        // 4. Korak - Identifikacija
        cy.wait("@getUnosOglasa").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            this.headerStepper.should("contain.text", "4. Identifikacija");
        });
        this.termsAndConditionsCheckbox.check({ force: true });
        this.headerPostAnAdBtn.click();
        cy.wait("@getSavedAd").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            viewAdPage.adTitle.should("contain.text", adTitle);
        });
    }
}

export const postavljanjeOglasaPage = new PostavljanjeOglasaPage();
