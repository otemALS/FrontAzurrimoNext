"use client";

import { useState } from "react";
import Locataire from "@/models/Locataire";

interface LocataireFormProps {
  onSubmit: (locataire: Locataire) => void;
  initialData?: Partial<Locataire>;
}

export default function LocataireForm({ onSubmit, initialData = {} }: LocataireFormProps) {
  const [nom, setNom] = useState(initialData.nom || "");
  const [prenom, setPrenom] = useState(initialData.prenom || "");
  const [dateN, setDateN] = useState(initialData.dateN || "");
  const [lieuN, setLieuN] = useState(initialData.lieuN || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      id: initialData.id, // important pour PUT
      nom,
      prenom,
      dateN,
      lieuN,
    };

    const url = initialData.id
      ? `http://localhost:9008/api/locataires/${initialData.id}`
      : "http://localhost:9008/api/locataires";

    const method = initialData.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du formulaire");

      const result = await res.json();
      onSubmit(result);

      // Réinitialisation seulement si c’est un ajout
      if (!initialData.id) {
        setNom("");
        setPrenom("");
        setDateN("");
        setLieuN("");
      }

    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
        className="border rounded p-2"
      />

      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        required
        className="border rounded p-2"
      />

      <input
        type="date"
        value={dateN}
        onChange={(e) => setDateN(e.target.value)}
        required
        className="border rounded p-2"
      />

      <input
        type="text"
        placeholder="Lieu de naissance"
        value={lieuN}
        onChange={(e) => setLieuN(e.target.value)}
        required
        className="border rounded p-2"
      />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        {initialData.id ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}
