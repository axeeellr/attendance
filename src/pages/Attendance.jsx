import React, { useEffect, useState } from 'react'
import usePersistedState from '../hooks/usePersistedState.js'
import { getStudentsByGroup, saveAttendance } from '../services/api.js'
import { toast } from '../utils/toast.js'


export default function AttendancePage(){
    const [selectedGroup] = usePersistedState('selectedGroup', null)
    const [students, setStudents] = useState([])
    const [presentMap, setPresentMap] = useState({})
    const [saving, setSaving] = useState(false)


    useEffect(()=>{
        if(!selectedGroup) return;

        (async()=>{
            const data = await getStudentsByGroup(selectedGroup.id)
            setStudents(data)
            setPresentMap(Object.fromEntries(data.map(s=>[s.id,false])))
        })()
    }, [selectedGroup])

    const toggle = (id)=> setPresentMap(m=>({...m, [id]: !m[id]}))

    const handleSave = async ()=>{
        if(!selectedGroup) return
        
        setSaving(true)

        try{
            const payload = {
                groupId: selectedGroup.id,
                date: new Date().toISOString().slice(0,10),
                records: students.map(s=>({ studentId: s.id, present: !!presentMap[s.id] }))
            }
            await saveAttendance(payload)
            toast.success('Asistencia guardada')
        }catch(e){
            console.error(e)
            toast.error('Error al guardar asistencia')
        }finally{ setSaving(false) }
    }

    if(!selectedGroup){
        return (
            <div className="rounded-2xl border bg-white p-6">
                <p className="font-medium">Primero selecciona un grupo</p>
                <p className="text-sm text-gray-600 mt-1">Ve a <a href="/grupos" className="underline">Grupos</a> y elige uno.</p>
            </div>
        )
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Asistencia | {selectedGroup?.nombre}</h2>
                <button onClick={handleSave} disabled={saving} className="px-3 py-2 rounded-xl text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
                    {saving? 'Guardando...':'Guardar asistencia'}
                </button>
            </div>
            <div className="rounded-2xl border bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="text-left p-3">Estudiante</th>
                            <th className="text-left p-3">Presente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s=> (
                            <tr key={s.id} className="border-t">
                                <td className="p-3">{s.nombre}</td>
                                <td className="p-3">
                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4" checked={!!presentMap[s.id]} onChange={()=>toggle(s.id)} />
                                        <span className="text-gray-600">Presente</span>
                                    </label>
                                </td>
                            </tr>
                        ))}

                        {students.length===0 && (
                            <tr><td className="p-6 text-center text-gray-500" colSpan={2}>No hay estudiantes en este grupo.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}