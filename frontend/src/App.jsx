import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header.jsx";
import Sidebar from "./layout/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import GroupsPage from "./pages/Groups.jsx";
import AttendancePage from "./pages/Attendance.jsx";
import ObservationsPage from "./pages/Observations.jsx";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'


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


function PrivateRoute({ children }){
  const { user, initializing } = useAuth()
  if(initializing) return <div className="p-6">Cargando sesión...</div>
  if(!user) return <Navigate to="/login" replace />
  return children
}


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/grupos" element={<ErrorBoundary><GroupsPage/></ErrorBoundary>} />
                        <Route path="/asistencias" element={<ErrorBoundary><AttendancePage/></ErrorBoundary>} />
                        <Route path="/observaciones" element={<ErrorBoundary><ObservationsPage/></ErrorBoundary>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}
