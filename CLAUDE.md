# CLAUDE.md — Repo igor-site

**Carnet vivant** pour la collaboration avec un agent Claude sur ce repo.
À lire au début de chaque session.

---

## État au 20 mai 2026 — site construit, en attente de déploiement

Site Igor dérivé de `goorg-site`, nettoyé et reconstruit avec l'identité
propre d'Igor (charte @graphiste niveau 1).

- **Domaine** : `projetplanb.org`
- **Stack** : Astro 6 + MDX + React + D3
- **Déploiement** : Netlify (à connecter — étape côté Ced)
- **Repo GitHub** : `CedricMabilotte/igor-site`
- **Build** : `npm run dev` (port 4321) · `npm run build` · `npm run preview`
- **Node** : 22
- **Pages** : `/` `/corpus` `/methode` `/a-propos` — contenu d'illustration (mock),
  production de corpus réel en pause (décision Ced 2026-05-20)
- **Identité** : charte `resources/shared/identites/identite-igor.yaml` v2 —
  moderne / dynamique / nature : fond clair verté, vert vivant #2E7D4E,
  accent terre #E2622E ; Inter (display + UI) + Source Serif 4 (corps) +
  IBM Plex Mono ; mark « la tresse vivante » (`public/mark-igor.svg`)
- **Titre du site** : « Igor, le cosaque du kolkhoze » / sous-titre
  « Refaire culture en Communs »

## Reste à provisionner

- [x] `npm install` (node_modules + package-lock.json)
- [x] Symlink `resources/sites/igor-org/` → `claude-sites/igor-site/`
- [x] Build vérifié (4 pages)
- [ ] `git init` + premier commit + push vers GitHub
- [ ] Connexion Netlify au repo (étape dashboard — voir runbook)
- [ ] DNS Gandi `projetplanb.org` → Netlify
- [ ] HTTPS Let's Encrypt actif

## Spécificité Igor

### Collections de contenu (`src/content/`)

Cinq collections — alignées avec les 5 types de production du `prompt.md` Igor :

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

`@igor`, `@lumen`, `@kern`, `@ced` etc. — en quotes dans le YAML.

### Frontmatter v7

Conforme à l'agora — voir `agents/CLAUDE.md` (Champs frontmatter standard v7).
Les champs métier Igor (`dispositif`, `precedent`, `actionnable`, `echelle`)
viennent du `prisme-igor.yaml` et complètent les champs standards.

## Liens

- Workspace : `agents/projects/igor/CLAUDE.md` (instructions du projet)
- Carnet de naissance : `agents/projects/igor/CARNET-NAISSANCE.md`
- Routing Vox : `agents/resources/vox/config/chemins/igor.yaml`
- Prompt agent : `agents/agents/igor/prompt.md`

## Inspiration et pattern de référence

- `claude-sites/goorg-site/CLAUDE.md` — pattern Astro à suivre
- Composants identitaires de goorg : `src/components/identity/`
  (à adapter pour Igor une fois la charte @graphiste livrée)
