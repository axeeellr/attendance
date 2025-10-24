import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "../utils/toast.js";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Bienvenido");
            nav("/grupos");
        } catch (e) {
            toast.error(e.message || "Error de autenticación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md">
            <h2 className="text-xl font-semibold mb-4">Ingresar</h2>
            <form onSubmit={submit} className="space-y-3 bg-white border rounded-2xl p-5">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Correo</label>
                    <input className="w-full border rounded-xl p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
                    <input className="w-full border rounded-xl p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button disabled={loading} className="w-full px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
                <p className="text-sm text-gray-600">¿No tienes cuenta?{" "}<Link to="/register" className="underline">Regístrate</Link></p>
            </form>
        </div>
    );
}
