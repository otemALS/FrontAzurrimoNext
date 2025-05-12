"use client";
import Appartement from "@/models/Appartement";
import AppartementForm from "./AppartementForm";
import { useEffect, useState } from "react";

export default function EditAppartementForm({ appartementId }: { appartementId: number }) {
  const [appartement, setAppartement] = useState<Appartement | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9008/api/appartements/${appartementId}`)
      .then((res) => res.json())
      .then((data) => setAppartement(data));
  }, [appartementId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!appartement) return;
    setAppartement((prev) => ({
      ...prev!,
      [name]: name === "numero" || name === "surface" || name === "nb_pieces" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    await fetch(`http://localhost:9008/api/appartements/${appartementId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appartement),
    });
    window.location.reload();
  };

  if (!appartement) return <p>Chargement...</p>;

  return (
    <div>
      <h3>Modifier l'appartement</h3>
      <AppartementForm appartement={appartement} onChange={handleChange} />
      <button onClick={handleSubmit}>Mettre à jour</button>
    </div>
  );
}
