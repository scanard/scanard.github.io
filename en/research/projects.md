---
layout: default
title: Research Projects
permalink: /en/research/projects/
lang: en
lang_url: /recherche/projets/
nav: research
section: research
subnav: projects
---

<h1>Research projects</h1>

<h2>Current projects</h2>
<ul class="entry-list">
  {% for proj in site.data.projects %}
  {% if proj.status == "current" %}
  <li>
    <h3>{{ proj.name }} <span class="meta">{{ proj.partners_en }}</span></h3>
    <p>{{ proj.description_en }}</p>
  </li>
  {% endif %}
  {% endfor %}
</ul>

{% assign past_projects = site.data.projects | where: "status", "past" %}
{% if past_projects.size > 0 %}
<h2>Past projects</h2>
<ul class="entry-list">
  {% for proj in past_projects %}
  <li>
    <h3>{{ proj.name }}
      {% capture meta %}{% if proj.period and proj.period != "" %}{{ proj.period }}{% endif %}{% if proj.period and proj.period != "" and proj.budget and proj.budget != "" %} · {% endif %}{% if proj.budget and proj.budget != "" %}{{ proj.budget }}{% endif %}{% endcapture %}
      {% assign meta = meta | strip %}
      {% if meta != "" %}<span class="meta">{{ meta }}</span>{% endif %}
    </h3>
    <p>{{ proj.description_en }}</p>
    {% if proj.url and proj.url != "" %}<p><a href="{{ proj.url }}">Project website →</a></p>{% endif %}
  </li>
  {% endfor %}
</ul>
{% endif %}
