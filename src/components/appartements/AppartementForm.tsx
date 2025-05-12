"use client";

import Appartement from "@/models/Appartement";

type Props = {
  appartement: Appartement;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function AppartementForm({ appartement, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-black my-4"
    >
      <h2 className="text-xl font-semibold mb-4">Ajouter un appartement</h2>

      <div className="mb-4">
        <label htmlFor="numero" className="block text-sm font-medium">Numéro</label>
        <input
          type="number"
          name="numero"
          value={appartement.numero}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="surface" className="block text-sm font-medium">Surface (m²)</label>
        <input
          type="number"
          name="surface"
          value={appartement.surface}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="nb_pieces" className="block text-sm font-medium">Nombre de pièces</label>
        <input
          type="number"
          name="nb_pieces"
          value={appartement.nb_pieces}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={appartement.description}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Ajouter
      </button>
    </form>
  );
}
