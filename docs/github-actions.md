# GitHub Actions Workflows

Ce projet contient plusieurs workflows GitHub Actions pour tester automatiquement l'application avec différents frameworks E2E.

## 📋 Workflows disponibles

### 1. `e2e.yml` - Tests Playwright (Original)
- **Déclenché sur** : Push vers `main` et Pull Requests
- **Fonction** : Exécute les tests Playwright uniquement
- **Navigateur** : Chromium
- **Artefacts** : Rapports Playwright en cas d'échec

### 2. `cypress.yml` - Tests Cypress
- **Déclenché sur** : Push vers `main` et Pull Requests
- **Fonction** : Exécute les tests Cypress uniquement
- **Navigateur** : Electron (headless)
- **Artefacts** : Screenshots et vidéos Cypress en cas d'échec

### 3. `e2e-comparison.yml` - Comparaison complète
- **Déclenché sur** : Push vers `main` et Pull Requests
- **Fonction** : Exécute Playwright et Cypress en parallèle
- **Résultat** : Tableau de comparaison dans le résumé GitHub

## 🛠️ Configuration

### Cache stratégique
Les workflows utilisent des caches pour accélérer les builds :

```yaml
# Cache Playwright
- name: Cache Playwright deps
  uses: actions/cache@v3
  with:
    path: ~/.cache/ms-playwright
    key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}

# Cache Cypress
- name: Cache Cypress binary
  uses: actions/cache@v3
  with:
    path: ~/.cache/Cypress
    key: ${{ runner.os }}-cypress-${{ hashFiles('**/package-lock.json') }}
```

### Serveur de test
Les workflows utilisent `npm run preview` pour servir l'application buildée :

```yaml
- name: Start server and run Cypress tests
  run: |
    npm run preview &
    npx wait-on http://localhost:4173
    npm run cypress:run
```

## 📊 Artefacts générés

### Playwright
- **Rapports HTML** : `playwright-report/`
- **Traces** : Incluses dans le rapport
- **Screenshots** : Automatiques en cas d'échec

### Cypress
- **Screenshots** : `cypress/screenshots/`
- **Vidéos** : `cypress/videos/`
- **Rapports** : Console output

## 🚀 Optimisations

### Performances
- **Installation conditionnelle** : Les navigateurs ne sont installés que si le cache est vide
- **Builds parallèles** : Playwright et Cypress s'exécutent en parallèle
- **Cache des dépendances** : Réutilisation entre les runs

### Fiabilité
- **Timeouts configurés** : Cypress avec timeouts appropriés
- **Wait-on** : Attente que le serveur soit prêt
- **Artefacts d'échec** : Debugging facilité

## 🔧 Variables d'environnement

```yaml
env:
  CYPRESS_baseUrl: http://localhost:4173
```

## 📈 Métriques typiques

| Framework | Temps moyen | Cache hit | Cache miss |
|-----------|-------------|-----------|------------|
| Playwright | ~2-3 min | ~30s | ~2 min |
| Cypress | ~3-4 min | ~45s | ~3 min |

## 🐛 Debugging

### Échecs Playwright
1. Télécharger `playwright-report` des artefacts
2. Ouvrir `index.html` dans un navigateur
3. Consulter les traces et screenshots

### Échecs Cypress  
1. Télécharger `cypress-screenshots` et `cypress-videos`
2. Consulter les vidéos pour voir le comportement
3. Analyser les logs de console

## 📝 Exemple de résumé

Le workflow `e2e-comparison.yml` génère un résumé automatique :

```
## 🧪 Test Results Summary
| Framework | Status |
|-----------|--------|
| Playwright | ✅ Passed |
| Cypress | ✅ Passed |

See the individual job logs for detailed results and performance metrics. 