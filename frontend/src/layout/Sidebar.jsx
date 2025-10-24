import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx'

export default function Sidebar() {
    const location = useLocation()
    const { user } = useAuth()

    const linkCls = (to) =>
    `block px-4 py-3 rounded-xl text-sm transition ${location.pathname === to ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`;
    
    return (
        <aside className="w-60 border-r bg-white/70 p-3">
            <nav className="space-y-1">
                <Link className={linkCls("/")} to="/">Inicio</Link>
                <Link className={linkCls("/grupos")} to="/grupos">Grupos</Link>
                {!user && (
                <>
                    <Link className={linkCls('/login')} to="/login">Ingresar</Link>
                    <Link className={linkCls('/register')} to="/register">Registrarse</Link>
                </>
                )}
            </nav>
        </aside>
    );
}
