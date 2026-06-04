# MediTrack-front

Application **Angular 17** (standalone components) de suivi de stock de medicaments.
Ce depot est un **starter** pour une formation CI/CD GitHub Actions : vous allez ecrire
vous-meme les workflows dans `.github/workflows/`.

## Prerequis

- **Node.js 18+** (et npm)
- Un navigateur **Chrome / Chromium** pour executer les tests unitaires (Karma)

## Installation

```bash
npm install
```

## Scripts

| Script             | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `npm start`        | Lance le serveur de dev (`ng serve`) sur http://localhost:4200 |
| `npm run build`    | Build de production dans `dist/meditrack-front`          |
| `npm test`         | Tests unitaires Karma en mode watch (Chrome)             |
| `npm run test:ci`  | Tests unitaires une seule fois en `ChromeHeadlessCI`     |
| `npm run lint`     | Analyse statique ESLint                                  |

## Tests en CI

Le script `test:ci` utilise un custom launcher **ChromeHeadlessCI** defini dans
`karma.conf.js` (flags `--no-sandbox --disable-gpu --headless`). C'est ce launcher
qu'il faut utiliser dans GitHub Actions, ou un Chrome headless est present sur les
runners `ubuntu-latest`.

## A faire par l'apprenant

Les workflows GitHub Actions ne sont **pas** fournis. A vous de les creer dans
`.github/workflows/` :

- **`ci-angular`** : `npm ci`, `npm run lint`, `npm run test:ci`, `npm run build`
  (idealement avec une **matrice** de versions Node). Publier le dossier **`dist/`**
  comme **artifact**.
- **`deploy-pages`** : publier le contenu de `dist/meditrack-front/browser` sur
  **GitHub Pages**.

> L'artifact a publier est le dossier `dist/` produit par `npm run build`.
