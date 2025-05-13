"use client";

import Appartement from "@/models/Appartement";
import { useState } from "react";
import AppartementForm from "./AppartementForm";

export default function EditAppartementForm({
  appartement,
  onCancel,
  onUpdate,
}: {
  appartement: Appartement;
  onCancel: () => void;
  onUpdate: (appartement: Appartement) => void;
}) {
  const [form, setForm] = useState<Appartement>(appartement);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["numero", "surface", "nb_pieces"].includes(name) ? Number(value) : value,
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
    <div className="bg-white rounded shadow p-4">
      <AppartementForm appartement={form} onChange={handleChange} onSubmit={handleSubmit} />
      <button
        type="button"
        onClick={onCancel}
        className="mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
      >
        Annuler
      </button>
    </div>
  );
}
