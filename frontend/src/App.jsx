import { BrowserRouter, Routes, Route } from "react-router";
import TopPage from "./pages/TopPage";
import ReservePage from "./pages/ReservePage";
import ReserveCompletePage from "./pages/ReserveCompletePage";
import VisitRecordPage from "./pages/VisitRecordPage";
import LoginPage from "./pages/admin/LoginPage";
import AdminMenuPage from "./pages/admin/AdminMenuPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
