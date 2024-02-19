class MojiOglasiPage {
    get headerTitle() {
        return cy.get(".Header_headerInner__bGBNV");
    }

    get sidebarPorukeLink() {
        return cy.get("a[href='/moj-kp/poruke/inbox']");
    }

    get postaviteOglasBtn() {
        return cy.get("a[href='/postavljanje-oglasa']").eq(0);
    }
}

export const mojiOglasiPage = new MojiOglasiPage();
