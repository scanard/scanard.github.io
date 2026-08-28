---
layout: default
title: Doctorants encadrés
permalink: /recherche/doctorants/
lang: fr
lang_url: /en/research/students/
nav: research
section: research
subnav: students
---

<h1>Doctorants encadrés</h1>

<h2>Doctorants actuels</h2>
<ul class="entry-list">
  {% for s in site.data.students %}
  {% if s.status == "current" %}
  <li>
    <h3>{{ s.name }}</h3>
    <p class="topic">{{ s.topic_fr }}{% include co-advisors.html student=s %}</p>
  </li>
  {% endif %}
  {% endfor %}
</ul>

{% assign past_students = site.data.students | where: "status", "past" %}
{% if past_students.size > 0 %}
<h2>Anciens doctorants</h2>
<ul class="entry-list">
  {% for s in past_students %}
  <li>
    <h3>{{ s.name }}</h3>
    <p class="topic">{{ s.topic_fr }}{% include co-advisors.html student=s %}</p>
    {% include student-meta.html student=s %}
  </li>
  {% endfor %}
</ul>
{% endif %}
