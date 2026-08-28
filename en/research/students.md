---
layout: default
title: PhD Students
permalink: /en/research/students/
lang: en
lang_url: /recherche/doctorants/
nav: research
section: research
subnav: students
---

<h1>PhD students</h1>

<h2>Current PhD students</h2>
<ul class="entry-list">
  {% for s in site.data.students %}
  {% if s.status == "current" %}
  <li>
    <h3>{{ s.name }}</h3>
    <p class="topic">{{ s.topic_en }}{% include co-advisors.html student=s %}</p>
  </li>
  {% endif %}
  {% endfor %}
</ul>

{% assign past_students = site.data.students | where: "status", "past" %}
{% if past_students.size > 0 %}
<h2>Former PhD students</h2>
<ul class="entry-list">
  {% for s in past_students %}
  <li>
    <h3>{{ s.name }}</h3>
    <p class="topic">{{ s.topic_en }}{% include co-advisors.html student=s %}</p>
    {% include student-meta.html student=s %}
  </li>
  {% endfor %}
</ul>
{% endif %}
