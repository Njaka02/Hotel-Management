import "./index.css";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Clients from "./pages/Clients";
import Chambres from "./pages/Chambres";
import Dashboard from "./pages/Dashboard";
import Calendrier from "./pages/Calendrier";
import Reservations from "./pages/Reservations";
import DashboardLayout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/chambres" element={<Chambres />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/details" element={<Details />} />

            {/*<Route path="/factures" element={<Factures />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/appels" element={<Appels />} />
            <Route path="/clients-connectes" element={<ClientConnectés />} /> */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}
