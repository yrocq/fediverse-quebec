---
title: "Dans les rouages de mon indexeur Mastodon"
path: "/indexeur"
date: "2023-03-31"
author: "Yann"
---

Dans mon précédent billet, j'évoquais une présentation du fonctionnement de mon indexeur d'instances Mastodon, prévue pour "avant la publication du code source de l'algorithme de gestion des contenus de Twitter". Je pensais avoir une bonne marge de manoeuvre, mais contre toute attente, la plateforme aviaire a annoncé cet événement pour aujourd'hui, 12 h, heure du Pacifique. Bien que la violation d'une promesse ne soit pas la prérogative des milliardaires, je me sens obligé de respecter la mienne.

Comme vous le savez sans doute, Mastodon repose sur un réseau de serveurs décentralisés, appelés instances. Chacune d'elles maintient une liste des autres instances connues (des "pairs"), qu'elle bâtit à mesure que leurs utilisateurs et utilisatrices interagissent (suivi, mentions, boost, etc.)

Ces données sont publiques. Par exemple, la liste des instances connues par mon serveur [mastodonte.quebec](http://mastodonte.quebec) est accessible à [cette adresse](https://mastodonte.quebec/api/v1/instance/peers).

Pour construire mon répertoire, il m'a donc suffi de récupérer la liste de toutes les instances connue par mon serveur, de demander à ces dernières leur propre liste d'instances connues, et de renouveler l'opération. Cette méthode classique de programmation, qui répond au doux de "récursivité" m'a permis de récupérer rapidement l'adresse de plus de dix mille instances dans le monde entier.

J'extrais les instances québécoises de cet imposant volume en repérant divers mots clés ("Québec", "Montréal", "#qc"...)

Cette exploration des serveurs Mastodon m'a permis de faire différentes découvertes intéressantes. Par exemple, la nature ouverte du Fediverse impliquant, qu'un compte Mastodon peut suivre un compte d'une autre plateforme, j'ai découvert que le top 5 des instances exotiques les plus connectées était [Pleroma](https://pleroma.social/), [Peertube](https://joinpeertube.org), [Misskey](https://misskey-hub.net/en/), [Akkoma](https://akkoma.social) et [GoToSocial](https://gotosocial.org/).

J'ai également découvert une multitude d'instances avec des noms de la forme 2c9khrowt.activitypub-troll.cf ou 2guj58xo2.activitypub-troll.cf, dont le seul but semble de polluer et ralentir les serveurs, parce qu'il y a des gens qui n'ont pas de vie.

Pour mon prochain billet, je voulais fixer comme échéance l'arrestation de Donald Trump, mais il est déjà trop tard. Je vais donc me garder une petite gêne, et juste vous dire "À la prochaine".
