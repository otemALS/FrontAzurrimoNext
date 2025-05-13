export default interface Appartement {
  id: number;
  numero: number;
  surface: number;
  nb_pieces: number;
  description: string;
  batiment: {
    id: number;
    nom?: string;       // ← facultatif si parfois absent
    adresse?: string;
    ville?: string;
  };
}
