export const toast = {
    success: (msg)=> nativeToast(msg, 'success'),
    error: (msg)=> nativeToast(msg, 'error')
}

function nativeToast(message, variant){
    
    const id = `toast-${Math.random().toString(36).slice(2)}`
    const host = document.getElementById('toast-host') || (()=>{
        const el = document.createElement('div')
        el.id = 'toast-host'
        el.className = 'fixed top-6 left-1/2 -translate-x-1/2 space-y-2 z-[100]'
        document.body.appendChild(el)
        return el
    })()

    const node = document.createElement('div')
    node.id = id
    node.className = `px-4 py-3 rounded-xl shadow border font-medium text-sm ${variant==='success'?'bg-emerald-100 border-emerald-500 text-emerald-600':'bg-rose-200 border-rose-700 text-rose-700'}`
    node.textContent = message

    host.appendChild(node)
    setTimeout(()=>{ node.remove() }, 3000)
}