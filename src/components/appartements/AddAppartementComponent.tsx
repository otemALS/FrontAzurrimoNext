"use client";

import { useState } from "react";
import Appartement from "@/models/Appartement";
import AppartementForm from "./AppartementForm";

export default function AddAppartementComponent() {
  const [appartement, setAppartement] = useState<Appartement>({
    id: 0,
    numero: 0,
    surface: 0,
    nb_pieces: 0,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppartement((prev) => ({
      ...prev,
      [name]: ["numero", "surface", "nb_pieces"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:9008/api/appartements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appartement),
    });
    window.location.reload();
  };

  return (
    <div>
      <h3>Ajouter un appartement</h3>
      <AppartementForm appartement={appartement} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}
