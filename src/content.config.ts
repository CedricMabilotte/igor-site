import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// ── Méta-structure projetplanb (CADRAGE-05) ───────────────────────────────
// La doctrine est inscrite dans le schéma (invariants pare-feu, CADRAGE-05 §1.3) :
//  - `couche` est une propriété FIXE du dispositif (on ne range pas une SCIC en portage).
//  - `degre` n'est JAMAIS saisi : il se calcule depuis le vecteur `facteurs_liberation`.
//  - un précédent de statut `pseudo-liberation` porte son `profil_facteurs`.

const COUCHES = ['portage-ig', 'usage', 'operateur', 'transversal'] as const;
const ETAT = ['libere', 'partiel', 'echoue'] as const;

// Vecteur des 7 facteurs de libération (CADRAGE-04) — 2 familles.
const facteursLiberation = z.object({
  // famille A — le bien
  inalienabilite: z.enum(ETAT),
  non_adossement_capital: z.enum(ETAT),
  devolution_desinteressee: z.enum(ETAT),
  // famille B — l'usage
  autogouvernance: z.enum(ETAT),
  perennite_habitat: z.enum(ETAT),
  usage_non_locatif: z.enum(ETAT),
  activite_libre: z.enum(ETAT),
});

// Base agora v7 (allégée, source @eozen)
const base = {
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string(),
  created: z.coerce.date().optional(),
  version: z.number().default(1),
  source: z.string().default('@eozen'),
  concepts: z.array(z.string()).default([]),
  extrait: z.string().optional(),
  publie: z.boolean().default(true),
};

// ── Le miroir des modèles ─────────────────────────────────────────────────

const dispositifs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/dispositifs' }),
  schema: z.object({
    terme: z.string(),
    couche: z.enum(COUCHES),                 // invariant pare-feu — fixe
    source_juridique: z.string().optional(), // article / loi
    definition: z.string(),
    avantages: z.string().optional(),
    limites: z.string().optional(),
    comportement_facteurs: facteursLiberation.partial().optional(),
  }),
});

const contrats = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/contrats' }),
  schema: z.object({
    nom: z.string(),
    source_juridique: z.string().optional(),
    famille: z.number().int().min(1).max(5), // 1 droits réels longs … 5 démembrements
    duree: z.string().optional(),
    nature_droit: z.enum(['reel', 'personnel']).optional(),
    bati_a_usager: z.boolean().default(false),
    redevance: z.enum(['symbolique', 'marchand', 'gratuit']).optional(),
    facteurs_5_6_7: z
      .object({
        perennite_habitat: z.enum(ETAT),
        usage_non_locatif: z.enum(ETAT),
        activite_libre: z.enum(ETAT),
      })
      .partial()
      .optional(),
  }),
});

const montages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/montages' }),
  schema: z.object({
    ...base,
    fonction: z.string(),                       // slug de fonction (src/data/fonctions.yaml)
    briques: z
      .array(
        z.object({
          dispositif: reference('dispositifs'),
          role: z.enum(['porter', 'gouverner', 'produire', 'lier']),
        })
      )
      .default([]),
    contrat_de_lien: reference('contrats').optional(),
    facteurs_liberation: facteursLiberation,    // le vecteur (degre = calculé en code)
    points_de_soudure: z.array(z.string()).default([]),
    variantes: z.array(z.string()).default([]),
    precedents: z.array(reference('precedents')).default([]),
    angle_court: z.string().optional(),
  }),
});

const precedents = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/precedents' }),
  schema: z.object({
    ...base,
    nom: z.string(),
    date: z.string().optional(),
    lieu: z.string().optional(),
    issue: z.string().optional(),
    statut: z.enum(['preuve', 'pseudo-liberation']).default('preuve'),
    profil_facteurs: facteursLiberation.partial().optional(),
    montages: z.array(reference('montages')).default([]),
    canal: z.enum(['modele', 'reel']).default('reel'),
    consentement: z.boolean().default(false),   // refonte B5 — RGPD/consentement
  }),
});

// ── Corpus rédactionnel (conservé) ────────────────────────────────────────

const analyses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/analyses' }),
  schema: z.object({ ...base, type: z.literal('analyse-juridique'), article_principal: z.string().optional(), jurisprudence: z.array(z.string()).default([]) }),
});
const casEtudes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/cas-etudes' }),
  schema: z.object({ ...base, type: z.literal('cas-etude'), mouvement: z.string().optional(), periode: z.string().optional(), territoire: z.string().optional(), issue: z.enum(['victoire', 'défaite', 'partielle', 'en-cours']).optional() }),
});
const tactiques = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/tactiques' }),
  schema: z.object({ ...base, type: z.literal('tactique'), duree_jours: z.number().optional() }),
});

// ── Données structurées (doctrine) ───────────────────────────────────────
const facteurs = defineCollection({
  loader: file('src/data/facteurs.yaml'),
  schema: z.object({
    nom: z.string(),
    famille: z.enum(['le-bien', 'l-usage']),
    famille_nom: z.string(),
    ordre: z.number(),
    desc: z.string(),
  }),
});

const couches = defineCollection({
  loader: file('src/data/couches.yaml'),
  schema: z.object({
    nom: z.string(),
    intitule: z.string(),
    desc: z.string(),
    rang: z.number(),
  }),
});

const fonctions = defineCollection({
  loader: file('src/data/fonctions.yaml'),
  schema: z.object({
    nom: z.string(),
    sous_titre: z.string().optional(),
    module: z.string(),
    statut: z.enum(['actif', 'a-venir', 'differe']),
    problemes: z.array(z.string()).default([]),
    montages: z.array(z.string()).default([]),
  }),
});

export const collections = { fonctions, facteurs, couches, dispositifs, contrats, montages, precedents, analyses, 'cas-etudes': casEtudes, tactiques };
