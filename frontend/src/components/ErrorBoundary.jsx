import React from 'react'

export default class ErrorBoundary extends React.Component{
    
    constructor(p){ super(p); this.state={ hasError:false, error:null } }
    static getDerivedStateFromError(error){ return { hasError:true, error } }
    componentDidCatch(error, info){ console.error('ErrorBoundary:', error, info) }

    render(){
        if(this.state.hasError){
            return (
                <div className="rounded-2xl border bg-white p-6">
                    <p className="font-medium">Algo salió mal.</p>
                    <p className="text-sm text-gray-600 mt-1">{String(this.state.error)}</p>
                </div>
            )
        }

        return this.props.children
    }
}