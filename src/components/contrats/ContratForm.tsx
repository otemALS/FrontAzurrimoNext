"use client";

import React from "react";
import Contrat from "@/models/Contrat";
import Locataire from "@/models/Locataire";

type Props = {
  initialData: Contrat;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  locataires: Locataire[];
};

export default function ContratForm({ initialData, onChange, onSubmit, locataires }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-3"
    >
      <input
        name="dateEntree"
        type="date"
        value={initialData.dateEntree}
        onChange={onChange}
        placeholder="Date d'entrée"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <input
        name="dateSortie"
        type="date"
        value={initialData.dateSortie}
        onChange={onChange}
        placeholder="Date de sortie"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <input
        name="montantLoyer"
        type="number"
        value={initialData.montantLoyer}
        onChange={onChange}
        placeholder="Montant du loyer"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <input
        name="montantCharges"
        type="number"
        value={initialData.montantCharges}
        onChange={onChange}
        placeholder="Montant des charges"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <input
        name="statut"
        type="text"
        value={initialData.statut}
        onChange={onChange}
        placeholder="Statut"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <select
        name="locataireId"
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
        value={initialData.locataire?.id || ""}
      >
        <option value="">Sélectionnez un locataire</option>
        {locataires.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.nom} {loc.prenom} – {loc.lieuN}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Valider
      </button>
    </form>
  );
}
