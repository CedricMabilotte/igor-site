import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schéma commun aux 5 collections Igor — aligné avec le frontmatter v7 de l'agora
// (id UUID v7, slug, type, contributions, regards, etc.) + champs métier Igor.

const baseFields = {
  // v7 agora
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string(),
  created: z.coerce.date(),
  version: z.number().default(1),
  source: z.string().default('@igor'),
  // Champs métier Igor (face prisme-igor.yaml)
  domaine: z.enum(['foncier', 'coopératif', 'organisationnel', 'résistance', 'éducation', 'travail', 'mixte']).optional(),
  dispositif: z.string().optional(),
  precedent: z.string().optional(),
  actionnable: z.enum(['maintenant-sans-avocat', 'maintenant-avec-professionnel', 'préparation-6-mois', 'horizon-long-terme']).optional(),
  echelle: z.enum(['individu', 'groupe-local', 'réseau-territorial', 'national']).optional(),
  concepts: z.array(z.string()).default([]),
  extrait: z.string().optional(),
  publie: z.boolean().default(true),
};

const propositions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/propositions' }),
  schema: z.object({ ...baseFields, type: z.literal('proposition') })
});

const tactiques = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/tactiques' }),
  schema: z.object({
    ...baseFields,
    type: z.literal('tactique'),
    duree_jours: z.number().optional(),
    nb_personnes_min: z.number().default(3),
  })
});

const analyses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/analyses' }),
  schema: z.object({
    ...baseFields,
    type: z.literal('analyse-juridique'),
    article_principal: z.string().optional(),
    jurisprudence: z.array(z.string()).default([]),
  })
});

const casEtudes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/cas-etudes' }),
  schema: z.object({
    ...baseFields,
    type: z.literal('cas-etude'),
    mouvement: z.string().optional(),
    periode: z.string().optional(),
    territoire: z.string().optional(),
    issue: z.enum(['victoire', 'défaite', 'partielle', 'en-cours']).optional(),
  })
});

const dispositifs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/dispositifs' }),
  schema: z.object({
    terme: z.string(),
    categorie: z.enum(['structure-collective', 'foncier-collectif', 'patrimoine-affectation', 'résistance-protection', 'gouvernance']),
    definition: z.string(),
    article_loi: z.string().optional(),
    precedents: z.array(z.string()).default([]),
  })
});

export const collections = { propositions, tactiques, analyses, 'cas-etudes': casEtudes, dispositifs };
