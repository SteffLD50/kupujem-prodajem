class MojiOglasiPage {
    get headerTitle() {
        return cy.get(".MyKpLayout_title__h_POY");
    }

    get sidebarPorukeLink() {
        return cy.get("a[href='/moj-kp/poruke/inbox']");
    }

    get postaviteOglasBtn() {
        return cy.get("a[href='/postavljanje-oglasa']");
    }

    get adTitle() {
        return cy.get(".AdItem_name__RhGAZ");
    }
}

export const mojiOglasiPage = new MojiOglasiPage();
