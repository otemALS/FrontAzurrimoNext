"use client";

import { useState } from "react";
import Batiment from "@/models/Batiment";
import BatimentForm from "./BatimentForm";

export default function AddBatimentComponent() {
  const [batiment, setBatiment] = useState<Batiment>({
    id: 0,
    nom: "",
    adresse: "",
    ville: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBatiment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:9008/api/batiments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(batiment),
    });
    window.location.reload();
  };

  return (
    <BatimentForm initialData={batiment} onChange={handleChange} onSubmit={handleSubmit} />
  );
}
