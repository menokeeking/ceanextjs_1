"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { ChangeEventHandler, useEffect, useState } from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { IoEye, IoPencilSharp, IoReader } from 'react-icons/io5';
import { TablaEmpleados } from '@/interfaces/TablaEmpleados';
import styled from 'styled-components';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Modaltest from '@/components/Modaltest';
import { Progress } from '@/components/Progress';
import Link from 'next/link'
import { TablaListaViaticos } from '@/interfaces/TablaListaViaticos';





function Datatable() {

    const [datos, setDatos] = useState([] as TablaListaViaticos[])
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
    }, [])

   
    
    return (
        <>
            
            <div className='flex-col items-center justify-center'>

                Hola
            </div>
        </>
    )
}

export default Datatable


