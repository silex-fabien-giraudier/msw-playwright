# Comparaison des tests Playwright vs Cypress

## Vue d'ensemble
Ce document compare les mêmes tests d'end-to-end implémentés avec Playwright et Cypress pour tester une application React avec MSW (Mock Service Worker).

## Configuration

### Playwright
- **Fichier de config**: `playwright.config.ts`
- **Fichier de test**: `tests/user-display.spec.ts`
- **Commandes**: `npm run test:e2e`, `npm run test:e2e:ui`

### Cypress  
- **Fichier de config**: `cypress.config.ts`
- **Fichier de test**: `cypress/e2e/user-display.cy.ts`
- **Commandes**: `npm run cypress:open`, `npm run cypress:run`

## Comparaison du code de test

### Playwright
```typescript
import { expect, test } from '@playwright/test';

test('displays user data from mocked API', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).PLAYWRIGHT = true;
  });

  await page.goto('/');

  await expect(page.locator('text=Loading user data...')).toBeHidden({ timeout: 10000 });

  await expect(page.locator('text=Alice')).toBeVisible();
  await expect(page.locator('text=admin')).toBeVisible();
  await expect(page.locator('h2:has-text("User Information")')).toBeVisible();
  await expect(page.locator('text=Name:')).toBeVisible();
  await expect(page.locator('text=Role:')).toBeVisible();
});
```

### Cypress
```typescript
describe('User Display', () => {
  it('displays user data from mocked API', () => {
    cy.window().then((win) => {
      (win as any).PLAYWRIGHT = true; // Enable MSW mocks for Cypress too
    });

    cy.visit('/');

    // Wait for loading to disappear
    cy.contains('Loading user data...').should('not.exist');

    // Verify user data is displayed
    cy.contains('Alice').should('be.visible');
    cy.contains('admin').should('be.visible');
    
    // Verify UI elements are present
    cy.get('h2').contains('User Information').should('be.visible');
    cy.contains('Name:').should('be.visible');
    cy.contains('Role:').should('be.visible');
  });
});
```

## Différences principales

### Syntaxe
- **Playwright**: Utilise `async/await` et `expect(element).toBeVisible()`
- **Cypress**: Utilise des chaînes de commandes et `.should('be.visible')`

### Sélecteurs
- **Playwright**: `page.locator('text=Alice')`, `page.locator('h2:has-text("User Information")')`
- **Cypress**: `cy.contains('Alice')`, `cy.get('h2').contains('User Information')`

### Gestion de l'asynchrone
- **Playwright**: Gestion explicite avec `async/await`
- **Cypress**: Gestion automatique avec la queue de commandes

### Attentes
- **Playwright**: `toBeHidden({ timeout: 10000 })`
- **Cypress**: `should('not.exist')` (retry automatique)

## Avantages et inconvénients

### Playwright
**Avantages**:
- Support multi-navigateurs (Chrome, Firefox, Safari, Edge)
- Gestion native des API et du réseau
- Parallélisation des tests
- Debugging avancé avec traces

**Inconvénients**:
- Syntaxe plus verbeuse
- Courbe d'apprentissage plus raide

### Cypress
**Avantages**:
- Syntaxe plus intuitive et lisible
- Interface utilisateur excellent pour le debugging
- Communauté large et documentation riche
- Retry automatique des assertions

**Inconvénients**:
- Limité à Chrome/Chromium par défaut
- Exécution dans le navigateur (limitations)
- Pas de support natif pour les tests parallèles

## Recommandations

- **Utilisez Playwright** si vous avez besoin de tester sur plusieurs navigateurs ou si vous travaillez avec des API complexes
- **Utilisez Cypress** si vous privilégiez la facilité d'utilisation et une interface de debugging intuitive 