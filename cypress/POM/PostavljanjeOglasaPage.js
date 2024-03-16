import { viewAdPage } from "./ViewAdPage";

class PostavljanjeOglasaPage {
    get headerStepper() {
        return cy.get(".AdSave_navigationTopHolder__EqZX0");
    }

    get headerNextBtn() {
        return cy
            .get(".AdSave_navigationTopHolder__EqZX0")
            .find("button[type='submit']");
    }

    // 1. Step - Izbor kategorije (Category selection)
    get adTypeSelect() {
        return cy.get(".AdSaveStepOne_adKindButtonGroup__vF7te").find("input");
    }

    get adCategoryInput() {
        return cy.get("#react-select-categoryId-input");
    }

    get adGroupInput() {
        return cy.get("#react-select-groupId-input");
    }

    // 2. Step - Unos oglasa (Ad entry)
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
        return cy.get(".AdSaveStepTwo_currency__HjUtK");
    }

    get conditionSelect() {
        return cy.get(".AdSaveCondition_conditionHolder__fvNkq").find("button");
    }

    get imageUploadProgressBar() {
        return cy.get(".ProgressBar_progressBar__uhYBn");
    }

    // 3. Step - Izbor promocije (Choice of promotion)
    get standardVisibility() {
        return cy
            .get(".Promotion_promoItem__aFVdo")
            .eq(0)
            .find("button[type='button']");
    }

    // 4. Step - Identifikacija (Identification)
    get termsAndConditionsCheckbox() {
        return cy.get("#acceptyes");
    }

    get headerPostAnAdBtn() {
        return cy
            .get(".AdSave_navigationTopHolder__EqZX0")
            .find("button[type='submit']");
    }

    postAd(adObject) {
        const uploadingImages = Array(adObject.imageFiles.length).fill(
            "@uploadImage"
        );

        cy.intercept("POST", `${Cypress.env("apiUrl")}/log/adcreate`).as(
            "getUnosOglasa"
        );
        cy.intercept("POST", `${Cypress.env("apiUrl")}/file`).as("uploadImage");
        cy.intercept("POST", `${Cypress.env("apiUrl")}/banners/show-track`).as(
            "getSavedAd"
        );

        // 1. Step - Izbor kategorije (Category selection)
        this.adTypeSelect.eq(adObject.type).check();
        this.adCategoryInput.type(`${adObject.category}{enter}`);
        this.adGroupInput.type(`${adObject.group}{enter}`);

        // 2. Step - Unos oglasa (Ad entry)
        cy.wait("@getUnosOglasa", { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).eq(200);
            this.headerStepper.should("contain.text", "2. Unos oglasa");
        });
        this.imageUploadInput
            .invoke("show")
            .selectFile(adObject.imageFiles.slice(0, 8));
        this.adTitleInput.type(adObject.title);
        this.adPriceInput.type(adObject.price);
        this.currencySelect.find(`input[value=${adObject.currency}]`).check();

        // Depending on the selected ad category,
        // item condition flagging will be available/unavailable
        cy.get("body").then((body) => {
            if (
                body.find(".AdSaveCondition_conditionHolder__fvNkq").length > 0
            ) {
                this.conditionSelect.eq(adObject.condition).click();
            }
        });
        cy.getIframe("#text-field-editor_ifr").type(adObject.description);

        // Before moving on to the next step,
        // we wait for the uploading of all images to finish.
        cy.wait(uploadingImages.slice(0, 8), { requestTimeout: 30000 }).then(
            () => {
                this.imageUploadProgressBar.should("not.exist");
                if (uploadingImages.length > 8) {
                    this.imageUploadInput
                        .invoke("show")
                        .selectFile(adObject.imageFiles.slice(8));
                    cy.wait(uploadingImages.slice(8), {
                        requestTimeout: 60000,
                    }).then(() => {
                        this.imageUploadProgressBar.should("not.exist");
                    });
                }
            }
        );
        this.headerNextBtn.click();

        // 3. Step - Izbor promocije (Choice of promotion)
        cy.wait("@getUnosOglasa").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            this.headerStepper.should("contain.text", "3. Izbor promocije");
        });
        this.standardVisibility.click();
        this.headerNextBtn.click();

        // 4. Step - Identifikacija (Identification)
        cy.wait("@getUnosOglasa").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            this.headerStepper.should("contain.text", "4. Identifikacija");
        });
        this.termsAndConditionsCheckbox.check({ force: true });
        // this.headerPostAnAdBtn.click();
        // cy.wait("@getSavedAd", { requestTimeout: 30000 }).then(
        //     (interception) => {
        //         expect(interception.response.statusCode).eq(200);
        //         viewAdPage.pageBody.then((body) => {
        //             if (body.find(".Modal_modal__z3RKr").length > 0) {
        //                 viewAdPage.modalWindow.find("button").eq(0).click();
        //             }
        //         });
        //         viewAdPage.searchInputField.should("exist").and("be.visible");
        //         viewAdPage.adTitle
        //             .should("exist")
        //             .and("contain.text", adObject.title);
        //     }
        // );
    }
}

export const postavljanjeOglasaPage = new PostavljanjeOglasaPage();
