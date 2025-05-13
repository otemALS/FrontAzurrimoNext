"use client";
import Appartement from "@/models/Appartement";
import Batiment from "@/models/Batiment";
import AppartementForm from "./AppartementForm";
import { useEffect, useState } from "react";

type Props = {
  appartement: Appartement;
  onCancel: () => void;
  onUpdate: (updated: Appartement) => void;
};

export default function EditAppartementForm({ appartement, onCancel, onUpdate }: Props) {
  const [form, setForm] = useState<Appartement>(appartement);
  const [batiments, setBatiments] = useState<Batiment[]>([]);

  useEffect(() => {
    const fetchBatiments = async () => {
      const res = await fetch("http://localhost:9008/api/batiments");
      const data = await res.json();
      setBatiments(data);
    };

    fetchBatiments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "numero" || name === "surface" || name === "nb_pieces"
        ? Number(value)
        : name === "batiment"
        ? { id: Number(value) }
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:9008/api/appartements/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur update");

      const updated = await res.json();
      onUpdate(updated);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Modifier l&apos;appartement</h3>
      <AppartementForm
        appartement={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        batiments={batiments}
      />
      <button
        className="mt-2 ml-2 text-gray-500 hover:underline"
        onClick={onCancel}
      >
        Annuler
      </button>
    </div>
  );
}
