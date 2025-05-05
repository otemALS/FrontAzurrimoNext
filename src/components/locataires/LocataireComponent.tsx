"use client";
import Locataire from "@/models/Locataire";
import EditLocataireForm from "./EditLocataireForm";
import { useEffect, useState } from "react";

export default function LocataireComponent({ locataires }: { locataires: Locataire[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [locataireList, setLocataireList] = useState<Locataire[]>([]);

  useEffect(() => {
    setLocataireList(locataires);
  }, [locataires]);

  const handleUpdate = (updated: Locataire) => {
    setLocataireList((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setEditingId(null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    const confirm = window.confirm("Voulez-vous supprimer ce locataire ?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:9008/api/locataires/${id}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        setLocataireList((prev) => prev.filter((l) => l.id !== id));
      } else {
        console.error("Échec suppression :", res.status);
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  return (
    <div className="grid gap-4">
      {locataireList.map((locataire) => (
        <div key={locataire.id} className="bg-white p-4 rounded shadow-sm">
          {editingId === locataire.id ? (
            <EditLocataireForm
              locataire={locataire}
              onCancel={() => setEditingId(null)}
              onUpdate={handleUpdate}
            />
          ) : (
            <>
              <div className="text-sm">
                <span className="font-medium">{locataire.nom} {locataire.prenom}</span> <br />
                Né(e) le {new Date(locataire.dateN).toLocaleDateString("fr-FR")} à {locataire.lieuN}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setEditingId(locataire.id!)}>
                  Modifier
                </button>
                <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => handleDelete(locataire.id)}>
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
