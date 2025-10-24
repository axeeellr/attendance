import React, { useEffect, useState } from "react";
import usePersistedState from "../hooks/usePersistedState.js";
import { getStudentsByGroup, getObservationCatalog } from "../services/api.js";
import ObservationModal from "../components/ObservationModal.jsx";

export default function ObservationsPage() {
    const [selectedGroup] = usePersistedState("selectedGroup", null);
    const [students, setStudents] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [modal, setModal] = useState({ open: false, student: null });

    useEffect(() => {
        if (!selectedGroup) return;
        (async () => {
            const data = await getStudentsByGroup(selectedGroup.id);
            setStudents(data);
        })();
    }, [selectedGroup]);

    useEffect(() => {
        (async () => {
            const cat = await getObservationCatalog();
            setCatalog(cat);
        })();
    }, []);

    const openFor = (student) => setModal({ open: true, student });
    const close = () => setModal({ open: false, student: null });

    if (!selectedGroup) {
        return (
            <div className="rounded-2xl border bg-white p-6">
                <p className="font-medium">Primero selecciona un grupo</p>
                <p className="text-sm text-gray-600 mt-1">Ve a <a href="/grupos" className="underline">Grupos</a> y elige uno.</p>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold">Observaciones | {selectedGroup?.nombre}</h2>

            <div className="rounded-2xl border bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="text-left p-3">Estudiante</th>
                            <th className="text-left p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id} className="border-t">
                                <td className="p-3">{s.nombre}</td>
                                <td className="p-3">
                                    <button onClick={() => openFor(s)} className="px-3 py-1.5 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700">Asignar</button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td className="p-6 text-center text-gray-500" colSpan={2}>No hay estudiantes en este grupo.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ObservationModal
                open={modal.open}
                onClose={close}
                student={modal.student}
                catalog={catalog}
                groupId={selectedGroup.id}
            />
        </section>
    );
}
