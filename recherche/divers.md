---
layout: default
title: Divers
permalink: /recherche/divers/
lang: fr
lang_url: /en/research/misc/
nav: research
section: research
subnav: misc
---

<h1>Divers</h1>

<h2>Conférences</h2>

{% assign m = site.data.misc.conferences %}

{% if m.program_committee.size > 0 %}
<p><strong>Comités de programme</strong> : {{ m.program_committee | join: ", " }}</p>
{% endif %}

{% if m.chair.size > 0 %}
<p><strong>Responsable du comité de programme</strong> : {{ m.chair | join: ", " }}</p>
{% endif %}

{% if m.organizing_committee.size > 0 %}
<p><strong>Membre du comité d'organisation</strong> : {{ m.organizing_committee | join: ", " }}</p>
{% endif %}

<h2>Prix</h2>
<ul class="subtle-list">
  {% for p in site.data.misc.prizes %}
  <li>{{ p.text_fr }}</li>
  {% endfor %}
</ul>
