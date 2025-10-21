import { useEffect, useState } from 'react'

export default function usePersistedState(key, initialValue){
    const [state, setState] = useState(()=>{
        const raw = localStorage.getItem(key)
        return raw? JSON.parse(raw) : initialValue
    })

    useEffect(()=>{ localStorage.setItem(key, JSON.stringify(state)) }, [key, state])
    return [state, setState]
}