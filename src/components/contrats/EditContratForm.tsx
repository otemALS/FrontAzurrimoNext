"use client";

import React, { useEffect, useState } from "react";
import Contrat from "@/models/Contrat";
import Locataire from "@/models/Locataire";
import ContratForm from "./ContratForm";

type Props = {
  contratId: number;
  onCancel: () => void;
  onUpdate: (updated: Contrat) => void;
};

export default function EditContratForm({ contratId, onCancel, onUpdate }: Props) {
  const [contrat, setContrat] = useState<Contrat | null>(null);
  const [locataires, setLocataires] = useState<Locataire[]>([]);

  useEffect(() => {
    fetch(`http://localhost:9008/api/contrats/${contratId}`)
      .then((res) => res.json())
      .then((data) => setContrat(data))
      .catch((err) => console.error("Erreur lors du chargement du contrat :", err));

    fetch("http://localhost:9008/api/locataires")
      .then((res) => res.json())
      .then((data) => setLocataires(data))
      .catch((err) => console.error("Erreur chargement locataires :", err));
  }, [contratId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "montantLoyer" || name === "montantCharges") {
      setContrat((prev) => prev ? { ...prev, [name]: parseFloat(value) } : prev);
    } else if (name === "locataireId") {
      const selected = locataires.find((l) => l.id === parseInt(value));
      if (selected) {
        setContrat((prev) => prev ? { ...prev, locataire: selected } : prev);
      }
    } else {
      setContrat((prev) => prev ? { ...prev, [name]: value } : prev);
    }
  };

  const handleSubmit = async () => {
    if (!contrat) return;
    try {
      const res = await fetch(`http://localhost:9008/api/contrats/${contratId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contrat),
      });

      if (!res.ok) throw new Error("Erreur update");

      const updated = await res.json();

      // Correction ici : on remplace le locataire par le locataire complet
      const fullLoc = locataires.find((l) => l.id === updated.locataire?.id);
      onUpdate({ ...updated, locataire: fullLoc ?? updated.locataire });

    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  if (!contrat) return <p>Chargement...</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Modifier le contrat</h3>
      <ContratForm
        initialData={contrat}
        onChange={handleChange}
        onSubmit={handleSubmit}
        locataires={locataires}
      />
      <button
        onClick={onCancel}
        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Annuler
      </button>
    </div>
  );
}
