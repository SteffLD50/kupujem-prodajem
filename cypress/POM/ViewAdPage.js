class ViewAdPage {
    get pageBody() {
        return cy.get("body");
    }

    get adTitle() {
        return cy.get("h1");
    }

    get searchInputField() {
        return cy.get("#keywords");
    }

    get modalWindow() {
        return cy.get(".Modal_modal__z3RKr");
    }
}

export const viewAdPage = new ViewAdPage();
