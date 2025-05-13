"use client";

import React, { useEffect, useState } from "react";
import Contrat from "@/models/Contrat";
import Locataire from "@/models/Locataire";
import Appartement from "@/models/Appartement";
import ContratForm from "./ContratForm";

type Props = {
  contratId: number;
  onCancel: () => void;
  onUpdate: (updated: Contrat) => void;
};

export default function EditContratForm({ contratId, onCancel, onUpdate }: Props) {
  const [contrat, setContrat] = useState<Contrat | null>(null);
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [appartements, setAppartements] = useState<Appartement[]>([]);

  useEffect(() => {
    fetch(`http://localhost:9008/api/contrats/${contratId}`)
      .then((res) => res.json())
      .then((data) => setContrat(data))
      .catch((err) => console.error("Erreur chargement contrat :", err));

    fetch("http://localhost:9008/api/locataires")
      .then((res) => res.json())
      .then(setLocataires)
      .catch((err) => console.error("Erreur chargement locataires :", err));

    fetch("http://localhost:9008/api/appartements")
      .then((res) => res.json())
      .then(setAppartements)
      .catch((err) => console.error("Erreur chargement appartements :", err));
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
    } else if (name === "appartementId") {
      const selectedApp = appartements.find((a) => a.id === parseInt(value));
      if (selectedApp) {
        setContrat((prev) => prev ? { ...prev, appartement: selectedApp } : prev);
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

      if (!res.ok) throw new Error("Erreur lors de l’update");

      const updated = await res.json();
      onUpdate(updated);
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
        appartements={appartements}
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
