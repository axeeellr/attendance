import React from "react";
import Card from "../components/Card.jsx";

export default function Home() {
    return (
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Bienvenido(a) al Sistema</h2>
        <p className="text-gray-600 max-w-prose">Este sistema permite registrar la <strong>asistencia</strong> y asignar{" "}<strong>observaciones</strong>. Usa el menú lateral o selecciona una opción para comenzar.</p>
        <div className="grid sm:grid-cols-2 gap-4">
            <Card
            title="Pasar asistencia"
            description="Selecciona un grupo y marca presentes."
            to="/grupos"
            />
            
            <Card
            title="Asignar observaciones"
            description="Selecciona un grupo y aplica observaciones."
            to="/grupos"
            />
        </div>
    </section>
  );
}
