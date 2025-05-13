"use client";

import Appartement from "@/models/Appartement";
import Batiment from "@/models/Batiment";

type Props = {
  appartement: Appartement;
  batiments: Batiment[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
};

export default function AppartementForm({ appartement, batiments, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit || ((e) => e.preventDefault())}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <input
        name="numero"
        type="number"
        placeholder="Numéro"
        value={appartement.numero}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded text-black"
      />
      <input
        name="surface"
        type="number"
        placeholder="Surface (m²)"
        value={appartement.surface}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded text-black"
      />
      <input
        name="nb_pieces"
        type="number"
        placeholder="Nombre de pièces"
        value={appartement.nb_pieces}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded text-black"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={appartement.description}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded text-black"
      />

      <select
        name="batimentId"
        value={appartement.batiment?.id || ""}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded text-black"
      >
        <option value="">Sélectionnez un bâtiment</option>
        {batiments.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nom} – {b.ville}
          </option>
        ))}
      </select>

      {onSubmit && (
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Enregistrer
        </button>
      )}
    </form>
  );
}
