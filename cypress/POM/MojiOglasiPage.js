class MojiOglasiPage {
    get headerTitle() {
        return cy.get(".MyKpLayout_title__QDRzM");
    }

    get sidebarPorukeLink() {
        return cy.get("a[href='/moj-kp/poruke/inbox']");
    }

    get postaviteOglasBtn() {
        return cy.get("a[href='/postavljanje-oglasa']").eq(0);
    }
}

export const mojiOglasiPage = new MojiOglasiPage();
