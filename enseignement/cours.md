---
layout: default
title: Cours dispensés
permalink: /enseignement/cours/
lang: fr
lang_url: /en/teaching/courses/
nav: teaching
section: teaching
subnav: courses
---

<h1>Cours dispensés</h1>

{% assign grouped = site.data.courses | group_by: "category_fr" %}
{% for g in grouped %}
<h2>{{ g.name }}</h2>
{% assign level_groups = g.items | group_by: "level" %}
{% for lg in level_groups %}
<h3>{{ lg.name }}</h3>
<ul class="entry-list">
  {% for c in lg.items %}
  <li>
    <p class="topic">{% if c.url %}<a href="{{ c.url }}">{{ c.name_fr }}</a>{% else %}{{ c.name_fr }}{% endif %}{% if c.note_fr and c.note_fr != "" %} ({{ c.note_fr }}){% endif %}</p>
  </li>
  {% endfor %}
</ul>
{% endfor %}
{% endfor %}
