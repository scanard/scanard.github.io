---
layout: default
title: Publications
permalink: /en/research/publications/
lang: en
lang_url: /recherche/publications/
nav: research
section: research
subnav: publications
---

<h1>Publications</h1>

<h2>Recent publications</h2>
<ul class="pub-list">
  {% for p in site.data.publications %}
  <li>
    <p class="pub-title">{{ p.authors }}: {% if p.url and p.url != "" %}<a href="{{ p.url }}">{{ p.title }}</a>{% else %}{{ p.title }}{% endif %}</p>
    <p class="pub-venue">{{ p.venue }} ({{ p.year }})</p>
  </li>
  {% endfor %}
</ul>
<p><a href="{{ site.institution.dblp }}">Full list (DBLP) →</a></p>
