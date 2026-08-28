---
layout: default
title: Home
permalink: /en/
lang: en
lang_url: /
nav: home
---

<div class="hero page-home">
  <img class="hero-photo" src="{{ '/assets/images/sc.svg' | relative_url }}" alt="Photo of Sébastien Canard">
  <div class="hero-text">
    <h1>Sébastien Canard</h1>
    <p class="role">Professor at Télécom Paris</p>

    <p>I have been a professor at Télécom Paris since 2023, where I work on cryptography applied to cybersecurity.</p>

    <p>I earned my PhD at Orange in 2003 under the supervision of Marc Girault, then spent twenty years there as a research engineer and security expert. In 2009, I obtained my habilitation (HDR) from Université de Caen Normandie, under the supervision of Brigitte Vallée, on the theme of "cryptography in the service of privacy protection".</p>

    <p>My current interests lie in advanced cryptographic mechanisms for protecting sensitive and personal data, whether in AI, the cloud, or connected devices (vehicles in particular). Another strand I care about: authenticated key agreement protocols built for devices with very limited computing power, what's often called "lightweight" cryptography. In recent years I've focused mainly on making these mechanisms resistant to a quantum attacker, without abandoning my older work on discrete logarithms and pairings.</p>

    <p>Outside of work, I like to cook and read a lot, novels as much as essays, old or recent. I also write a little, and play the cello.</p>

    <div class="contact-links">
      <a href="mailto:{{ site.author.email }}">Email</a>
      <a href="{{ site.author.linkedin }}">LinkedIn</a>
      <a href="{{ site.institution.team }}">C2 Team</a>
      <a href="{{ site.institution.department }}">INFRES Department</a>
      <a href="{{ site.institution.lab }}">LTCI Lab</a>
    </div>
  </div>
</div>
