declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Drag a desktop icon to a new grid position
       * @param iconId - The id of the desktop icon to drag
       * @param targetRow - The target row in the grid (0-indexed)
       * @param targetCol - The target column in the grid (0-indexed)
       * @example cy.dragDesktopIcon('projects', 2, 3)
       */
      dragDesktopIcon(iconId: string, targetRow: number, targetCol: number): Chainable<void>;

      /**
       * Assert that a desktop icon is at a specific grid position
       * @param iconId - The id of the desktop icon
       * @param row - The expected row in the grid (0-indexed)
       * @param col - The expected column in the grid (0-indexed)
       * @example cy.assertDesktopIconPosition('projects', 0, 0)
       */
      assertDesktopIconPosition(iconId: string, row: number, col: number): Chainable<void>;

      /**
       * Open a desktop icon (double-click on desktop, single-click on touch devices)
       * @param iconId - The id of the desktop icon to open
       * @example cy.openDesktopIcon('projects')
       */
      openDesktopIcon(iconId: string): Chainable<void>;

      /**
       * Assert that a desktop icon exists on the desktop
       * @param iconId - The id of the desktop icon
       * @example cy.assertDesktopIconExists('projects')
       */
      assertDesktopIconExists(iconId: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('dragDesktopIcon', (iconId: string, targetRow: number, targetCol: number) => {
  cy.contains('button[aria-label*="icon"]', new RegExp(iconId, 'i'))
    .should('exist')
    .parents('[role="gridcell"]')
    .then($sourceCell => {
      cy.get('[role="main"][aria-label="Desktop"]')
        .find('[role="gridcell"]')
        .eq(targetRow * 8 + targetCol)
        .then($targetCell => {
          cy.wrap($sourceCell)
            .find('button')
            .trigger('dragstart', {
              dataTransfer: new DataTransfer(),
            })
            .wait(100);

          cy.wrap($targetCell)
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop', {
              dataTransfer: new DataTransfer(),
            })
            .wait(100);

          cy.wrap($sourceCell).find('button').trigger('dragend');
        });
    });
});

Cypress.Commands.add('assertDesktopIconPosition', (iconId: string, row: number, col: number) => {
  const expectedIndex = row * 8 + col;

  cy.get('[role="main"][aria-label="Desktop"]')
    .find('[role="gridcell"]')
    .eq(expectedIndex)
    .within(() => {
      cy.contains('button[aria-label*="icon"]', new RegExp(iconId, 'i')).should('exist');
    });
});

Cypress.Commands.add('openDesktopIcon', (iconId: string) => {
  cy.viewport('macbook-15');

  cy.contains('button[aria-label*="icon"]', new RegExp(iconId, 'i'))
    .should('exist')
    .should('be.visible')
    .dblclick({ force: true });

  cy.wait(300);
});

Cypress.Commands.add('assertDesktopIconExists', (iconId: string) => {
  cy.get('[role="main"][aria-label="Desktop"]').within(() => {
    cy.contains('button[aria-label*="icon"]', new RegExp(iconId, 'i'))
      .should('exist')
      .should('be.visible');
  });
});

export {};
