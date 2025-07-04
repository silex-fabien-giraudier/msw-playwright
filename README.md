# MSW + Playwright Demo

Une application web React + Vite démonstriant l'intégration de **Mock Service Worker (MSW)** pour simuler des APIs et **Playwright** pour les tests E2E automatisés.

## 📋 Aperçu du Projet

Ce repository contient une application web moderne qui illustre les meilleures pratiques pour :

- **Développement avec des APIs mockées** : Utilisation de MSW pour simuler des endpoints d'API
- **Tests End-to-End automatisés** : Tests Playwright pour valider le comportement de l'application
- **CI/CD avec GitHub Actions** : Pipeline automatisé pour les tests sur chaque push/PR
- **Configuration TypeScript moderne** : Support complet pour React 18 et les modules ES

## 🏗️ Architecture

```
msw-playwright/
├── src/
│   ├── main.tsx              # Point d'entrée de l'application
│   ├── App.tsx               # Composant principal avec logique de fetch
│   ├── vite-env.d.ts         # Déclarations TypeScript
│   └── mocks/
│       ├── browser.ts        # Configuration MSW pour le navigateur
│       └── handlers.ts       # Handlers MSW pour les endpoints mockés
├── tests/
│   └── user-display.spec.ts  # Tests E2E Playwright
├── .github/workflows/
│   └── ci.yml                # Pipeline CI/CD GitHub Actions
├── public/
│   └── mockServiceWorker.js  # Service Worker MSW
├── playwright.config.ts      # Configuration Playwright
├── vite.config.ts           # Configuration Vite
└── package.json
```

## 🚀 Fonctionnalités

### Application React
- **Fetch de données utilisateur** depuis l'endpoint `/api/user`
- **États de chargement** et gestion d'erreurs
- **Interface utilisateur moderne** avec affichage des informations utilisateur
- **Support TypeScript complet** avec types stricts

### Mock Service Worker (MSW)
- **Simulation d'API** : Endpoint `GET /api/user` retournant `{ name: 'Alice', role: 'admin' }`
- **Activation automatique** en développement et dans les tests
- **Détection d'environnement** via `window.PLAYWRIGHT` pour les tests

### Tests Playwright
- **Tests E2E complets** : Navigation, attente du chargement, assertions
- **Vérification du contenu** : S'assure que "Alice" et "admin" sont affichés
- **Configuration multi-navigateurs** : Support Chrome, Firefox, Safari
- **Rapports HTML** automatiques

### CI/CD GitHub Actions
- **Build automatique** sur push/PR
- **Tests headless** dans l'environnement CI
- **Artefacts de test** : Rapports Playwright sauvegardés
- **Support multi-branches** : main et develop

## 📦 Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd msw-playwright

# Installer les dépendances
npm install

# Installer les navigateurs Playwright (pour les tests)
npx playwright install
```

## 🛠️ Utilisation

### Développement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Build de Production

```bash
# Construire l'application
npm run build

# Prévisualiser le build
npm run preview
```

### Tests E2E

#### Playwright
```bash
# Exécuter les tests Playwright (headless)
npm run test:e2e

# Exécuter les tests avec interface graphique
npm run test:e2e:ui

# Voir le dernier rapport de tests
npx playwright show-report
```

#### Cypress
```bash
# Exécuter les tests Cypress (headless)
npm run cypress:run

# Ouvrir l'interface Cypress
npm run cypress:open
```

### Comparaison des Frameworks

Ce projet inclut des tests identiques avec **Playwright** et **Cypress** pour comparer :
- **Performance** : Playwright ~4,8s vs Cypress ~13,4s
- **Syntaxe** : Playwright (async/await) vs Cypress (chaînes de commandes)
- **Debugging** : Playwright (traces) vs Cypress (interface graphique)

Voir `test-comparison.md` pour une comparaison détaillée.

## 🔧 Configuration

### Variables d'Environnement

- `DEV` : Détecté automatiquement par Vite en mode développement
- `window.PLAYWRIGHT` : Flag injecté par les tests pour activer MSW

### MSW (Mock Service Worker)

Les mocks sont configurés dans `src/mocks/handlers.ts` :

```typescript
export const handlers = [
  rest.get('/api/user', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ name: 'Alice', role: 'admin' }))
  ),
];
```

### Playwright

Configuration dans `playwright.config.ts` :
- **Base URL** : `http://localhost:4173` (serveur preview)
- **Navigateurs** : Chrome (configurable pour Firefox/Safari)
- **Serveur web** : Démarre automatiquement `npm run preview`
- **Rapports** : HTML avec traces sur échec

## 🧪 Tests

### Structure des Tests

Les tests E2E vérifient :

1. **Navigation** vers l'application
2. **Injection du flag** `window.PLAYWRIGHT`
3. **Attente du chargement** des données
4. **Assertions** sur le contenu affiché :
   - Nom "Alice" visible
   - Rôle "admin" visible
   - Section "User Information" présente

### Exemple de Test

```typescript
test('displays user data from mocked API', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).PLAYWRIGHT = true;
  });

  await page.goto('/');
  await expect(page.locator('text=Loading user data...')).toBeHidden();
  await expect(page.locator('text=Alice')).toBeVisible();
});
```

## 🔄 CI/CD

Le pipeline GitHub Actions :

1. **Installation** des dépendances avec `npm ci`
2. **Build** de l'application avec `npm run build`
3. **Installation** des navigateurs Playwright
4. **Exécution** des tests E2E
5. **Sauvegarde** des rapports de test

Déclenché sur :
- Push vers `main` ou `develop`
- Pull requests vers `main`

## 🛡️ TypeScript

Configuration TypeScript moderne avec :
- **Target ES2020** pour les fonctionnalités modernes
- **Module ESNext** pour les imports ES6+
- **JSX React** pour React 18
- **Types Vite** pour `import.meta`
- **Déclarations personnalisées** pour MSW et Playwright

## 📚 Technologies Utilisées

- **[React 18](https://react.dev/)** : Framework UI avec hooks modernes
- **[Vite](https://vitejs.dev/)** : Build tool rapide et moderne
- **[TypeScript](https://www.typescriptlang.org/)** : Typage statique
- **[MSW](https://mswjs.io/)** : Mock Service Worker pour les APIs
- **[Playwright](https://playwright.dev/)** : Framework de tests E2E
- **[GitHub Actions](https://github.com/features/actions)** : CI/CD

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🔗 Ressources Utiles

- [Documentation MSW](https://mswjs.io/docs/)
- [Guide Playwright](https://playwright.dev/docs/intro)
- [Documentation Vite](https://vitejs.dev/guide/)
- [React Hooks](https://react.dev/reference/react)

---

**Note** : Ce projet est conçu comme une démonstration des meilleures pratiques pour l'intégration de MSW et Playwright dans une application React moderne. 