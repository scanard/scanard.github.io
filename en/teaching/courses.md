---
layout: default
title: Courses Taught
permalink: /en/teaching/courses/
lang: en
lang_url: /enseignement/cours/
nav: teaching
section: teaching
subnav: courses
---

<h1>Courses taught</h1>

{% assign grouped = site.data.courses | group_by: "category_en" %}
{% for g in grouped %}
<h2>{{ g.name }}</h2>
{% assign level_groups = g.items | group_by: "level" %}
{% for lg in level_groups %}
<h3>{{ lg.name }}</h3>
<ul class="entry-list">
  {% for c in lg.items %}
  <li>
    <p class="topic">{% if c.url %}<a href="{{ c.url }}">{{ c.name_en }}</a>{% else %}{{ c.name_en }}{% endif %}{% if c.note_en and c.note_en != "" %} ({{ c.note_en }}){% endif %}</p>
  </li>
  {% endfor %}
</ul>
{% endfor %}
{% endfor %}
