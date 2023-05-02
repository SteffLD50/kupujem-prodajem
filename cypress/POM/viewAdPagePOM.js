class ViewAdPage {
    get adTitle() {
        return cy.get("h1");
    }
}

export const viewAdPage = new ViewAdPage();
