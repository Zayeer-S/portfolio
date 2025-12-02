declare global {
  namespace Cypress {
    interface Chainable {
      /* Open the start menu */
      openStartMenu(): Chainable<void>;

      /* Close the start menu */
      closeStartMenu(): Chainable<void>;

      /**
       * Drag a taskbar icon to a new position in the taskbar
       * @param windowId - The id of the window whose taskbar icon to drag
       * @param targetIndex - Target position index (0-indexed)
       * @example cy.dragTaskbarIcon('bruh', 2) moves taskbar icon to the 3rd position
       */
      dragTaskbarIcon(windowId: string, targetIndex: number): Chainable<void>;

      /**
       * Click taskbar icon to toggle minimize/maximize
       * @param windowId - The id of the window whose taskbar icon to click
       */
      clickTaskbarIcon(windowId: string): Chainable<void>;

      /**
       * Assert that a taskbar icon exists for a specific window
       * @param windowId - The id of the window to assert
       */
      assertTaskbarIconExists(windowId: string): Chainable<void>;

      /**
       * Assert the state of a taskbar icon (minimzed or not)
       * @param windowId - The id of the window
       * @param isMinimized - True = expected minimized, False = expected not minimized/expected maximized
       */
      assertTaskbarIconState(windowId: string, isMinimized: boolean): Chainable<void>;

      /**
       * Assert the order of taskbar icons
       * @param expectedOrder - Array of window ids in expected order
       * @example cy.assertTaskbarOrder(['projects', 'calculator', 'settings'])
       */
      assertTaskbarOrder(expectedOrder: string[]): Chainable<void>;

      /**
       * Assert that the system tray displays the correct time format
       */
      assertSystemTrayTime(): Chainable<void>;

      /**
       * Assert that the start menu is open
       */
      assertStartMenuOpen(): Chainable<void>;

      /**
       * Assert that the start menu is closed
       */
      assertStartMenuClosed(): Chainable<void>;

      /**
       * Get the count of taskbar items
       */
      getTaskbarItemCount(): Chainable<number>;
    }
  }
}

const getTaskbar = () => {
  return cy.get('[role="toolbar"][aria-label="Taskbar"]');
};

const getStartButton = () => {
  return getTaskbar().find('button[aria-label="Open start menu"]');
};

const getTaskbarIcon = (windowId: string) => {
  return getTaskbar()
    .find('[role="group"][aria-label="Open windows"]')
    .find(`button[data-taskbar-item="${windowId}"]`);
};

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

Cypress.Commands.add('openStartMenu', () => {
  getStartButton().click({ force: true });
  cy.wait(250);
  cy.assertStartMenuOpen();
});

Cypress.Commands.add('closeStartMenu', () => {
  cy.get('body').click(0, 0, { force: true });
  cy.wait(250);
  cy.assertStartMenuClosed();
});

Cypress.Commands.add('dragTaskbarIcon', (windowId: string, targetIndex: number) => {
  getTaskbarIcon(windowId).then($sourceIcon => {
    const sourceRect = $sourceIcon[0].getBoundingClientRect();

    getTaskbar()
      .find('[role="group"][aria-label="Open windows"]')
      .find('button[data-taskbar-item]')
      .eq(targetIndex)
      .then($targetIcon => {
        const targetRect = $targetIcon[0].getBoundingClientRect();

        cy.wrap($sourceIcon)
          .trigger('mousedown', {
            button: 0,
            clientX: sourceRect.left + sourceRect.width / 2,
            clientY: sourceRect.top + sourceRect.height / 2,
            force: true,
          })
          .wait(100);

        cy.document().trigger('mousemove', {
          clientX: targetRect.left + targetRect.width / 2,
          clientY: targetRect.top + targetRect.height / 2,
        });

        cy.wait(100);

        cy.document().trigger('mouseup', { force: true });

        cy.wait(200);
      });
  });
});

Cypress.Commands.add('clickTaskbarIcon', (windowId: string) => {
  getTaskbarIcon(windowId).click({ force: true });
  cy.wait(200);
});

Cypress.Commands.add('assertTaskbarIconExists', (windowId: string) => {
  getTaskbarIcon(windowId).should('exist').and('be.visible');
});

Cypress.Commands.add('assertTaskbarIconState', (windowId: string, isMinimized: boolean) => {
  getTaskbarIcon(windowId).should($icon => {
    const ariaPressed = $icon.attr('aria-pressed');
    const styles = window.getComputedStyle($icon[0]);
    const opacity = parseFloat(styles.opacity);

    if (isMinimized) {
      expect(ariaPressed).to.equal('false');
      expect(opacity).to.be.lessThan(1);
    } else {
      expect(ariaPressed).to.equal('true');
      expect(opacity).to.equal(1);
    }
  });

  getTaskbarIcon(windowId).should($icon => {
    const ariaLabel = $icon.attr('aria-label') || '';
    const hasMinimizedText = ariaLabel.includes('(minimized)');

    if (isMinimized) {
      expect(hasMinimizedText).to.be.true;
    } else {
      expect(hasMinimizedText).to.be.false;
    }
  });
});

Cypress.Commands.add('assertTaskbarOrder', (expectedOrder: string[]) => {
  getTaskbar()
    .find('[role="group"][aria-label="Open windows"]')
    .find('button[data-taskbar-item]')
    .should('have.length', expectedOrder.length)
    .then($icons => {
      const actualOrder = $icons.toArray().map(icon => icon.getAttribute('data-taskbar-item'));

      expect(actualOrder).to.deep.equal(expectedOrder);
    });
});

Cypress.Commands.add('assertSystemTrayTime', () => {
  cy.get('[role="status"][aria-label="System tray"]').within(() => {
    cy.get('div[aria-label*="Current time"]').should($time => {
      const timeText = $time.text();
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      expect(timeText).to.match(timeRegex);
    });

    cy.get('div[aria-label*="Current date"]').should($date => {
      const dateText = $date.text();
      const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      expect(dateText).to.match(dataRegex);
    });
  });
});

Cypress.Commands.add('assertStartMenuOpen', () => {
  getStartMenu().should($menu => {
    const styles = window.getComputedStyle($menu[0]);
    const transform = styles.transform;
    const opacity = parseFloat(styles.opacity);

    expect(opacity).to.equal(1);
    expect(transform).to.not.include('translateY');
    expect($menu.hasClass('pointer-events-none')).to.be.false;
  });
});

Cypress.Commands.add('assertStartMenuClosed', () => {
  getStartMenu().should($menu => {
    const styles = window.getComputedStyle($menu[0]);
    const hasPointerEvents = $menu.hasClass('pointer-events-none');
    const opacity = parseFloat(styles.opacity);

    expect(hasPointerEvents || opacity === 0).to.be.true;
  });
});

Cypress.Commands.add('getTaskbarItemCount', () => {
  return getTaskbar()
    .find('[role="group"][aria-label="Open windows]')
    .find('button[data-taskbar-item]')
    .its('length');
});

export {};
