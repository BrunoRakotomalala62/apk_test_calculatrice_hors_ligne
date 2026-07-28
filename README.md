# 📱 Calculatrice PWA — Guide de déploiement

Une calculatrice simple, installable sur téléphone, qui fonctionne **entièrement hors ligne** après installation.

## 📦 Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Interface de la calculatrice + logique + bouton "Installer" |
| `manifest.webmanifest` | Métadonnées PWA (nom, icône, couleur, mode plein écran) |
| `sw.js` | Service Worker — met en cache tout pour fonctionner hors ligne |
| `icon.svg` | Icône vectorielle |
| `icon-192.png` / `icon-512.png` | Icônes PNG (obligatoires pour iOS) |

---

## 🚀 Déploiement — 3 options gratuites

### Option 1 — Netlify Drop (le plus rapide, ~30 secondes)
1. Téléchargez ce dossier `/pwa-calculatrice/` sur votre ordinateur (via Zaro → clic droit → Télécharger).
2. Allez sur https://app.netlify.com/drop
3. **Glissez-déposez** le dossier dans la zone indiquée.
4. Netlify vous donne une URL HTTPS du type `https://random-name-123.netlify.app`. ✅ C'est prêt !

### Option 2 — GitHub Pages
1. Créez un nouveau dépôt public sur GitHub (ex. `ma-calculatrice`).
2. Uploadez tous les fichiers du dossier à la racine du dépôt.
3. Allez dans **Settings → Pages → Source → main branch / (root)** puis **Save**.
4. Attendez 1–2 minutes → l'URL sera `https://<votre-user>.github.io/ma-calculatrice/`

### Option 3 — Vercel
1. Créez un compte sur https://vercel.com
2. `Add New Project` → importez le dossier ou uploadez-le → **Deploy**.

⚠️ **HTTPS obligatoire** : les 3 services fournissent HTTPS automatiquement. Sans HTTPS, le service worker ne s'active pas et le bouton "Installer" n'apparaît pas.

---

## 📲 Installer sur votre téléphone

### Sur Android (Chrome, Edge, Samsung Internet)
1. Ouvrez l'URL de votre app dans Chrome.
2. Un bouton **"Installer"** apparaît en haut à droite de l'app (ou dans le menu ⋮ → **"Installer l'application"**).
3. Confirmez → l'icône apparaît sur l'écran d'accueil.
4. Ouvrez-la : elle se lance en plein écran, comme une vraie app.

### Sur iPhone / iPad (Safari uniquement)
1. Ouvrez l'URL dans **Safari** (pas Chrome sur iOS).
2. Appuyez sur le bouton **Partager** (carré avec flèche vers le haut).
3. Faites défiler et choisissez **"Sur l'écran d'accueil"**.
4. Confirmez → l'icône apparaît.

---

## ✈️ Test du mode hors ligne

Après installation :
1. Coupez le Wi-Fi + les données mobiles (mode avion).
2. Ouvrez l'app → **elle fonctionne parfaitement**. ✅

C'est le service worker qui met tout en cache dès la première visite.

---

## 🎨 Personnalisation

- **Couleur** : modifiez `theme_color` dans `manifest.webmanifest` et la couleur `#B8A9E8` dans `index.html`.
- **Nom** : modifiez `name` / `short_name` dans le manifest et le `<title>` dans `index.html`.
- **Icône** : remplacez `icon.svg` et régénérez `icon-192.png` / `icon-512.png` (outils : https://realfavicongenerator.net ou https://maskable.app).

---

## 🔧 Mise à jour

Chaque fois que vous modifiez le code :
1. Incrémentez la version du cache dans `sw.js` (ex. `calculatrice-v1` → `calculatrice-v2`).
2. Redéployez.
3. À la prochaine ouverture, l'ancien cache est supprimé et le nouveau chargé.

---

Fait avec ❤️ dans Zaro.
