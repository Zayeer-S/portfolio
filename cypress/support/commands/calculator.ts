declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Switch calculator mode (arithmetic, algebraic, or boolean)
       * @param mode - The calculator mode to switch to
       */
      switchCalculatorMode(mode: 'arithmetic' | 'algebraic' | 'boolean'): Chainable<void>;

      /**
       * Click a calculator button by its aria-label or text content
       * @param buttonLabel - The button text or aria-label (e.g., '7', '+', '=', 'C')
       */
      clickCalculatorButton(buttonLabel: string): Chainable<void>;

      /**
       * Assert the calculator display shows a specific value
       * @param expectedValue - The expected display value
       */
      assertCalculatorDisplay(expectedValue: string): Chainable<void>;

      /**
       * Assert the calculator is in a specific mode
       * @param expectedMode - The expected mode (arithmetic, algebraic, or boolean)
       */
      assertCalculatorMode(expectedMode: 'arithmetic' | 'algebraic' | 'boolean'): Chainable<void>;

      /**
       * Set a variable in algebraic mode
       * @param variableName - The variable name (e.g., 'x', 'y')
       * @param value - The variable value
       */
      setCalculatorVariable(variableName: string, value: string): Chainable<void>;

      /**
       * Assert that a variable is set in algebraic mode
       * @param variableName - The variable name
       * @param expectedValue - The expected value
       */
      assertCalculatorVariable(variableName: string, expectedValue: string): Chainable<void>;

      /**
       * Clear the calculator display
       */
      clearCalculator(): Chainable<void>;

      /**
       * Perform a complete calculation by clicking multiple buttons
       * @param expression - Array of button labels to click in sequence
       */
      performCalculation(expression: string[]): Chainable<void>;

      /**
       * Assert the previous display (expression history) shows a specific value
       * @param expectedValue - The expected previous display value
       */
      assertCalculatorPreviousDisplay(expectedValue: string): Chainable<void>;

      /**
       * Open the calculator sidebar (mode selector)
       */
      openCalculatorSidebar(): Chainable<void>;

      /**
       * Close the calculator sidebar
       */
      closeCalculatorSidebar(): Chainable<void>;

      /**
       * Assert the calculator sidebar is open
       */
      assertCalculatorSidebarOpen(): Chainable<void>;

      /**
       * Clear all variables in algebraic mode
       */
      clearCalculatorVariables(): Chainable<void>;
    }
  }
}

const getCalculatorWindow = () => {
  return cy.get('[role="dialog"][aria-labelledby="calculator-title"]');
};

const getCalculatorDisplay = () => {
  return getCalculatorWindow().find('[role="status"][aria-label*="Calculator display"]');
};

const getCalculatorButton = (buttonLabel: string) => {
  return getCalculatorWindow()
    .find('[role="group"]')
    .find('button')
    .filter((index: number, el: HTMLElement) => {
      const text = el.textContent?.trim();
      const ariaLabel = el.getAttribute('aria-label');
      return !!(
        text === buttonLabel ||
        ariaLabel === buttonLabel ||
        ariaLabel?.includes(buttonLabel)
      );
    });
};

const getHamburgerButton = () => {
  return getCalculatorWindow().find('button[aria-label*="calculator mode menu"]');
};

const getSidebar = () => {
  return getCalculatorWindow()
    .find('div[role="navigation"][aria-label="Calculator modes"]')
    .parent();
};

const getModeButton = (mode: string) => {
  const modeLabels = {
    arithmetic: 'Arithmetic',
    algebraic: 'Algebraic',
    boolean: 'Boolean',
  };

  const modeLabel = modeLabels[mode as keyof typeof modeLabels];

  return getSidebar().find(`button[aria-label="Switch to ${modeLabel} mode"]`);
};

const getVariableDisplay = () => {
  return getCalculatorWindow()
    .find('div')
    .filter((_, el) => {
      return el.textContent?.includes('Variables:');
    });
};

Cypress.Commands.add('switchCalculatorMode', (mode: 'arithmetic' | 'algebraic' | 'boolean') => {
  cy.openCalculatorSidebar();
  getModeButton(mode).click({ force: true });
  cy.wait(200);

  cy.assertCalculatorMode(mode);
  cy.wait(300);
});

Cypress.Commands.add('clickCalculatorButton', (buttonLabel: string) => {
  getCalculatorButton(buttonLabel).should('exist').click({ force: true });
  cy.wait(100);
});

Cypress.Commands.add('assertCalculatorDisplay', (expectedValue: string) => {
  getCalculatorDisplay().within(() => {
    cy.get('div').last().should('have.text', expectedValue);
  });
});

Cypress.Commands.add(
  'assertCalculatorMode',
  (expectedMode: 'arithmetic' | 'algebraic' | 'boolean') => {
    const modeLabels = {
      arithmetic: 'Arithmetic',
      algebraic: 'Algebraic',
      boolean: 'Boolean',
    };

    const expectedLabel = modeLabels[expectedMode];

    getCalculatorWindow().within(() => {
      cy.contains('span', expectedLabel).should('exist').and('be.visible');
    });
  }
);

Cypress.Commands.add('setCalculatorVariable', (variableName: string, value: string) => {
  cy.assertCalculatorMode('algebraic');
  cy.clickCalculatorButton('VAR');
  cy.wait(200);

  getCalculatorWindow().within(() => {
    cy.get('input[placeholder="var"]').clear().type(variableName);
    cy.get('input[placeholder="value"]').clear().type(value);
  });

  getCalculatorWindow().within(() => {
    cy.contains('button', 'Set').click({ force: true });
  });
  cy.wait(69 + 200);
});

Cypress.Commands.add('assertCalculatorVariable', (variableName: string, expectedValue: string) => {
  getVariableDisplay().within(() => {
    cy.contains('span', `${variableName} = ${expectedValue}`).should('exist').and('be.visible');
  });
});

Cypress.Commands.add('clearCalculator', () => {
  cy.clickCalculatorButton('C');

  cy.assertCalculatorDisplay('0');
});

Cypress.Commands.add('performCalculation', (expression: string[]) => {
  expression.forEach(button => {
    cy.clickCalculatorButton(button);
  });
});

Cypress.Commands.add('assertCalculatorPreviousDisplay', (expectedValue: string) => {
  getCalculatorDisplay().within(() => {
    cy.get('div').first().should('have.text', expectedValue);
  });
});

Cypress.Commands.add('openCalculatorSidebar', () => {
  getHamburgerButton().then($button => {
    const ariaExpanded = $button.attr('aria-expanded');

    if (ariaExpanded === 'false') {
      cy.wrap($button).click({ force: true });
      cy.wait(350);
    }
  });

  cy.assertCalculatorSidebarOpen();
});

Cypress.Commands.add('closeCalculatorSidebar', () => {
  getHamburgerButton().then($button => {
    const ariaExpanded = $button.attr('aria-expanded');

    if (ariaExpanded === 'true') {
      cy.wrap($button).click({ force: true });
      cy.wait(350);
    }
  });

  getHamburgerButton().should('have.attr', 'aria-expanded', 'false');
});

Cypress.Commands.add('assertCalculatorSidebarOpen', () => {
  getHamburgerButton().should('have.attr', 'aria-expanded', 'true');

  getSidebar().should($sidebar => {
    const styles = window.getComputedStyle($sidebar[0]);
    const width = parseInt(styles.width);
    expect(width).to.be.greaterThan(180);
  });
});

Cypress.Commands.add('clearCalculatorVariables', () => {
  cy.assertCalculatorMode('algebraic');
  cy.clickCalculatorButton('CV');
  cy.wait(200);
  getVariableDisplay().should('not.exist');
});

export {};
