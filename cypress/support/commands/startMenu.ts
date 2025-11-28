declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Open a window from the start menu
       * @param itemName - The name of the menu item (e.g., 'Calculator', 'Notepad', 'Settings')
       */
      openStartMenuItem(itemName: string): Chainable<void>;

      /**
       * Open the start menu sidebar (expand the left column)
       */
      openStartMenuSidebar(): Chainable<void>;

      /**
       * Close the start menu sidebar (collapse the left column)
       */
      closeStartMenuSidebar(): Chainable<void>;

      /**
       * Assert that the start menu exists and is in the DOM
       */
      assertStartMenuExists(): Chainable<void>;

      /**
       * Assert that a specific menu item exists in the start menu
       * @param itemName - The name of the menu item
       */
      assertStartMenuItemExists(itemName: string): Chainable<void>;

      /**
       * Assert that the start menu sidebar is expanded
       */
      assertStartMenuSidebarExpanded(): Chainable<void>;

      /**
       * Assert that the start menu sidebar is collapsed
       */
      assertStartMenuSidebarCollapsed(): Chainable<void>;

      /**
       * Click the power button in the start menu
       */
      clickStartMenuPowerButton(): Chainable<void>;

      /**
       * Click the settings button in the start menu
       */
      clickStartMenuSettingsButton(): Chainable<void>;

      /**
       * Assert that the power menu is open
       */
      assertPowerMenuOpen(): Chainable<void>;

      /**
       * Click reload page in the power menu
       */
      clickReloadPage(): Chainable<void>;
    }
  }
}

// Helper functions
const getStartMenu = () => {
  return cy.get('div').filter((_, el) => {
    return (
      el.className.includes('fixed') &&
      el.className.includes('bottom-10') &&
      el.className.includes('left-0') &&
      el.className.includes('w-80')
    );
  });
};

const getHamburgerButton = () => {
  return getStartMenu().find('button[title*="menu"]').first();
};

const getSettingsButton = () => {
  return getStartMenu()
    .find('button')
    .filter((_, el) => {
      const title = el.getAttribute('title');
      return title === 'Settings';
    });
};

const getPowerButton = () => {
  return getStartMenu()
    .find('button')
    .filter((_, el) => {
      const title = el.getAttribute('title');
      return title === 'Power';
    });
};

const getPowerMenu = () => {
  return cy.get('div').filter((_, el) => {
    return (
      el.className.includes('absolute') &&
      el.className.includes('w-32') &&
      el.textContent?.includes('Reload Page')
    );
  });
};

const getSidebarOverlay = () => {
  return getStartMenu()
    .find('div')
    .filter((_, el) => {
      return (
        el.className.includes('absolute') &&
        el.className.includes('left-0') &&
        el.className.includes('top-0') &&
        el.className.includes('bottom-0') &&
        el.className.includes('z-10')
      );
    });
};

Cypress.Commands.add('openStartMenuItem', (itemName: string) => {
  cy.assertStartMenuOpen();

  getStartMenu().within(() => {
    cy.contains('div', itemName).should('exist').should('be.visible').click({ force: true });
  });

  cy.wait(300);
  cy.assertStartMenuClosed();
});

Cypress.Commands.add('openStartMenuSidebar', () => {
  cy.assertStartMenuOpen();
  getHamburgerButton().click({ force: true });
  cy.wait(350);
  cy.assertStartMenuSidebarExpanded();
});

Cypress.Commands.add('closeStartMenuSidebar', () => {
  cy.assertStartMenuOpen();
  getHamburgerButton().click({ force: true });
  cy.wait(350);
  cy.assertStartMenuSidebarCollapsed();
});

Cypress.Commands.add('assertStartMenuExists', () => {
  getStartMenu().should('exist');
});

Cypress.Commands.add('assertStartMenuItemExists', (itemName: string) => {
  cy.assertStartMenuOpen();
  getStartMenu().within(() => {
    cy.contains('div', itemName).should('exist').and('be.visible');
  });
});

Cypress.Commands.add('assertStartMenuSidebarExpanded', () => {
  getSidebarOverlay().should($overlay => {
    const styles = window.getComputedStyle($overlay[0]);
    const width = styles.width;

    expect(parseInt(width)).to.be.greaterThan(200);
  });

  getHamburgerButton().should('have.attr', 'title', 'Collapse menu');

  getStartMenu().within(() => {
    cy.contains('span', 'Settings').should('be.visible');
    cy.contains('span', 'Power').should('be.visible');
  });
});

Cypress.Commands.add('assertStartMenuSidebarCollapsed', () => {
  getSidebarOverlay().should($overlay => {
    const styles = window.getComputedStyle($overlay[0]);
    const width = styles.width;

    expect(parseInt(width)).to.be.lessThan(100);
  });

  getHamburgerButton().should('have.attr', 'title', 'Expand menu');

  getStartMenu().within(() => {
    cy.contains('span', 'Settings')
      .parent()
      .should($el => {
        const styles = window.getComputedStyle($el[0]);
        const opacity = parseFloat(styles.opacity);
        expect(opacity).to.equal(0);
      });
  });
});

Cypress.Commands.add('clickStartMenuPowerButton', () => {
  cy.assertStartMenuOpen();

  getPowerButton().click({ force: true });

  cy.wait(250);
});

Cypress.Commands.add('clickStartMenuSettingsButton', () => {
  cy.assertStartMenuOpen();

  getSettingsButton().click({ force: true });

  cy.wait(300);

  cy.assertStartMenuClosed();

  cy.assertWindowOpen('settings');
});

Cypress.Commands.add('assertPowerMenuOpen', () => {
  getPowerMenu().should('exist').and('be.visible');

  getPowerMenu().within(() => {
    cy.contains('span', 'Reload Page').should('exist').and('be.visible');
  });
});

Cypress.Commands.add('clickReloadPage', () => {
  // WARNING: Reloads the page! (as if its in the name) So handle it appropariaptely!
  cy.assertPowerMenuOpen();

  getPowerMenu().within(() => {
    cy.contains('div', 'Reload Page').click({ force: true });
  });
});

export {};
