---
layout: default
title: Projets étudiants encadrés
permalink: /enseignement/projets/
lang: fr
lang_url: /en/teaching/projects/
nav: teaching
section: teaching
subnav: projects
---

<h1>Projets étudiants encadrés</h1>
<p>J'encadre aussi beaucoup de projets sur les trois années du cycle ingénieur. Voici quelques exemples de projets <em>Artishow</em> sur la pédagogie de la cybersécurité, dans la continuité du <a href="https://eprint.iacr.org/2021/63">projet CYBERCRYPT</a> mené lorsque j'étais à Orange.</p>
<ul class="entry-list">
  {% for sp in site.data.student_projects %}
  <li>
    <h3>{% if sp.url %}<a href="{% if sp.url contains 'http' %}{{ sp.url }}{% else %}{{ sp.url | relative_url }}{% endif %}">{{ sp.name }}</a>{% else %}{{ sp.name }}{% endif %}</h3>
    <p class="meta">par {{ sp.authors }}{% if sp.year %} ({{ sp.year }}){% endif %}</p>
  </li>
  {% endfor %}
</ul>
