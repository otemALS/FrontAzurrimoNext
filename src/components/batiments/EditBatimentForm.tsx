"use client";

import { useEffect, useState } from "react";
import Batiment from "@/models/Batiment";
import BatimentForm from "./BatimentForm";

type Props = {
  batimentId: number;
  onCancel: () => void;
  onUpdate: (updated: Batiment) => void;
};

export default function EditBatimentForm({ batimentId, onCancel, onUpdate }: Props) {
  const [form, setForm] = useState<Batiment | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9008/api/batiments/${batimentId}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [batimentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async () => {
    if (!form) return;
    await fetch(`http://localhost:9008/api/batiments/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    onUpdate(form);
  };

  if (!form) return <p>Chargement...</p>;

  return (
    <div>
      <BatimentForm initialData={form} onChange={handleChange} onSubmit={handleSubmit} />
      <button onClick={onCancel} className="btn btn-secondary mt-2">Annuler</button>
    </div>
  );
}
