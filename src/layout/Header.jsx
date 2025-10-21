import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    return (
        <header className="h-16 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
            <div className="max-w-7xl h-full px-4 flex items-center justify-between">
                <Link className="flex items-center gap-3" to="/">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600" />
                    <h1 className="font-semibold text-lg">Sistema de Asistencia</h1>
                </Link>
                <div className="text-sm text-gray-500 opacity-0">v0.1.0</div>
            </div>
        </header>
    );
}
