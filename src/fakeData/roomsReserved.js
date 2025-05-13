import React from "react";
import "react-calendar/dist/Calendar.css";
import Chambre1 from "../assets/Chambre-1.jpeg";
import Chambre2 from "../assets/Chambre-2.jpeg";
import Chambre3 from "../assets/Chambre-3.jpeg";
// import Chambre4 from "../assets/Chambre-4.jpeg";
import Personne1 from "../assets/Personne-1.jpeg";
import Personne2 from "../assets/Personne-2.jpeg";
import Personne3 from "../assets/Personne-3.jpeg";
// import Personne4 from "../../assets/Personne-4";
import {
  BedDouble,
  FileCheck,
  CheckCheck,
  PhoneMissed,
  PhoneIncoming,
} from "lucide-react";

const getPhoneIconBox = (type) => {
  const isIncoming = type === "incoming";
  const Icon = isIncoming ? PhoneIncoming : PhoneMissed;
  const bgColor = isIncoming ? "bg-green-100" : "bg-red-100";
  const iconColor = isIncoming ? "#0f766e" : "#ef4444";

  return React.createElement(
    "div",
    {
      className: `${bgColor} p-3 rounded-xl`, // padding et bord arrondi
    },
    React.createElement(Icon, { size: 20, color: iconColor })
  );
};

export const aboutReservation = [
  {
    name: "Nouvelles reservation",
    number: "83",
    logo: React.createElement(BedDouble, { size: 30 }),
  },
  {
    name: "Reservation",
    number: "165",
    logo: React.createElement(BedDouble, { size: 30 }),
  },
  {
    name: "Enregistrements",
    number: "50",
    logo: React.createElement(FileCheck, { size: 30 }),
  },
  {
    name: "Verification",
    number: "83",
    logo: React.createElement(CheckCheck, { size: 30 }),
  },
];

export const roomsReserved = [
  {
    id: 1,
    image: React.createElement("img", {
      src: Chambre1,
      alt: "Chambre 1",
      className: "w-40 h-20 my-2 rounded-xl object-cover",
    }),
    description: "Queen Bed A-12324",
    person: React.createElement("img", {
      src: Personne1,
      alt: "James Sukardi",
      className: "w-10 h-10 rounded-full object-cover", // Changé rounded-4xl en rounded-full
    }),
    logo: getPhoneIconBox("incoming"),
    name: "James Sukardi",
    time: "il y a 12 min",
    date: "Hier, 19:04",
    motif: "fdsdfgsaggre",
    number: "17",
  },
  {
    id: 2,
    image: React.createElement("img", {
      src: Chambre2,
      alt: "Chambre 2",
      className: "w-40 h-20 my-2 rounded-xl object-cover",
    }),
    description: "Deluxe Room b-1324",
    person: React.createElement("img", {
      src: Personne2,
      alt: "Angela Moss",
      className: "w-10 h-10 rounded-full object-cover",
    }),
    logo: getPhoneIconBox("missed"),
    name: "Angela Moss",
    time: "il y a 12 min",
    date: "Hier, 19:04",
    motif: "fdsdfgsaggre",
    number: "16,17,18",
  },
  {
    id: 3,
    image: React.createElement("img", {
      src: Chambre3,
      alt: "Chambre 3",
      className: "w-40 h-20 my-2 rounded-xl object-cover",
    }),
    description: "King Big C-2445",
    person: React.createElement("img", {
      src: Personne3,
      alt: "JGeovanny",
      className: "w-10 h-10 rounded-full object-cover",
    }),
    logo: getPhoneIconBox("missed"),
    name: "JGeovanny",
    time: "il y a 12 min",
    date: "Hier, 19:44",
    motif: "fdsdfgsaggre",
    number: "20",
  },
  {
    id: 4,
    image: React.createElement("img", {
      src: Chambre1,
      alt: "Chambre 1",
      className: "w-40 h-20 my-2 rounded-xl object-cover",
    }),
    description: "Queen Bed A-12324",
    person: React.createElement("img", {
      src: Personne1,
      alt: "James Sukardi",
      className: "w-10 h-10 rounded-full object-cover",
    }),
    logo: getPhoneIconBox("missed"),
    name: "James Sukardi",
    time: "il y a 12 min",
    date: "Hier, 20:04",
    motif: "fdsdfgsaggre",
    number: "17",
  },
];

export const getColorClass = (number) => {
  if (number >= 20) return "bg-orange-500";
  if (number >= 10) return "bg-teal-900";
  return "bg-red-500";
};
