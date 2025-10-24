import React, { useEffect, useRef, useState } from 'react'
import { toast } from '../utils/toast.js'
import { assignObservation } from '../services/api.js'


export default function ObservationModal({ open, onClose, student, catalog, groupId }){

    const [selectedObs, setSelectedObs] = useState('')
    const [comment, setComment] = useState('')
    const [saving, setSaving] = useState(false)
    const dialogRef = useRef(null)

    useEffect(()=>{
        if(open){ setSelectedObs(''); setComment('') }
    }, [open, student])

    useEffect(()=>{
        if(!dialogRef.current) return
        if(open) dialogRef.current.showModal(); else dialogRef.current.close()
    }, [open])


    const submit = async ()=>{
        if(!selectedObs) return toast.error('Selecciona una observación')
        setSaving(true)

        try{
            await assignObservation({
                groupId,
                studentId: student.id,
                observationCode: selectedObs,
                comment: comment?.trim()||null,
                date: new Date().toISOString()
            })

            toast.success('Observación asignada')
            onClose()
        }catch(e){
            console.error(e)
            toast.error('Error al asignar observación')
        }finally{ setSaving(false) }
    }


    return (
        <dialog ref={dialogRef} className="rounded-2xl w-full max-w-lg p-0 backdrop:bg-black/30">
            <div className="p-5 border-b flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">Asignar observación a</p>
                    <h3 className="font-medium">{student?.nombre}</h3>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-5 space-y-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Observación</label>
                    <select value={selectedObs} onChange={(e)=>setSelectedObs(e.target.value)} className="w-full rounded-xl border p-2">
                        <option value="" disabled>Selecciona...</option>
                        {catalog.map(o=> <option key={o.id} value={o.id}>{o.nombre}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Comentario (opcional)</label>
                    <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className="w-full rounded-xl border p-2 min-h-[90px]" placeholder="Detalles, contexto, etc."/>
                </div>
            </div>
            <div className="p-5 border-t flex justify-end gap-2">
                <button onClick={onClose} className="px-3 py-2 rounded-xl text-sm border hover:bg-gray-50">Cancelar</button>
                <button onClick={submit} disabled={saving} className="px-3 py-2 rounded-xl text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">{saving? 'Guardando...':'Guardar'}</button>
            </div>
        </dialog>
    )
}