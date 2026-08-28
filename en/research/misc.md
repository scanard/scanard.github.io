---
layout: default
title: Other
permalink: /en/research/misc/
lang: en
lang_url: /recherche/divers/
nav: research
section: research
subnav: misc
---

<h1>Other</h1>

<h2>Conferences</h2>

{% assign m = site.data.misc.conferences %}

{% if m.program_committee.size > 0 %}
<p><strong>Program committees</strong>: {{ m.program_committee | join: ", " }}</p>
{% endif %}

{% if m.chair.size > 0 %}
<p><strong>Program committee chair</strong>: {{ m.chair | join: ", " }}</p>
{% endif %}

{% if m.organizing_committee.size > 0 %}
<p><strong>Organizing committee member</strong>: {{ m.organizing_committee | join: ", " }}</p>
{% endif %}

<h2>Awards</h2>
<ul class="subtle-list">
  {% for p in site.data.misc.prizes %}
  <li>{{ p.text_en }}</li>
  {% endfor %}
</ul>
