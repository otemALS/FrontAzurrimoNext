import Contrat from "./Contrat";

export default interface Appartement {
  id?: number;
  numero?: number;
  surface?: number;
  nb_pieces?: number;
  description: string;
  batiment: {
    id: number;
    nom: string;
    adresse: string;
    ville: string;
  };
  contrats?: Contrat[]; // 👈 Ajoute cette ligne
}
