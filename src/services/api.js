// Capa de acceso a API. Cambiar USE_MOCK=false cuando el backend esté listo.
import { mockGroups, mockStudentsByGroup, mockObservationsCatalog } from '../data/mock.js'

const USE_MOCK = true
const BASE_URL = '/api'

export async function getGroups(){
    if(USE_MOCK) return mockGroups

    const res = await fetch(`${BASE_URL}/groups`)

    if(!res.ok) throw new Error('Error al cargar grupos')

    return res.json()
}


export async function getStudentsByGroup(groupId){
    if(USE_MOCK) return mockStudentsByGroup[groupId] ?? []

    const res = await fetch(`${BASE_URL}/groups/${groupId}/students`)

    if(!res.ok) throw new Error('Error al cargar estudiantes')

    return res.json()
}


export async function getObservationCatalog(){
    if(USE_MOCK) return mockObservationsCatalog

    const res = await fetch(`${BASE_URL}/observations/catalog`)

    if(!res.ok) throw new Error('Error al cargar catálogo')

    return res.json()
}


export async function saveAttendance(payload){
    if(USE_MOCK){
        console.log('[MOCK] POST /attendance', payload)
        await new Promise(r=>setTimeout(r,400))
        return { ok:true }
    }

    const res = await fetch(`${BASE_URL}/attendance`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
    if(!res.ok) throw new Error('Error al guardar asistencia')
    return res.json()
}


export async function assignObservation(payload){
    if(USE_MOCK){
        console.log('[MOCK] POST /observations/assign', payload)
        await new Promise(r=>setTimeout(r,400))
        return { ok:true }
    }
    
    const res = await fetch(`${BASE_URL}/observations/assign`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
    if(!res.ok) throw new Error('Error al asignar observación')
    return res.json()
}