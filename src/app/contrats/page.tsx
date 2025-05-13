import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import AddContratComponent from "@/components/contrats/AddContratComponent";
import ContratComponent from "@/components/contrats/ContratComponent";

export default async function ContratPage() {
  const contrats = await HttpService.get(API_URL.contrats);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestion des contrats</h1>

        <AddContratComponent />

        <hr className="my-6" />

        <ContratComponent contrats={contrats} />
      </div>
    </div>
  );
}
