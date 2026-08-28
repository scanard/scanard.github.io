---
layout: default
title: Projets de recherche
permalink: /recherche/projets/
lang: fr
lang_url: /en/research/projects/
nav: research
section: research
subnav: projects
---

<h1>Projets de recherche</h1>

<h2>Projets actuels</h2>
<ul class="entry-list">
  {% for proj in site.data.projects %}
  {% if proj.status == "current" %}
  <li>
    <h3>{{ proj.name }} <span class="meta">{{ proj.partners }}</span></h3>
    <p>{{ proj.description_fr }}</p>
  </li>
  {% endif %}
  {% endfor %}
</ul>

{% assign past_projects = site.data.projects | where: "status", "past" %}
{% if past_projects.size > 0 %}
<h2>Anciens projets</h2>
<ul class="entry-list">
  {% for proj in past_projects %}
  <li>
    <h3>{{ proj.name }}
      {% capture meta %}{% if proj.period and proj.period != "" %}{{ proj.period }}{% endif %}{% if proj.period and proj.period != "" and proj.budget and proj.budget != "" %} · {% endif %}{% if proj.budget and proj.budget != "" %}{{ proj.budget }}{% endif %}{% endcapture %}
      {% assign meta = meta | strip %}
      {% if meta != "" %}<span class="meta">{{ meta }}</span>{% endif %}
    </h3>
    <p>{{ proj.description_fr }}</p>
    {% if proj.url and proj.url != "" %}<p><a href="{{ proj.url }}">Site du projet →</a></p>{% endif %}
  </li>
  {% endfor %}
</ul>
{% endif %}
