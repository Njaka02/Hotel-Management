import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listeDesClients } from "../fakeData/listeDesClients";

export default function Clients() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("Tout");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const itemsPerPage = 5;

  // Générer les plages de dates mensuelles
  const generateDateRanges = () => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const year = 2024; // Année à adapter selon vos besoins

    return months.map((month, index) => {
      const nextMonthIndex = (index + 1) % 12;
      const nextMonth = months[nextMonthIndex];
      const nextYear = index === 11 ? year + 1 : year;

      return {
        value: `${index + 1}-${nextMonthIndex + 1}`,
        text: `01 ${month} ${year} - 01 ${nextMonth} ${nextYear}`,
      };
    });
  };

  const dateRanges = generateDateRanges();

  // Fonction pour convertir la date de commande en objet Date
  const parseCommandDate = (dateString) => {
    const [day, month, year] = dateString.split(" ");
    const monthIndex = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ].findIndex((m) => m === month.substring(0, 3));

    return new Date(year, monthIndex, parseInt(day));
  };

  // Filtrage combiné (statut + date)
  const filteredClients = listeDesClients
    .filter((client) => {
      // Filtre par statut
      if (currentFilter === "Tout") return true;
      if (currentFilter === "En attente")
        return client.etatReservation === "En attente";
      if (currentFilter === "Reservé")
        return client.etatReservation === "Confirmée";
      if (currentFilter === "Annulé")
        return client.etatReservation === "Annulée";
      if (currentFilter === "Remboursé")
        return client.statutPaiement === "Remboursé";
      return true;
    })
    .filter((client) => {
      // Filtre par date si une plage est sélectionnée
      if (!selectedDateRange) return true;

      const [startMonth, endMonth] = selectedDateRange.split("-").map(Number);
      const commandDate = parseCommandDate(client.commande);
      const commandMonth = commandDate.getMonth() + 1; // Les mois commencent à 0

      // Gestion du cas où la plage traverse une nouvelle année (ex: Décembre-Janvier)
      if (startMonth > endMonth) {
        return commandMonth >= startMonth || commandMonth < endMonth;
      }
      return commandMonth >= startMonth && commandMonth < endMonth;
    });

  // Calcul des données paginées
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  // Fonctions de navigation
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 h-auto p-10">
      <div className="pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {["Tout", "En attente", "Reservé", "Annulé", "Remboursé"].map(
            (filter) => (
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
            )
          )}
        </div>

        <div className="w-full md:w-auto">
          <select
            value={selectedDateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
          >
            <option value="">Toutes dates</option>
            {dateRanges.map((range, index) => (
              <option key={index} value={range.value}>
                {range.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto p-5 bg-white rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Client",
                "Commande",
                "Arrivé",
                "Départ",
                "Requête spéciale",
                "Type de chambre",
                "Statut",
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
                        className="w-10 h-10 rounded-lg mr-3"
                      />
                      <div>
                        <p className="font-medium">{client.nom}</p>
                        <p className="text-red-500 text-xs">
                          {client.identifiant}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap opacity-70">
                    {client.commande}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <p className="font-bold">{client.arrive}</p>
                    <p className="text-xs opacity-70 text-center">
                      {client.tArriver}
                    </p>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <p className="font-bold">{client.depart}</p>
                    <p className="text-xs opacity-70 text-center">
                      {client.tDepart}
                    </p>
                  </td>
                  <td className="p-4 whitespace-wrap opacity-70">
                    {client.requeteSpeciale}
                  </td>
                  <td className="p-4 whitespace-nowrap font-bold">
                    {client.typeChambre}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`px-4 py-3 inline-block min-w-[100px] text-center rounded-lg text-xs ${
                        client.etatReservation === "Confirmée"
                          ? "bg-teal-900 text-white"
                          : client.etatReservation === "En attente"
                          ? "bg-orange-500 text-white"
                          : client.etatReservation === "Annulée"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {client.etatReservation}
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
        {filteredClients.length > 0 && (
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
  );
}

// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { listeDesClients } from "../fakeData/listeDesClients";

// export default function Clients() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentFilter, setCurrentFilter] = useState("Tout"); // Nouvel état pour le filtre
//   const itemsPerPage = 5;

//   // Fonction de filtrage
//   const filteredClients = listeDesClients.filter((client) => {
//     if (currentFilter === "Tout") return true;
//     if (currentFilter === "En attente")
//       return client.etatReservation === "En attente";
//     if (currentFilter === "Reservé")
//       return client.etatReservation === "Confirmée";
//     if (currentFilter === "Annulé") return client.etatReservation === "Annulée";
//     if (currentFilter === "Remboursé")
//       return client.statutPaiement === "Remboursé";
//     return true;
//   });

//   // Calcul des données à afficher (utilise maintenant filteredClients)
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

//   // Fonctions de navigation
//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Fonction pour changer le filtre
//   const handleFilterChange = (filter) => {
//     setCurrentFilter(filter);
//     setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
//   };

//   return (
//     <>
//       <div className="bg-gray-100 h-auto p-10">
//         <div className="pb-6 flex flex-wrap gap-2 md:gap-4">
//           {["Tout", "En attente", "Reservé", "Annulé", "Remboursé"].map(
//             (filter) => (
//               <button
//                 key={filter}
//                 onClick={() => handleFilterChange(filter)}
//                 className={`px-4 py-2 rounded-md w-[125px] font-bold border border-transparent transition-colors duration-300 opacity-70 ${
//                   currentFilter === filter
//                     ? "font-bold text-purple-700 bg-purple-300"
//                     : "hover:text-purple-600"
//                 }`}
//               >
//                 {filter}
//               </button>
//             )
//           )}
//         </div>
//         <div className="overflow-x-auto p-5 bg-white rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
//           <table className="min-w-full  ">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   "Client",
//                   "Commande",
//                   "Arrivé",
//                   "Départ",
//                   "Requete spécial",
//                   "Type de chambre",
//                   "Status",
//                   "Actions",
//                 ].map((tHead, index) => (
//                   <th
//                     key={index}
//                     className="px-4 py-5 font-bold text-left text-wrap tracking-wider"
//                   >
//                     {tHead}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentItems.length > 0
//                 ? currentItems.map((client, index) => (
//                     <tr key={index}>
//                       <td className="p-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <img
//                             src={client.picture}
//                             alt={`Photo de ${client.nom}`}
//                             className="w-10 h-10 rounded-lg mr-3"
//                           />
//                           <div>
//                             <p className="font-medium ">{client.nom}</p>
//                             <p className="text-red-500 text-xs">
//                               {client.identifiant}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap opacity-70">
//                         {client.commande}
//                       </td>
//                       <td className="p-4 whitespace-nowrap">
//                         <p className="font-bold">{client.arrive}</p>
//                         <p className="text-xs opacity-70 text-center">
//                           {client.tArriver}
//                         </p>
//                       </td>
//                       <td className="p-4 whitespace-nowrap">
//                         <p className="font-bold">{client.depart}</p>
//                         <p className="text-xs opacity-70 text-center">
//                           {client.tDepart}
//                         </p>
//                       </td>
//                       <td className="p-4 whitespace-wrap opacity-70">
//                         {client.requeteSpeciale}
//                       </td>
//                       <td className="p-4 whitespace-nowrap font-bold">
//                         {client.typeChambre}
//                       </td>
//                       <td className="p-4 whitespace-nowrap">
//                         <span
//                           className={`px-4 py-3 inline-block min-w-[100px] text-center rounded-lg text-xs  ${
//                             client.etatReservation === "Confirmée"
//                               ? "bg-teal-900 text-white"
//                               : client.etatReservation === "En attente"
//                               ? "bg-orange-500 text-white"
//                               : client.etatReservation === "Annulée"
//                               ? "bg-red-500 text-white"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {client.etatReservation}
//                         </span>
//                       </td>
//                       <td className="p-4 whitespace-nowrap">
//                         <button className="text-blue-500 hover:text-blue-700 mr-2">
//                           ✏️
//                         </button>
//                         <button className="text-red-500 hover:text-red-700">
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 : // Affichage quand il n'y a pas de données
//                   Array.from({ length: itemsPerPage }).map((_, index) => (
//                     <tr key={`empty-${index}`} className="h-12">
//                       {Array.from({ length: 8 }).map((_, cellIndex) => (
//                         <td
//                           key={`empty-cell-${cellIndex}`}
//                           className="px-6 py-6 border-b border-gray-200"
//                         >
//                           ---
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//             </tbody>
//           </table>

//           {/* Contrôles de pagination */}
//           <div className="mt-4 flex items-center justify-end my-2 mx-2">
//             <ChevronLeft
//               size={50}
//               onClick={goToPrevPage}
//               disabled={currentPage === 1}
//               className={`p-2 rounded-md cursor-pointer ${
//                 currentPage === 1
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-purple-400 text-purple-800 hover:bg-purple-500"
//               }`}
//             />

//             <span className="text-sm text-gray-600 mx-5">
//               Page {currentPage} sur {totalPages}
//             </span>

//             <ChevronRight
//               size={50}
//               onClick={goToNextPage}
//               disabled={currentPage === totalPages}
//               className={`p-2  rounded-md cursor-pointer ${
//                 currentPage === totalPages
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-purple-400 text-purple-700 hover:bg-purple-500"
//               }`}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
