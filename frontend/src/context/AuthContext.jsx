// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginApi, registerApi, meApi } from '../services/api.js'

const AuthCtx = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('auth:user')
    return raw? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(()=> localStorage.getItem('auth:token'))
  const [initializing, setInitializing] = useState(true)

  useEffect(()=>{ user? localStorage.setItem('auth:user', JSON.stringify(user)) : localStorage.removeItem('auth:user') },[user])
  useEffect(()=>{ token? localStorage.setItem('auth:token', token) : localStorage.removeItem('auth:token') },[token])

  useEffect(()=>{
    (async()=>{
      try{
        if(token){
          const me = await meApi()
          setUser({ email: me.email, name: me.name })
        }
      }catch{
        setUser(null); setToken(null)
      }finally{
        setInitializing(false)
      }
    })()
  }, [])

  const login = async (email, password)=>{
    const res = await loginApi({ email, password })
    setUser({ email: res.email, name: res.name }); setToken(res.token)
  }
  const register = async (name, email, password)=>{
    const res = await registerApi({ name, email, password })
    setUser({ email: res.email, name: res.name }); setToken(res.token)
  }
  const logout = ()=>{ setUser(null); setToken(null) }

  return <AuthCtx.Provider value={{ user, token, initializing, login, register, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = ()=> useContext(AuthCtx)
