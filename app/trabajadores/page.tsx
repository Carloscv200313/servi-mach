import React from 'react'
import { Pagina01 } from '@/paginas/pagina-02/pagina-01'
import { Pagina02 } from '@/paginas/pagina-02/pagina-02'
import { Pagina03 } from '@/paginas/pagina-02/pagina-03'


export default function Home() {
    return (
        <div className='bg-blue-500 min-h-screen'>
            <Pagina01/>
            <Pagina02/>
            <Pagina03/>
        </div>
    )
}