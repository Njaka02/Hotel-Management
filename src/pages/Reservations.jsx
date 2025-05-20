import {
  PencilIcon,
  Share2Icon,
  Trash2Icon,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  ListCollapseIcon,
  Plus,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { listDesCommand } from "../fakeData/listeCommand";
import DatePickerWithRange from "@/components/DatePickerWithRange/DatePickerWithRange";

export default function Reservations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("Tout");
  const itemsPerPage = 5;

  const filteredCommande = listDesCommand.filter((commande) => {
    if (currentFilter === "Tout") return true;
    if (currentFilter === "Completé") return commande.status === "Complete";
    if (currentFilter === "En cours") return commande.status === "En cours";
    return true;
  });

  //   Calcul des données à afficher (utilise maintenant filteredClients)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCommande.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCommande.length / itemsPerPage);
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

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="bg-gray-100 h-auto p-10">
        <div className="pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {["Tout", "Completé", "En cours"].map((comandType) => (
              <button
                key={comandType}
                onClick={() => handleFilterChange(comandType)}
                className={`px-4 py-2 rounded-md w-[125px] font-bold border border-transparent transition-colors duration-300 opacity-70 ${
                  currentFilter === comandType
                    ? "font-bold text-purple-700 bg-purple-300"
                    : "hover:text-purple-600"
                }`}
              >
                {comandType}
              </button>
            ))}
          </div>

          <div className="w-full md:w-auto flex  gap-2">
            <DatePickerWithRange />
            <button className="flex justify-between items-center w-full md:w-64 px-4 py-1 font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
              Nouvelle reservation
              <Plus size={15} className="ml-2" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto p-5 bg-white rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Client",
                  "Date",
                  "Réference",
                  "Total",
                  "Payé",
                  "Solde",
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
                          <p className="font-medium">{client.nom}</p>
                          <p className="text-red-500 text-xs">
                            {client.identifiant}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-wrap opacity-80">
                      {client.date}
                    </td>

                    <td className="p-4 whitespace-wrap opacity-60 text-sm">
                      {client.reference}
                    </td>

                    <td className="p-4 whitespace-wrap font-semibold text-sm">
                      {client.total}
                    </td>

                    <td
                      className={`p-4 whitespace-wrap font-semibold text-sm ${
                        parseNumericValue(client.statutPaiement) < 100000
                          ? "text-black"
                          : parseNumericValue(client.statutPaiement) <= 200000
                          ? "text-teal-700"
                          : "text-green-500"
                      }`}
                    >
                      {client.statutPaiement}
                    </td>

                    <td
                      className={`p-4 whitespace-wrap font-semibold text-sm ${
                        parseNumericValue(client.solde) < 10000
                          ? "text-black"
                          : parseNumericValue(client.solde) <= 100000
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {client.solde}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-4 py-3 inline-block min-w-[100px] text-center rounded-lg text-xs ${
                          client.status === "Complete"
                            ? "bg-teal-900 text-white"
                            : client.status === "En cours"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap text-center">
                      {/* <button className="text-blue-500 hover:text-blue-700 mr-2">
                        ✏️
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        🗑️
                      </button> */}
                      <ActionMenu />
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
          {listDesCommand.length > 0 && (
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

function parseNumericValue(currencyString) {
  // Supprime " Ar", les espaces et convertit en nombre
  return parseInt(currencyString.replace(/ Ar/g, "").replace(/\s/g, ""), 10);
}

function ActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    if (!isOpen) return; // Ne fait rien si le menu est déjà fermé

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]); // Ré-exécute l'effet quand isOpen change
  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleMenu}
          ref={menuRef}
          className="p-2 rounded-xl hover:bg-gray-200 transition-colors duration-300"
          aria-label="Ouvrir le menu d'actions"
        >
          <EllipsisVertical className="w-5 h-5 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-30 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            <Link
            // to="/details"
              // onClick={() => navigate("/details")}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <ListCollapseIcon className="w-4 h-4 mr-2" />
              Details
            </Link>
            <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
              <PencilIcon className="w-4 h-4 mr-2" /> Modifier
            </button>
            <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
              <Trash2Icon className="w-4 h-4 mr-2" />
              Suprimer
            </button>
            <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
              <Share2Icon className="w-4 h-4 mr-2" />
              Partager
            </button>
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
