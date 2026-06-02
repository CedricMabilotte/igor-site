# CLAUDE.md — Repo projetplanb-site

**Carnet vivant** pour la collaboration avec un agent Claude sur ce repo.
À lire au début de chaque session.

---

## État au 20 mai 2026 — site construit, en attente de déploiement

Site Projet Plan B dérivé de `goorg-site`, nettoyé et reconstruit avec l'identité
propre d'Projet Plan B (charte @graphiste niveau 1).

- **Domaine** : `projetplanb.org`
- **Stack** : Astro 6 + MDX + React + D3
- **Déploiement** : Netlify (à connecter — étape côté Ced)
- **Repo GitHub** : `CedricMabilotte/projetplanb-site`
- **Build** : `npm run dev` (port 4321) · `npm run build` · `npm run preview`
- **Node** : 22
- **Pages** : `/` `/corpus` `/methode` `/a-propos` — contenu d'illustration (mock),
  production de corpus réel en pause (décision Ced 2026-05-20)
- **Identité** : charte `resources/shared/identites/identite-projetplanb.yaml` v2 —
  moderne / dynamique / nature : fond clair verté, vert vivant #2E7D4E,
  accent terre #E2622E ; Inter (display + UI) + Source Serif 4 (corps) +
  IBM Plex Mono ; mark « la pousse tressée » — illustration feuilles +
  tige tressée + racines (`public/mark-projetplanb.svg`)
- **Titre du site** : « Projet Plan B » / sous-titre
  « Refaire culture en Communs »

## Reste à provisionner

- [x] `npm install` (node_modules + package-lock.json)
- [x] Symlink `resources/sites/projetplanb-org/` → `claude-sites/projetplanb-site/`
- [x] Build vérifié (4 pages)
- [ ] `git init` + premier commit + push vers GitHub
- [ ] Connexion Netlify au repo (étape dashboard — voir runbook)
- [ ] DNS Gandi `projetplanb.org` → Netlify
- [ ] HTTPS Let's Encrypt actif

## Spécificité Projet Plan B

### Collections de contenu (`src/content/`)

Cinq collections — alignées avec les 5 types de production du `prompt.md` Projet Plan B :

| Collection | Type frontmatter | Description |
|---|---|---|
| `propositions` | `proposition` | Réponses courtes actionnables — pipeline/inbox du workspace |
| `tactiques` | `tactique` | Protocoles d'action séquencés < 30 jours, 3 personnes |
| `analyses` | `analyse-juridique` | Études complètes de dispositifs juridiques — corpus pérenne |
| `cas-etudes` | `cas-etude` | Mouvements documentés comme précédents — corpus pérenne |
| `dispositifs` | (entrées de glossaire) | Fiches juridiques courtes (asso 1901, SCIC, GFA, OFS, etc.) |

Schémas Astro dans `src/content.config.ts`.

### Pivot éditorial — ConceptGraph

Le site reposera sur un **ConceptGraph navigable** (composant React/D3 type
goorg) qui cartographie : dispositifs juridiques ↔ précédents historiques
↔ domaines d'application. Composant hérité de goorg-site à adapter
(`src/components/`).

### Bilingue désactivé en phase 1

L'i18n FR/EN d'astro.config.mjs est commentée. Réactivable plus tard
pour les cas d'étude à portée internationale (Diggers, MST, Mondragón,
Burlington CLT, Zapatistes, kibbutz).

### Edge function `lang-redirect` désactivée

Idem — supprimée pour phase 1.

## Conventions

### Voix @-tags

`@projetplanb`, `@lumen`, `@kern`, `@ced` etc. — en quotes dans le YAML.

### Frontmatter v7

Conforme à l'agora — voir `agents/CLAUDE.md` (Champs frontmatter standard v7).
Les champs métier Projet Plan B (`dispositif`, `precedent`, `actionnable`, `echelle`)
viennent du `prisme-projetplanb.yaml` et complètent les champs standards.

## Liens

- Workspace : `agents/projects/projetplanb/CLAUDE.md` (instructions du projet)
- Carnet de naissance : `agents/projects/projetplanb/CARNET-NAISSANCE.md`
- Routing Vox : `agents/resources/vox/config/chemins/projetplanb.yaml`
- Prompt agent : `agents/agents/projetplanb/prompt.md`

## Inspiration et pattern de référence

- `claude-sites/goorg-site/CLAUDE.md` — pattern Astro à suivre
- Composants identitaires de goorg : `src/components/identity/`
  (à adapter pour Projet Plan B une fois la charte @graphiste livrée)
