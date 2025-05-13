"use client";

import { useEffect, useState } from "react";
import Contrat from "@/models/Contrat";
import Locataire from "@/models/Locataire";
import Appartement from "@/models/Appartement";
import ContratForm from "./ContratForm";

export default function AddContratComponent() {
  const [contrat, setContrat] = useState<Contrat>({
    dateEntree: "",
    dateSortie: "",
    montantLoyer: 0,
    montantCharges: 0,
    statut: "",
    locataire: {
      id: 0,
      nom: "",
      prenom: "",
      dateN: "",
      lieuN: ""
    },
    appartement: {
      id: 0,
      numero: 0,
      surface: 0,
      nb_pieces: 0,
      description: "",
      batiment: {
        id: 0,
        nom: "",
        adresse: "",
        ville: ""
      }
    }
  });

  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [appartements, setAppartements] = useState<Appartement[]>([]);

  useEffect(() => {
    fetch("http://localhost:9008/api/locataires")
      .then((res) => res.json())
      .then(setLocataires)
      .catch((err) => console.error("Erreur chargement locataires :", err));

    fetch("http://localhost:9008/api/appartements")
      .then((res) => res.json())
      .then(setAppartements)
      .catch((err) => console.error("Erreur chargement appartements :", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "montantLoyer" || name === "montantCharges") {
      setContrat({ ...contrat, [name]: Number(value) });
    } else if (name === "locataireId") {
      const selected = locataires.find((l) => l.id === Number(value));
      if (selected) {
        setContrat({ ...contrat, locataire: selected });
      }
    } else if (name === "appartementId") {
      const selected = appartements.find((a) => a.id === Number(value));
      if (selected) {
        setContrat({ ...contrat, appartement: selected });
      }
    } else {
      setContrat({ ...contrat, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:9008/api/contrats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contrat),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du contrat");

      window.location.reload();
    } catch (err) {
      console.error("Erreur création contrat :", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-xl mx-auto mb-8">
      <h3 className="text-lg font-bold text-center mb-4">Ajouter un contrat</h3>
      <ContratForm
        initialData={contrat}
        onChange={handleChange}
        onSubmit={handleSubmit}
        locataires={locataires}
        appartements={appartements}
      />
    </div>
  );
}
