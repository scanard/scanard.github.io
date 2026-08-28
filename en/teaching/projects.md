---
layout: default
title: Student Projects Supervised
permalink: /en/teaching/projects/
lang: en
lang_url: /enseignement/projets/
nav: teaching
section: teaching
subnav: projects
---

<h1>Student projects supervised</h1>
<p>I also supervise many projects throughout the three years of the engineering program. Below are a few examples of <em>Artishow</em> projects on cybersecurity education, following on from the <a href="https://eprint.iacr.org/2021/63">CYBERCRYPT project</a> I set up while at Orange.</p>
<ul class="entry-list">
  {% for sp in site.data.student_projects %}
  <li>
    <h3>{% if sp.url %}<a href="{% if sp.url contains 'http' %}{{ sp.url }}{% else %}{{ sp.url | relative_url }}{% endif %}">{{ sp.name }}</a>{% else %}{{ sp.name }}{% endif %}</h3>
    <p class="meta">by {{ sp.authors }}{% if sp.year %} ({{ sp.year }}){% endif %}</p>
  </li>
  {% endfor %}
</ul>
