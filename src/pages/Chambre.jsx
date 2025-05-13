import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { listeDesChambres } from "../fakeData/listeDesChambres";

export default function Chambre() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("Tout");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newChambre, setNewChambre] = useState({
    nom: '',
    typeDeLit: '',
    etage: '',
    equipements: '',
    prix: '',
    status: 'libre',
    picture: '/default-room.jpg', // Chemin vers une image par défaut
    identifiant: `CH-${Math.floor(Math.random() * 10000)}`
  });
  
  const itemsPerPage = 5;

  const filteredChambres = listeDesChambres.filter((chambre) => {
    if (currentFilter === "Tout") return true;
    if (currentFilter === "Disponibles") return chambre.status === "libre";
    if (currentFilter === "Reservées") return chambre.status === "occupé";
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChambres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChambres.length / itemsPerPage);

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

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const handleAddChambre = (e) => {
    e.preventDefault();
    // Générer un nouvel ID unique
    const newId = `CH-${Math.floor(Math.random() * 10000)}`;
    
    // Ajouter la nouvelle chambre au début du tableau
    listeDesChambres.unshift({
      ...newChambre,
      identifiant: newId
    });
    
    // Fermer la modal et réinitialiser le formulaire
    setIsAddModalOpen(false);
    setNewChambre({
      nom: '',
      typeDeLit: '',
      etage: '',
      equipements: '',
      prix: '',
      status: 'libre',
      picture: '/default-room.jpg',
      identifiant: `CH-${Math.floor(Math.random() * 10000)}`
    });
    
    // Revenir à la première page pour voir la nouvelle entrée
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChambre({
      ...newChambre,
      [name]: value
    });
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

          {/* Bouton d'ajout à droite */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-64 px-4 py-2 rounded-md bg-purple-600 text-white flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors"
            >
              <Plus size={16} />
              Nouvelle chambre
            </button>
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
                currentItems.map((chambre, index) => (
                  <tr key={index} >
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={chambre.picture}
                          alt={`Photo de ${chambre.nom}`}
                          className="w-25 h-13 rounded-lg mr-3 text-xs "
                        />
                        <div>
                          <p className="text-red-500 text-xs">
                            {chambre.identifiant}
                          </p>
                          <p className="font-medium text-xs">{chambre.nom}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-wrap opacity-70">
                      {chambre.typeDeLit}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-bold">{chambre.etage}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="text-xs opacity-70 text-wrap">
                        {chambre.equipements}
                      </p>
                    </td>
                    <td className="p-4 whitespace-wrap text-xs font-bold whitespace-nowrap">
                      {chambre.prix}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-4 py-3 inline-block min-w-[100px] text-center rounded-lg text-xs ${
                          chambre.status === "libre"
                            ? "bg-teal-900 text-white"
                            : chambre.status === "occupé"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {chambre.status}
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
                    Aucune chambre ne correspond aux critères sélectionnés
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

      {/* Modal d'ajout de chambre */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter une nouvelle chambre</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddChambre}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom de la chambre</label>
                  <input
                    type="text"
                    name="nom"
                    value={newChambre.nom}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type de lit</label>
                  <input
                    type="text"
                    name="typeDeLit"
                    value={newChambre.typeDeLit}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Étage</label>
                  <input
                    type="text"
                    name="etage"
                    value={newChambre.etage}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Équipements</label>
                  <input
                    type="text"
                    name="equipements"
                    value={newChambre.equipements}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Prix (€)</label>
                  <input
                    type="number"
                    name="prix"
                    value={newChambre.prix}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Statut</label>
                  <select
                    name="status"
                    value={newChambre.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="libre">Disponible</option>
                    <option value="occupé">Réservée</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    Ajouter la chambre
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}