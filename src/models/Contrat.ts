import Locataire from "./Locataire";

export default interface Contrat {
  id?: number; // ← ici optionnel
  dateEntree: string;
  dateSortie: string;
  montantLoyer: number;
  montantCharges: number;
  statut: string;
  locataire: Locataire;
}
