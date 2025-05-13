import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { listeDesChambres } from "../fakeData/listeDesChambres";

export default function Chambres() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("Tout");
  // const [selectedDateRange, setSelectedDateRange] = useState("");
  const itemsPerPage = 5;

  const filteredChambres = listeDesChambres.filter((chambre) => {
    if (currentFilter === "Tout") return true;
    if (currentFilter === "Disponibles") return chambre.status === "libre";
    if (currentFilter === "Reservées") return chambre.status === "occupé";
    return true;
  });
  //   Calcul des données à afficher (utilise maintenant filteredClients)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChambres.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredChambres.length / itemsPerPage);

  //   Fonctions de navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fonction pour changer le filtre
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="bg-gray-100 h-auto p-10">
        <div className="pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Filtres à gauche */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {["Tout", "Disponibles", "Reservées"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-md w-[125px] font-bold border border-transparent transition-colors duration-300 opacity-70 ${
                  currentFilter === filter
                    ? "font-bold text-purple-700 bg-purple-300"
                    : "hover:text-purple-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Select à droite */}
          <div className="w-full md:w-auto">
            <select className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
              <option value="">
                Nouvelle chambre <Plus size={16} className="inline" />
              </option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto p-5 bg-white rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Nom de chambre",
                  "Type de lit",
                  "Etage",
                  "Equipements",
                  "Prix",
                  "Status",
                  "Actions",
                ].map((tHead, index) => (
                  <th
                    key={index}
                    className="px-4 py-5 font-bold text-left text-wrap tracking-wider"
                  >
                    {tHead}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((client, index) => (
                  <tr key={index}>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={client.picture}
                          alt={`Photo de ${client.nom}`}
                          className="w-20 h-13 rounded-lg mr-3 object-cover"
                        />
                        <div>
                          <p className="text-red-500 text-xs">
                            {client.identifiant}
                          </p>
                          <p className="font-medium text-xs">{client.nom}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-wrap opacity-70">
                      {client.typeDeLit}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-bold">{client.etage}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="text-xs opacity-70 text-wrap">
                        {client.equipements}
                      </p>
                    </td>
                    <td className="p-4 whitespace-wrap text-xs font-bold whitespace-nowrap">
                      {client.prix}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-4 py-3 inline-block min-w-[100px] text-center rounded-lg text-xs ${
                          client.status === "libre"
                            ? "bg-teal-900 text-white"
                            : client.status === "occupé"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        ✏️
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">
                    Aucun client ne correspond aux critères sélectionnés
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          {filteredChambres.length > 0 && (
            <div className="mt-4 flex items-center justify-end my-2 mx-2">
              <ChevronLeft
                size={50}
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md cursor-pointer ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-purple-400 text-purple-800 hover:bg-purple-500"
                }`}
              />

              <span className="text-sm text-gray-600 mx-5">
                Page {currentPage} sur {totalPages}
              </span>

              <ChevronRight
                size={50}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md cursor-pointer ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-purple-400 text-purple-700 hover:bg-purple-500"
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
