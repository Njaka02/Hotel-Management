import { useState } from "react";
import AsideNav from "../NavBar/AsideNav";
import AsideNavH from "../NavBar/AsideNavH";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  return (
    <>
      <div className="flex min-h-screen">
        <AsideNav onSelectSection={setSelectedSection} />
        <div className="flex-1 flex flex-col pt-8">
          <AsideNavH sectionTitle={selectedSection} />
          <main className="pt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
