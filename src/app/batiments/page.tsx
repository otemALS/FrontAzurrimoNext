import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import BatimentComponent from "@/components/batiments/BatimentComponent";
import AddBatimentComponent from "@/components/batiments/AddBatimentComponent";

export default async function BatimentPage() {
  const batiments = await HttpService.get(API_URL.batiments);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestion des bâtiments</h1>
        <AddBatimentComponent />
        <hr className="my-4" />
        <BatimentComponent batiments={batiments} />
      </div>
    </div>
  );
}
