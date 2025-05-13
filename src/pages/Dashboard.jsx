import { useState } from "react";
import Calendar from "react-calendar";
import {
  aboutReservation,
  roomsReserved,
  getColorClass,
} from "../fakeData/roomsReserved";
import { NotepadText } from "lucide-react";
import MyBarChart from "../components/Chart/MyLineChart";
import DoubleBarChart from "../components/Chart/MyBarChart";

export default function Dashboard() {
  return (
    <>
      <div className="bg-gray-100 h-auto">
        <div className="grid grid-cols-4 gap-9.5 p-10">
          {aboutReservation.map((about, index) => (
            <li
              key={index}
              className="flex items-start gap-3 bg-white p-5 h-auto w-70 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-xl p-2 bg-rose-100 rounded-xl p-4 text-red-500">
                {about.logo}
              </span>
              <div className="flex flex-col">
                <span className="font-semibold pb-2 text-xl">
                  {about.number}
                </span>
                <span className="text-sm text-gray-600">{about.name}</span>
              </div>
            </li>
          ))}
        </div>

        <div className="grid grid-cols-2">
          <div className="h-200 w-150 bg-white ml-10 mb-20 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
            <MonCalendrier />
            <hr className="mx-6 opacity-30" />
            <MonReservation />
          </div>

          <div className="grid grid-cols-2 ml-5">
            <div className="bg-white  h-50 w-70 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
              <TauxDeRemplissage />
            </div>
            <div className="bg-white  h-50 w-70 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
              <RevenueGenerer />
            </div>
            <div className="mb-10">
              <div className="h-100 w-150 bg-white  mt-10 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
                <StatReservation />
              </div>
              <div className="h-100 w-150 bg-white  mt-10 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:shadow-xl transition-shadow duration-300">
                <RecentCall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MonCalendrier() {
  const [value, setValue] = useState(new Date());
  return (
    <div className="p-10 max-w-md mx-auto">
      <Calendar
        onChange={setValue}
        value={value}
        className="react-calendar border-none w-full"
      />
    </div>
  );
}

function MonReservation() {
  return (
    <>
      <div className="p-10">
        {roomsReserved.map((reservation, index) => (
          <li key={index} className="flex justify-between list-none w-full">
            <div className="flex">
              <span>{reservation.image}</span>
              <div className="pl-5 pt-1">
                <span className="text-md font-bold">
                  {reservation.description}
                </span>
                <div className="flex pt-2">
                  <span className="pr-2">{reservation.person}</span>
                  <span className="pt-2 pr-2 font-semibold">
                    {reservation.name}
                  </span>
                  <span className="pt-2.5 text-sm">{reservation.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center ">
              <span
                className={`${getColorClass(
                  reservation.number
                )} text-white px-3 py-1 rounded-md`}
              >
                {reservation.number}
              </span>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}

function TauxDeRemplissage() {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between pb-5">
          <h2 className="font-semibold">Taux de remplissage</h2>
          <span className="text-green-600 font-bold">+18,2%</span>
        </div>

        <div className="flex justify-between items-start w-full ">
          <div>
            <div className="flex items-center gap-1">
              <NotepadText
                size={40}
                className="text-green-900 bg-green-100 p-2 rounded-md"
              />
              <span className="opacity-70 pl-1">Réservées</span>
            </div>
            <div className="flex flex-col text-left pt-2 space-y-1">
              <span className="font-bold">62,2%</span>
              <span className="opacity-70">12</span>
            </div>
          </div>

          <div className="border-l h-20 border-gray-300 mx-4" />

          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1">
              <span className="opacity-70 pr-1">Libre</span>
              <NotepadText
                size={40}
                className=" text-blue-700 bg-blue-100 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col text-right pt-2 space-y-1">
              <span className="font-bold">37,8%</span>
              <span className="opacity-70">8</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RevenueGenerer() {
  return (
    <>
      <div className="p-4">
        <NotepadText
          size={40}
          className="text-green-900 bg-green-100 p-3 rounded-4xl"
        />
        <span className="opacity-70">Revenu généré</span>
        <MyBarChart className="-mt-2" />
      </div>
    </>
  );
}

function StatReservation() {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <h2>Statistique des reservations</h2>
          <span>Mensuel</span>
        </div>
        <div className="flex justify-around pt-5">
          <div className="flex">
            <div className="w-7 h-7 bg-teal-900 rounded-md shadow-lg"></div>
            <h3 className="pl-2">
              Ch. occupée <span className="font-semibold"> 170</span>
            </h3>
          </div>

          <div className="flex">
            <div className="w-7 h-7 bg-red-500 rounded-md shadow-lg"></div>
            <h3 className="pl-2">
              Ch. disponible <span className="font-semibold"> 115</span>
            </h3>
          </div>
        </div>
        <div className="pt-5">
          <DoubleBarChart />
        </div>
      </div>
    </>
  );
}

function RecentCall() {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between pb-6">
          <h2 className="font-bold text-xl">Appels récents</h2>
          <span className="text-teal-900 text-xl">Voir tout</span>
        </div>

        <div>
          {roomsReserved.map((call, index) => (
            <li key={index} className="list-none">
              <div className="flex  justify-between items-start">
                <div className="flex pl-5 pt-1">
                  <span className="mr-3 pt-2 pr-5">{call.logo}</span>
                  <div>
                    <span className="text-md font-bold">
                      {call.description}
                    </span>
                    <div className="flex pt-2">
                      <span className="pr-2">{call.person}</span>
                      <span className="pt-2 pr-2 font-semibold">
                        {call.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs">{call.date}</span>
                  <br />
                  <span className="text-red-500 text-sm">{call.motif}</span>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
