source "https://rubygems.org"

# On utilise Jekyll directement (version récente), plutôt que la gem
# "github-pages" qui fige de très vieilles versions de Jekyll/Liquid
# incompatibles avec les Ruby récents (>= 3.2). Le site est déployé via
# une action GitHub (.github/workflows/pages.yml), donc on n'est plus
# limité à l'environnement figé du builder GitHub Pages classique.
gem "jekyll", "~> 4.3"

gem "webrick", "~> 1.8" # nécessaire pour "jekyll serve" avec Ruby >= 3
