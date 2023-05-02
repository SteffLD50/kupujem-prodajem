class LoginPage {
    get emailInput() {
        return cy.get("#email");
    }
    get passwordInput() {
        return cy.get("#password");
    }
    get submitButton() {
        return cy.get("button[type='submit']");
    }
}

export const loginPage = new LoginPage();
