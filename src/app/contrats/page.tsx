import ContratComponent from "@/components/contrats/ContratComponent";
import AddContratComponent from "@/components/contrats/AddContratComponent";

export default async function ContratPage() {
  const res = await fetch("http://localhost:9008/api/contrats", { cache: "no-store" });
  const contrats = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AddContratComponent />
      <ContratComponent contrats={contrats} />
    </div>
  );
}
