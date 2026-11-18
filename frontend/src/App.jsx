import { BrowserRouter, Routes, Route } from "react-router";
import TopPage from "./pages/TopPage";
import ReservePage from "./pages/ReservePage";
import ReserveCompletePage from "./pages/ReserveCompletePage";
import VisitRecordPage from "./pages/VisitRecordPage";
import LoginPage from "./pages/admin/LoginPage";
import AdminMenuPage from "./pages/admin/AdminMenuPage";
import AdminReservationsPage from "./pages/admin/AdminReservationsPage";
import AdminCustomerSummaryPage from "./pages/admin/AdminCustomerSummaryPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminNewCustomersPage from "./pages/admin/AdminNewCustomersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/reserve/complete" element={<ReserveCompletePage />} />
        <Route path="/visit-record" element={<VisitRecordPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMenuPage />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route
          path="/admin/customers/:id/summary"
          element={<AdminCustomerSummaryPage />}
        />
        <Route path="/admin/customers" element={<AdminCustomersPage />} />
        <Route
          path="/admin/customers/new"
          element={<AdminNewCustomersPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
