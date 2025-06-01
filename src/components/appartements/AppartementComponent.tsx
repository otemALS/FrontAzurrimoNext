"use client";

import { useState } from "react";
import Appartement from "@/models/Appartement";
import AddAppartementComponent from "./AddAppartementComponent";
import EditAppartementForm from "./EditAppartementForm";

type Props = {
  appartements: Appartement[];
};

export default function AppartementComponent({ appartements }: Props) {
  const [list, setList] = useState<Appartement[]>(appartements);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet appartement ?")) return;

    const res = await fetch(`http://localhost:9008/api/appartements/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setList((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleUpdate = (updated: Appartement) => {
    setList((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6">Liste des appartements</h2>

      <div className="max-w-2xl mx-auto mb-8">
        <AddAppartementComponent />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {list.map((appartement) => (
          <div key={appartement.id} className="bg-white p-4 rounded shadow">
            {editingId === appartement.id ? (
              <EditAppartementForm
                appartement={appartement}
                onCancel={() => setEditingId(null)}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                <p className="font-semibold">
                  Appartement n°{appartement.numero} – {appartement.nbPieces ?? "?"} pièces
                </p>
                <p className="text-sm text-gray-500">{appartement.description}</p>
                <p className="text-xs text-gray-400">Surface : {appartement.surface} m²</p>

                <p className="text-sm text-gray-600 italic">
                  Bâtiment : {appartement.batiment?.nom} ({appartement.batiment?.ville})
                </p>

                {appartement.contrats && appartement.contrats.length > 0 && (
                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-semibold">Contrats :</p>
                    <ul className="list-disc list-inside">
                      {appartement.contrats.map((contrat) => (
                        <li key={contrat.id}>
                          #{contrat.id} – du {contrat.dateEntree} au {contrat.dateSortie} – {contrat.statut}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => appartement.id !== undefined && setEditingId(appartement.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => appartement.id !== undefined && handleDelete(appartement.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
