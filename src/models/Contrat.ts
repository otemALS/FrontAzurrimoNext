import Locataire from "./Locataire";
import Appartement from "./Appartement";

export default interface Contrat {
  id?: number;
  dateEntree: string;
  dateSortie: string;
  montantLoyer: number;
  montantCharges: number;
  statut: string;
  locataire: Locataire;
  appartement: Appartement;
}
