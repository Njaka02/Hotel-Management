import {
  User,
  House,
  Phone,
  Banknote,
  BookUser,
  Calendar,
  DoorOpen,
  ScrollText,
  PersonStanding,
} from "lucide-react";
import { useState } from "react";
import NJgroup from "../../assets/NJgroup.png";
import { useNavigate } from "react-router-dom";

const dashboardNavigation = [
  { name: "Dashboard", path: "/dashboard", logo: <House /> },
  { name: "Clients", path: "/clients", logo: <User /> },
  { name: "Chambres", path: "/chambres", logo: <DoorOpen /> },
  { name: "Calendrier", path: "/calendrier", logo: <Calendar /> },
  { name: "Reservations", path: "/reservations", logo: <BookUser /> },
  { name: "Factures", path: "/factures", logo: <ScrollText /> },
  { name: "Checkout", path: "/checkout", logo: <Banknote /> },
  { name: "Appels", path: "/appels", logo: <Phone /> },
  {
    name: "Client connectés",
    path: "/clients-connectes",
    logo: <PersonStanding />,
  },
];

// export default function AsideNav({ onSelectSection }) {

//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="flex p-6">
//         <div>
//           <div className="flex">
//             <img src={NJgroup} alt="NJgroup Logo" className="w-15 h-15" />
//             <h1 className="font-bold text-xl">
//               Njaka <br /> Hotel
//             </h1>
//           </div>
//           <div className="w-40">
//             <aside>
//               {/*  */}

//               <nav>
//                 <ul>
//                   {dashboardNavigation.map((nav, index) => (
//                     <li key={index}>
//                       <button
//                         onClick={() => {
//                           onSelectSection(nav.name);
//                           navigate(nav.path);
//                         }}
//                         className="flex gap-2 pt-5 text-sm font-bold opacity-65 hover:text-purple-600 transition-color duration-300"
//                       >
//                         {nav.logo} {nav.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function AsideNav({ onSelectSection }) {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex p-6">
      <div>
        <div className="flex">
          <img src={NJgroup} alt="NJgroup Logo" className="w-15 h-15" />
          <h1 className="font-bold text-xl">
            Njaka <br /> Hotel
          </h1>
        </div>
        <div className="w-40">
          <aside>
            <nav>
              <ul>
                {dashboardNavigation.map((nav, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setActiveSection(nav.name);
                        onSelectSection(nav.name);
                        navigate(nav.path);
                      }}
                      className={`relative flex items-center justify-center gap-1 py-2 px-3 text-sm font-bold transition-colors duration-300
                      ${
                        activeSection === nav.name
                          ? "text-purple-600"
                          : "opacity-65 hover:text-purple-600 rounded-md"
                      }`}
                    >
                      {nav.logo} {nav.name}
                      {activeSection === nav.name && (
                        <span className="absolute inset-0 bg-purple-200 rounded-md -z-10 w-[125px] mx-auto " />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
