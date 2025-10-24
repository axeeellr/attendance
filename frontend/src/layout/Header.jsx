import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
    const { user, logout } = useAuth()
    return (
        <header className="h-16 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
            <div className="max-w-7xl h-full px-4 flex items-center justify-between">
                <Link className="flex items-center gap-3" to="/">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600" />
                    <h1 className="font-semibold text-lg">Sistema de Asistencia</h1>
                </Link>
                <div className="text-sm text-gray-600 flex items-center gap-3">
                    {user ? (
                    <>
                        <span className="hidden sm:inline">{user.name}</span>
                        <button onClick={logout} className="px-2 py-1 rounded-lg border hover:bg-gray-50">Salir</button>
                    </>
                    ) : (
                        <span className="opacity-70">v0.1.0</span>
                    )}
                </div>
            </div>
        </header>
    );
}
