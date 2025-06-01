"use client";

import { useState } from "react";
import Contrat from "@/models/Contrat";
import EditContratForm from "./EditContratForm";

type Props = {
  contrats: Contrat[];
};

export default function ContratComponent({ contrats }: Props) {
  const [list, setList] = useState<Contrat[]>(contrats);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:9008/api/contrats/${id}`, { method: "DELETE" });
    setList(list.filter((c) => c.id !== id));
  };

  const handleUpdate = (updated: Contrat) => {
    setList(list.map((c) => (c.id === updated.id ? updated : c)));
    setEditingId(null);
  };

  console.log("contrats:", list); // Debug

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6">Liste des contrats</h2>

      <div className="max-w-2xl mx-auto space-y-4">
        {list.map((contrat) => (
          <div key={contrat.id} className="bg-white rounded shadow p-4">
            {editingId === contrat.id ? (
              <EditContratForm
                contratId={contrat.id!}
                onCancel={() => setEditingId(null)}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                <p className="font-semibold mb-1">Contrat #{contrat.id} - {contrat.statut}</p>
                <p className="text-sm text-gray-600">Du {contrat.dateEntree} au {contrat.dateSortie}</p>

                <p className="text-sm text-gray-600">
                  Loyer : {contrat.montantLoyer !== undefined ? `${contrat.montantLoyer} €` : "Non renseigné"}
                </p>
                <p className="text-sm text-gray-600">
                  Charges : {contrat.montantCharges !== undefined ? `${contrat.montantCharges} €` : "Non renseigné"}
                </p>

                {contrat.locataire && (
                  <div className="mt-2 text-sm">
                    <span className="italic text-gray-500">Locataire :</span>{" "}
                    {contrat.locataire.nom} {contrat.locataire.prenom} — né(e) le {contrat.locataire.dateN} à {contrat.locataire.lieuN}
                  </div>
                )}

                {contrat.appartement && (
                  <div className="text-sm mt-1">
                    <span className="italic text-gray-500">Appartement :</span>{" "}
                    n°{contrat.appartement.numero}, bâtiment {contrat.appartement.batiment?.nom || "non renseigné"} à {contrat.appartement.batiment?.ville}
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditingId(contrat.id!)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Modifier</button>
                  <button onClick={() => handleDelete(contrat.id!)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Supprimer</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
