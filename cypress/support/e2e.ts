import './commands';

before(() => {});

beforeEach(() => {
  cy.clearLocalStorage();
  cy.viewport(1920, 1080);
});

after(() => {});

afterEach(() => {});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('ResizeObserver')) {
    return false;
  }

  if (err.message.includes('Hydration')) {
    return false;
  }

  return true;
});
