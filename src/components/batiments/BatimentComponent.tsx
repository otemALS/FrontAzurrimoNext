"use client";

import { useState } from "react";
import Batiment from "@/models/Batiment";
import EditBatimentForm from "./EditBatimentForm";

type Props = {
  batiments: Batiment[];
};

export default function BatimentComponent({ batiments: initial }: Props) {
  const [batiments, setBatiments] = useState<Batiment[]>(initial);
  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:9008/api/batiments/${id}`, {
      method: "DELETE"
    });
    setBatiments(prev => prev.filter(b => b.id !== id));
  };

  const handleUpdate = (updated: Batiment) => {
    setBatiments(prev => prev.map(b => (b.id === updated.id ? updated : b)));
    setEditId(null);
  };

  return (
    <div className="space-y-4 mt-6">
      {batiments.map(b => (
        <div key={b.id} className="bg-gray-50 rounded p-4 shadow">
          {editId === b.id ? (
            <EditBatimentForm batimentId={b.id} onCancel={() => setEditId(null)} onUpdate={handleUpdate} />
          ) : (
            <>
              <p className="text-black-800 font-medium mb-2">{b.nom} - {b.adresse}, {b.ville}</p>
              <div className="space-x-2">
                <button onClick={() => setEditId(b.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Modifier</button>
                <button onClick={() => handleDelete(b.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Supprimer</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
