class ViewAdPage {
    get adTitle() {
        return cy.get("h1");
    }

    get searchInputField() {
        return cy.get("#keywords");
    }
}

export const viewAdPage = new ViewAdPage();
