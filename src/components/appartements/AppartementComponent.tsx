"use client";

import Appartement from "@/models/Appartement";
import Link from "next/link";
import { useState } from "react";
import AddAppartementComponent from "./AddAppartementComponent";

type Props = {
  appartements: Appartement[];
};

export default function AppartementComponent({ appartements }: Props) {
  const [appartementsList, setAppartements] = useState(appartements);

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:9008/api/appartements/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAppartements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2>Appartements</h2>
      <Link href="/" className="text-blue-400 underline">Retour à l’accueil</Link>
      <AddAppartementComponent />
      <ul>
        {appartementsList.map((appartement) => (
          <li key={appartement.id}>
            {appartement.numero} - {appartement.description}
            <button onClick={() => handleDelete(appartement.id)} className="ml-2 text-red-400">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
