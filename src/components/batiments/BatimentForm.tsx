"use client";

import React from "react";
import Batiment from "@/models/Batiment";

type Props = {
  initialData: Batiment;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function BatimentForm({ initialData, onChange, onSubmit }: Props) {
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input
        name="nom"
        value={initialData.nom}
        onChange={onChange}
        placeholder="Nom"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <input
        name="adresse"
        value={initialData.adresse}
        onChange={onChange}
        placeholder="Adresse"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <input
        name="ville"
        value={initialData.ville}
        onChange={onChange}
        placeholder="Ville"
        className="w-full px-4 py-2 border border-gray-300 rounded text-black"
      />
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Valider
      </button>
    </form>
  );
}
