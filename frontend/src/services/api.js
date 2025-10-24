// src/services/api.js
import { getAuthToken } from './auth.jsx'

const BASE_URL = '/api' // via proxy

function authHeaders(){
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function http(path, init = {}){
    const res = await fetch(`${BASE_URL}${path}`, init)
    if(!res.ok){
        let msg = `${res.status} ${res.statusText}`
        try { msg += `: ${await res.text()}` } catch {}
        throw new Error(msg)
    }

    if(res.status === 204) return null
    
    const ct = res.headers.get('content-type') || ''
    
    if (!ct.includes('application/json')) return null
    
    return res.json()
}

export async function getGroups(){
  return http(`/groups`, { headers:{ ...authHeaders() } })
}
export async function getStudentsByGroup(groupId){
  return http(`/groups/${groupId}/students`, { headers:{ ...authHeaders() } })
}
export async function getObservationCatalog(){
  return http(`/observations/catalog`, { headers:{ ...authHeaders() } })
}

export async function saveAttendance(payload){
    return http(`/attendance`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', ...authHeaders() },
        body: JSON.stringify(payload)
    })
}

export async function assignObservation(payload){
    return http(`/observations/assign`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', ...authHeaders() },
        body: JSON.stringify(payload)
    })
}

// Auth
export async function loginApi(credentials){
  return http(`/auth/login`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(credentials)
  })
}
export async function registerApi(payload){
  return http(`/auth/register`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  })
}
export async function meApi(){
  return http(`/auth/me`, { headers:{ ...authHeaders() } })
}
