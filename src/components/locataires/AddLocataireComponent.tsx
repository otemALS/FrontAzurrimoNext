"use client";
import { useEffect, useState } from "react";
import Locataire from "@/models/Locataire";
import LocataireForm from "./LocataireForm";
import LocataireComponent from "./LocataireComponent";

export default function AddLocataireComponent() {
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocataires = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9008/api/locataires");
      const data = await res.json();
      setLocataires(data);
    } catch (err) {
      console.error("Erreur lors du chargement des locataires :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocataires();
  }, []);

  const handleLocataireAjoute = (newLocataire: Locataire) => {
    fetchLocataires();
    // Alternativement pour éviter un refetch :
    // setLocataires((prev) => [...prev, newLocataire]);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Gestion des locataires
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
          <LocataireForm onSubmit={handleLocataireAjoute} />
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">
              Chargement des locataires...
            </p>
          ) : locataires.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun locataire enregistré.
            </p>
          ) : (
            <LocataireComponent locataires={locataires} />
          )}
        </div>
      </div>
    </div>
  );
}
