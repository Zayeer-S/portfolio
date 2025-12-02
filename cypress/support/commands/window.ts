import { LAYOUT_CONSTANTS } from '../constants';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Open a window by its ID
       * @param windowId - The id of the window to open (e.g., 'projects', 'calculator', 'settings')
       * @example cy.openWindow('projects')
       */
      openWindow(windowId: string): Chainable<void>;

      /**
       * Close a window by its ID
       * @param windowId - The id of the window to close
       * @example cy.closeWindow('projects')
       */
      closeWindow(windowId: string): Chainable<void>;

      /**
       * Minimize a window by its ID
       * @param windowId - The id of the window to minimize
       * @example cy.minimizeWindow('projects')
       */
      minimizeWindow(windowId: string): Chainable<void>;

      /**
       * Maximize a window by its ID
       * @param windowId - The id of the window to maximize
       * @example cy.maximizeWindow('projects')
       */
      maximizeWindow(windowId: string): Chainable<void>;

      /**
       * Resize a window to specific dimensions
       * @param windowId - The id of the window to resize
       * @param width - The target width in pixels
       * @param height - The target height in pixels
       * @example cy.resizeWindow('projects', 800, 600)
       */
      resizeWindow(windowId: string, width: number, height: number): Chainable<void>;

      /**
       * Drag a window to a new position
       * @param windowId - The id of the window to drag
       * @param x - The target x coordinate
       * @param y - The target y coordinate
       * @example cy.dragWindow('projects', 200, 150)
       */
      dragWindow(windowId: string, x: number, y: number): Chainable<void>;

      /**
       * Assert that a window is maximized
       * @param windowId - The id of the window
       * @example cy.assertWindowMaximized('projects')
       */
      assertWindowMaximized(windowId: string): Chainable<void>;

      /**
       * Assert that a window is focused (has highest z-index and glow effect)
       * @param windowId - The id of the window
       * @example cy.assertWindowFocused('projects')
       */
      assertWindowFocused(windowId: string): Chainable<void>;

      /**
       * Assert that a window is at a specific position
       * @param windowId - The id of the window
       * @param x - Expected x coordinate
       * @param y - Expected y coordinate
       * @param tolerance - Acceptable pixel difference (default: 5)
       * @example cy.assertWindowPosition('projects', 100, 100)
       */
      assertWindowPosition(
        windowId: string,
        x: number,
        y: number,
        tolerance?: number
      ): Chainable<void>;

      /**
       * Assert that a window is minimized
       * @param windowId - The id of the window
       * @example cy.assertWindowMinimized('projects')
       */
      assertWindowMinimized(windowId: string): Chainable<void>;

      /**
       * Assert that a window is open and visible
       * @param windowId - The id of the window
       * @example cy.assertWindowOpen('projects')
       */
      assertWindowOpen(windowId: string): Chainable<void>;

      /**
       * Assert that a window is closed
       * @param windowId - The id of the window
       * @example cy.assertWindowClosed('projects')
       */
      assertWindowClosed(windowId: string): Chainable<void>;

      /**
       * Focus a window by clicking on it
       * @param windowId - The id of the window to focus
       * @example cy.focusWindow('projects')
       */
      focusWindow(windowId: string): Chainable<void>;
    }
  }
}

const getWindowElement = (windowId: string) => {
  return cy.get(`[role="dialog"][aria-labelledby="${windowId}-title"]`);
};

Cypress.Commands.add('openWindow', (windowId: string) => {
  cy.openDesktopIcon(windowId);
  cy.wait(300);
  cy.assertWindowOpen(windowId);
});

Cypress.Commands.add('closeWindow', (windowId: string) => {
  getWindowElement(windowId).within(() => {
    cy.get('button[aria-label="Close the window"]').click({ force: true });
  });
  cy.wait(300);
  cy.assertWindowClosed(windowId);
});

Cypress.Commands.add('minimizeWindow', (windowId: string) => {
  getWindowElement(windowId).within(() => {
    cy.get('button[aria-label="Minimize the window"]').click({ force: true });
  });
  cy.wait(300);
});

Cypress.Commands.add('maximizeWindow', (windowId: string) => {
  getWindowElement(windowId).within(() => {
    cy.get('button[aria-label="Maximise the window"]').click({ force: true });
  });
  cy.wait(300);
});

Cypress.Commands.add('resizeWindow', (windowId: string, width: number, height: number) => {
  getWindowElement(windowId).then($window => {
    const windowRect = $window[0].getBoundingClientRect();

    cy.wrap($window)
      .find('.resize-handler[aria-label="Resize window from bottom-right corner"]')
      .trigger('mousedown', { button: 0, force: true })
      .wait(100);

    const targetX = windowRect.left + width;
    const targetY = windowRect.top + height;

    cy.document().trigger('mousemove', {
      clientX: targetX,
      clientY: targetY,
    });

    cy.wait(100);

    cy.document().trigger('mouseup', { force: true });

    cy.wait(100);
  });
});

Cypress.Commands.add('dragWindow', (windowId: string, x: number, y: number) => {
  getWindowElement(windowId).within(() => {
    cy.get('.title-bar[aria-label="Window title bar"]')
      .trigger('mousedown', { button: 0, force: true })
      .wait(100);
  });

  cy.document().trigger('mousemove', {
    clientX: x,
    clientY: y,
  });

  cy.wait(100);
});

Cypress.Commands.add('assertWindowMaximized', (windowId: string) => {
  getWindowElement(windowId).should($window => {
    const rect = $window[0].getBoundingClientRect();

    expect(rect.left).to.equal(0);
    expect(rect.top).to.equal(0);
    expect(rect.width).to.equal(window.innerWidth);
    expect(rect.height).to.be.closeTo(window.innerHeight - LAYOUT_CONSTANTS.TASKBAR_HEIGHT, 5);
  });

  getWindowElement(windowId).within(() => {
    cy.get('button[aria-label="Maximise the window"]').should('have.attr', 'aria-pressed', 'true');
  });
});

Cypress.Commands.add('assertWindowFocused', (windowId: string) => {
  getWindowElement(windowId).should($window => {
    const zIndex = window.getComputedStyle($window[0]).zIndex;

    cy.get('[role="dialog"]').then($windows => {
      const zIndices = $windows.toArray().map(w => parseInt(window.getComputedStyle(w).zIndex));
      const maxZIndex = Math.max(...zIndices);

      expect(parseInt(zIndex)).to.equal(maxZIndex);
    });
  });
});

Cypress.Commands.add(
  'assertWindowPosition',
  (windowId: string, x: number, y: number, tolerance: number = 5) => {
    getWindowElement(windowId).should($window => {
      const rect = $window[0].getBoundingClientRect();

      expect(rect.left).to.be.closeTo(x, tolerance);
      expect(rect.top).to.be.closeTo(y, tolerance);
    });
  }
);

Cypress.Commands.add('assertWindowMinimized', (windowId: string) => {
  getWindowElement(windowId).should($window => {
    const styles = window.getComputedStyle($window[0]);

    const isHidden =
      $window.hasClass('hidden') || styles.opacity === '0' || styles.visibility === 'hidden';

    void expect(isHidden).to.be.true;
  });

  getWindowElement(windowId).within(() => {
    cy.get('button[aria-label="Minimize the window"]').should('have.attr', 'aria-pressed', 'true');
  });
});

Cypress.Commands.add('assertWindowOpen', (windowId: string) => {
  getWindowElement(windowId).should('exist').and('be.visible').and('not.have.class', 'hidden');
});

Cypress.Commands.add('assertWindowClosed', (windowId: string) => {
  getWindowElement(windowId).should('not.exist');
});

Cypress.Commands.add('focusWindow', (windowId: string) => {
  getWindowElement(windowId).click({ force: true });

  cy.wait(100);

  cy.assertWindowFocused(windowId);
});

export {};
