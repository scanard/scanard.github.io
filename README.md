# Site personnel — Sébastien Canard

Site Jekyll, bilingue FR/EN, prêt pour GitHub Pages.

## Structure

```
_config.yml          configuration du site
_data/                contenu modifiable sans toucher au HTML
  i18n.yml              textes d'interface (menu, boutons) en FR et EN
  publications.yml      liste des publications
  students.yml           doctorants (current / past)
  projects.yml           projets de recherche
  committees.yml         comités de programme (à compléter)
  courses.yml             cours dispensés
  student_projects.yml    projets étudiants encadrés
_layouts/default.html  gabarit commun à toutes les pages
_includes/              en-tête, navigation, pied de page
assets/css/style.css    feuille de style (sobre, accent bleu marine)
assets/images/          photo, favicon
index.md, recherche.md, enseignement.md     pages en français
en/index.md, en/research.md, en/teaching.md  pages en anglais
```

## Mettre à jour le contenu

- **Nouvelle publication** : ajouter un bloc dans `_data/publications.yml`.
- **Nouveau doctorant** : ajouter un bloc dans `_data/students.yml` (statut `current` ou `past`).
- **Nouveau projet de recherche** : ajouter un bloc dans `_data/projects.yml` (avec description FR et EN).
- **Comité de programme** : décommenter et compléter `_data/committees.yml`.
- **Nouveau cours** : ajouter un bloc dans `_data/courses.yml`.
- **Nouveau projet étudiant** : ajouter un bloc dans `_data/student_projects.yml`.

Aucune de ces modifications ne nécessite de toucher au HTML : le site se régénère automatiquement à partir de ces fichiers.

## Remplacer la photo

Une image générique (initiales "SC" sur fond bleu marine) est utilisée en attendant :
`assets/images/sc.svg`. Pour la remplacer par une vraie photo :

1. Place ta photo dans `assets/images/` (ex: `sc.jpg`).
2. Dans `index.md` et `en/index.md`, remplace `sc.svg` par `sc.jpg` dans la balise `<img>`.

## Tester le site en local

Nécessite Ruby installé.

```bash
bundle install
bundle exec jekyll serve
```

Le site sera visible sur `http://localhost:4000`.

Si tu avais déjà lancé `bundle install` avec une ancienne version de ce projet (gem `github-pages`), supprime le fichier `Gemfile.lock` avant de relancer `bundle install`, sinon Bundler peut réutiliser les anciennes versions figées de Jekyll/Liquid :

```bash
rm -f Gemfile.lock
bundle install
```

## Mettre le site en ligne sur GitHub Pages

Le déploiement se fait via une action GitHub (fichier `.github/workflows/pages.yml` déjà inclus), qui construit le site avec une version de Jekyll récente et le publie automatiquement à chaque `push` sur `main`. C'est plus robuste que le builder classique de GitHub Pages, qui reste figé sur de très vieilles versions de Jekyll/Liquid incompatibles avec les Ruby récents.

1. Crée un nouveau dépôt sur GitHub, par exemple `scanard.github.io` (ce nom précis permet d'avoir l'URL `https://scanard.github.io/` directement).
2. Dans ce dossier, initialise git et pousse le contenu :

   ```bash
   git init
   git add .
   git commit -m "Nouveau site personnel"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/scanard.github.io.git
   git push -u origin main
   ```

3. Sur GitHub, va dans **Settings → Pages**, et choisis comme source **GitHub Actions** (pas "Deploy from a branch").
4. Le premier déploiement se lance automatiquement (visible dans l'onglet **Actions** du dépôt). Le site sera publié en quelques minutes à l'adresse `https://scanard.github.io/`.
5. À chaque nouveau `git push` sur `main`, le site se reconstruit et se republie tout seul.

## À compléter

- `_data/committees.yml` : liste des comités de programme (vide pour l'instant).
- `assets/images/sc.svg` : à remplacer par une vraie photo.
- D'anciens projets (PACE, SIMPATIC, SUPERCLOUD, PAPAYA, PROMETHEUS) et anciens doctorants peuvent être ajoutés dans `_data/projects.yml` et `_data/students.yml` si tu veux un historique complet.
