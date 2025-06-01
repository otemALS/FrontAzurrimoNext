"use client";

import { useEffect, useState } from "react";
import Appartement from "@/models/Appartement";
import AppartementForm from "./AppartementForm";
import Batiment from "@/models/Batiment";

export default function AddAppartementComponent() {
  const [appartement, setAppartement] = useState<Appartement>({
    numero: undefined,
    surface: undefined,
    nbPieces: undefined,

    description: "",
    batiment: { id: 0, nom: "", adresse: "", ville: "" },
    contrats: [],
  });

  const [batiments, setBatiments] = useState<Batiment[]>([]);

  useEffect(() => {
    fetch("http://localhost:9008/api/batiments")
      .then((res) => res.json())
      .then((data) => setBatiments(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "batimentId") {
      const selectedBatiment = batiments.find((b) => b.id === Number(value));
      if (selectedBatiment) {
        setAppartement((prev) => ({
          ...prev,
          batiment: selectedBatiment,
        }));
      }
    } else {
      setAppartement((prev) => ({
        ...prev,
        [name]: ["numero", "surface", "nb_pieces"].includes(name)
          ? value === "" ? undefined : Number(value)
          : value,
      }));
    }
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
      <h3 className="text-xl font-semibold mb-4">Ajouter un appartement</h3>
      <AppartementForm
        appartement={appartement}
        batiments={batiments}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
