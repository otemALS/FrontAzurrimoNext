"use client";
import { useState } from "react";
import Locataire from "@/models/Locataire";

export default function EditLocataireForm({
  locataire,
  onCancel,
  onUpdate,
}: {
  locataire: Locataire;
  onCancel: () => void;
  onUpdate: (locataire: Locataire) => void;
}) {
  const [nom, setNom] = useState(locataire.nom);
  const [prenom, setPrenom] = useState(locataire.prenom);
  const [dateN, setDateN] = useState(locataire.dateN);
  const [lieuN, setLieuN] = useState(locataire.lieuN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated = { nom, prenom, dateN, lieuN };

    try {
      const res = await fetch(`http://localhost:9008/api/locataires/${locataire.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      const data = await res.json();
      onUpdate(data);
    } catch (err) {
      console.error("Erreur update locataire :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100 p-4 rounded shadow">
      <input value={nom} onChange={(e) => setNom(e.target.value)} className="border p-2 rounded" />
      <input value={prenom} onChange={(e) => setPrenom(e.target.value)} className="border p-2 rounded" />
      <input type="date" value={dateN} onChange={(e) => setDateN(e.target.value)} className="border p-2 rounded" />
      <input value={lieuN} onChange={(e) => setLieuN(e.target.value)} className="border p-2 rounded" />
      <div className="col-span-2 flex gap-2 justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Valider</button>
        <button type="button" onClick={onCancel} className="text-gray-600 underline">Annuler</button>
      </div>
    </form>
  );
}
