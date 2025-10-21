import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header.jsx";
import Sidebar from "./layout/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import GroupsPage from "./pages/Groups.jsx";
import AttendancePage from "./pages/Attendance.jsx";
import ObservationsPage from "./pages/Observations.jsx";


//Principal Layout
function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex flex-1 max-w-7xl grid grid-cols-[15rem_1fr]">
                <Sidebar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}


function NotFound() {
    return (
        <div className="rounded-2xl border bg-white p-6">
            <p className="font-medium">Página no encontrada</p>
            <p className="text-sm text-gray-600 mt-1">Revisa la URL o usa el menú lateral.</p>
        </div>
    );
}


export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/grupos" element={<GroupsPage />} />
                    <Route path="/asistencias" element={<AttendancePage />} />
                    <Route path="/observaciones" element={<ObservationsPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
