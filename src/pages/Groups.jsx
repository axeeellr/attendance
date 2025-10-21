import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../services/api.js";
import SkeletonCard from "../components/SkeletonCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import usePersistedState from "../hooks/usePersistedState.js";

export default function GroupsPage() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = usePersistedState("selectedGroup", null);

    useEffect(() => {
        let ignore = false;

        (async () => {
            setLoading(true);
            try {
                const data = await getGroups();
                if (!ignore) setGroups(data);
            } finally {
                setLoading(false);
            }
        })();
        
        return () => {
            ignore = true;
        };
        
    }, []);

    const onSelectGroup = (g) => setSelected(g);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Grupos</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading && <SkeletonCard />}
                {!loading &&
                groups.map((g) => (
                    <div key={g.id} className={`rounded-2xl border bg-white p-5 space-y-3 ${selected?.id === g.id ? "ring-2 ring-indigo-500" : ""}`}>
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">{g.nombre}</h3>
                            {selected?.id === g.id && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                                    Seleccionado
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => {onSelectGroup(g); navigate("/asistencias");}} className="px-3 py-2 rounded-xl text-sm bg-indigo-600 text-white hover:bg-indigo-700">
                                Asistencia
                            </button>
                            <button onClick={() => {onSelectGroup(g); navigate("/observaciones");}} className="px-3 py-2 rounded-xl text-sm border hover:bg-gray-50">
                                Observaciones
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && groups.length === 0 && (
                <EmptyState title="No hay grupos" subtitle="Crea grupos en el backend y recarga."/>
            )}
        </section>
    );
}
