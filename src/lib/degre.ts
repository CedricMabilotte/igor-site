// Le degré n'est jamais saisi : il se calcule depuis le vecteur des 7 facteurs
// (CADRAGE-05, invariant pare-feu §1.3 ; CADRAGE-04).
export type Etat = 'libere' | 'partiel' | 'echoue';
export type Vecteur = Record<string, Etat | undefined>;

export const FAMILLES = {
  'le-bien': ['inalienabilite', 'non_adossement_capital', 'devolution_desinteressee'],
  'l-usage': ['autogouvernance', 'perennite_habitat', 'usage_non_locatif', 'activite_libre'],
};

export function evalDegre(v: Vecteur) {
  const tous = [...FAMILLES['le-bien'], ...FAMILLES['l-usage']];
  const nLibere = tous.filter((k) => v[k] === 'libere').length;
  const usageLibere = FAMILLES['l-usage'].filter((k) => v[k] === 'libere').length;
  const bienActif = FAMILLES['le-bien'].filter((k) => v[k] === 'libere' || v[k] === 'partiel').length;
  let label: string;
  if (nLibere >= 6) label = 'radicale';
  else if (bienActif >= 1 && usageLibere === 0) label = 'pseudo-libération';
  else label = 'incomplète';
  return { nLibere, total: 7, label };
}
