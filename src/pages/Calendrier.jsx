import Calendar from "react-calendar";
import { useState, useMemo } from "react";
import DoubleBarChart from "../components/Chart/MyBarChart";
import { listReservation, getColorClass } from "../fakeData/listReservation";

export default function Calendrier() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="bg-gray-100 min-h-screen pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          <div className="flex justify-center">
            <MonCalendrier value={selectedDate} onChange={setSelectedDate} />
          </div>
          <hr className="border-gray-200 mx-6" />
          <MonReservation selectedDate={selectedDate} />
        </div>

        <div>
          <About selectedDate={selectedDate} />

          {/* <div className="bg-white rounded-lg shadow-xl p-6 mt-8">
            <StatReservation selectedDate={selectedDate} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

function MonCalendrier({ value, onChange }) {
  return (
    <div className="p-6 w-full max-w-md">
      {" "}
      {/* Ajout de max-w-md */}
      <Calendar
        onChange={onChange}
        value={value}
        className="react-calendar border-0 w-full"
        locale="fr-FR"
        tileClassName={({ date }) => {
          const day = date.getDate();
          const hasReservation = listReservation.some((res) => {
            const jours = res.sejour.split(",").map((j) => parseInt(j.trim()));
            return jours.includes(day);
          });
          return hasReservation ? "bg-teal-50 text-teal-900" : "";
        }}
      />
    </div>
  );
}

function MonReservation({ selectedDate }) {
  const day = selectedDate.getDate();

  const reservationsDuJour = listReservation.filter((res) => {
    const joursResa = res.sejour.split(",").map((j) => parseInt(j.trim()));
    return joursResa.includes(day);
  });

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Réservations du {selectedDate.toLocaleDateString("fr-FR")}
      </h3>

      {reservationsDuJour.length > 0 ? (
        <ul className="space-y-4">
          {reservationsDuJour.map((reservation, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={reservation.image}
                  alt={reservation.typeChambre}
                  className="h-16 w-24 rounded-md object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">
                    {reservation.typeChambre}
                  </p>
                  <div className="flex items-center mt-1">
                    <img
                      src={reservation.picture}
                      alt={reservation.nom}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="ml-2 text-sm font-medium">
                      {reservation.nom}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span
                  className={`${getColorClass(
                    reservation.sejour
                  )} text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {reservation.sejour}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Aucune réservation pour cette date
        </div>
      )}
    </div>
  );
}

function About({ selectedDate }) {
  const { dateStr, chambresDisponibles, chambresReservees, tauxRemplissage } =
    useMemo(() => {
      const day = selectedDate.getDate();
      const dateStr = selectedDate.toLocaleDateString("fr-FR");

      const reservationsDuJour = listReservation.filter((res) => {
        const joursResa = res.sejour.split(",").map((j) => parseInt(j.trim()));
        return joursResa.includes(day);
      });

      const totalChambres = 60;
      const chambresReservees = reservationsDuJour.length;
      const chambresDisponibles = totalChambres - chambresReservees;
      const tauxRemplissage = Math.round(
        (chambresReservees / totalChambres) * 100
      );

      return {
        dateStr,
        chambresDisponibles,
        chambresReservees,
        tauxRemplissage,
      };
    }, [selectedDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-60">
      <StatCard
  title={`Chambres disponibles (${dateStr})`}
  value={chambresDisponibles}
  percentage={Math.round((chambresDisponibles / 60) * 100)}
  color="bg-blue-500"
/>

<StatCard
  title={`Chambres réservées (${dateStr})`}
  value={chambresReservees}
  percentage={Math.round((chambresReservees / 60) * 100)}
  color="bg-green-500"
/>

      <StatCard
        title="Taux de remplissage"
        value={`${tauxRemplissage}%`}
        percentage={tauxRemplissage}
        color="bg-purple-500"
      />

      <StatCard
        title="Bénéfice estimé"
        value={`${(chambresReservees * 50000).toLocaleString("fr-FR")} Ar`}
        percentage={Math.min(tauxRemplissage, 100)}
        color="bg-yellow-500"
      />
    </div>
  );
}

function StatCard({ title, value, percentage, color }) {
  return (
    <div className="bg-teal-900 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <span className="text-lg font-bold text-white">{value}</span>
      </div>

      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full  rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{
            width: `${percentage}%`,
            transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        ></div>
      </div>

      <div className="mt-1 flex justify-end">
        <span className="text-xs text-white">{percentage}%</span>
      </div>
    </div>
  );
}

// function StatReservation({ selectedDate }) {
//   const monthStats = useMemo(() => {
//     const month = selectedDate.getMonth();
//     const year = selectedDate.getFullYear();

//     // Calcul des stats mensuelles
//     const reservationsMois = listReservation.filter((res) => {
//       // Cette logique devrait être adaptée selon votre structure de données
//       return true; // Simplification pour l'exemple
//     });

//     return {
//       occupees: Math.floor(Math.random() * 100) + 60,
//       disponibles: Math.floor(Math.random() * 50) + 20,
//       mois: selectedDate.toLocaleString("fr-FR", { month: "long" }),
//     };
//   }, [selectedDate]);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Statistiques mensuelles</h3>
//         <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">
//           {monthStats.mois}
//         </span>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="flex items-center">
//           <div className="w-6 h-6 bg-teal-800 rounded-md mr-2"></div>
//           <span className="text-sm">Occupées: {monthStats.occupees}</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-6 h-6 bg-red-500 rounded-md mr-2"></div>
//           <span className="text-sm">Disponibles: {monthStats.disponibles}</span>
//         </div>
//       </div>

//       <div className="h-64">
//         <DoubleBarChart month={selectedDate.getMonth()} />
//       </div>
//     </div>
//   );
// }
