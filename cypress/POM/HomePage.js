class HomePage {
    get sidebarUlogujteSeBtn() {
        return cy
            .get(".MyKpMenu_lockedMyKpList__iG4lO")
            .find('button[aria-label="Ulogujte se"]');
    }

    get sidebarMojiOglasiLink() {
        return cy.get('a[href="/moj-kp/moji-oglasi"]');
    }
}

export const homePage = new HomePage();
