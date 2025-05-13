import { useNavigate } from "react-router-dom";
import { ArrowRightFromLine, Search } from "lucide-react";

export default function AsideNavH({ sectionTitle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLLoggedIn");

    navigate("/", { replace: true });
  };
  return (
    <>
      <div>
        <div className="flex items-center gap-110">
          <h2 className="text-2xl font-semibold mb-2">{sectionTitle}</h2>
          <div>
            <div className="relative w-64">
              <input
                type="search"
                placeholder="Rechercher..."
                className="bg-gray-100 rounded-md pl-2 pr-3 py-2 w-full focus:outline-none"
              />
              <Search className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="relative group cursor-pointer" onClick={handleLogout}>
            <ArrowRightFromLine className="text-gray-500 hover:text-gray-700 transition-colors duration-300" />

            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap z-10">
              Déconnexion
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
