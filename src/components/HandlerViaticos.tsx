"use client"
import { Ciudad } from '@/interfaces/Ciudades';
import { DetalleViatico } from '@/interfaces/DetalleViatico';
import { TablaViaticos } from '@/interfaces/TablaViaticos';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Modalviatico from './Modalviatico';
import Tablasdeviaticos from './Tablasdeviaticos';
import Tarjetaempleado from './Tarjetaempleado';

function HandlerViaticos({ params }: { params: { noemp: string } }) {

    const [showModal, setShowModal] = useState(false);
    const [ciudades, setciudades] = useState<Ciudad[]>({} as Ciudad[])
    const [detviatico, setdetviatico] = useState<DetalleViatico>({ fecha: '01/01/2024', fechaRegreso: '01/01/2024', fechaSalida: '01/01/2024' } as DetalleViatico)
    const [realoadData, setrealoadData] = useState(false)

    const modificaModal = async (valorviatico: TablaViaticos) => {
        const url = '/api/viaticos'
        console.log(valorviatico)
        const putData = async () => {
            const config = { headers: { 'Content-Type': 'application/json' } };
            try {
                const data = await axios.put(url, valorviatico, config);
                console.log("Resultado de Modificar Modal",data)
            } catch (error) {
                console.error("Un error del axios",error)
            }
        }
        putData();
        setrealoadData((prev) => !prev)
        setShowModal(false)
        //alert("registro actualizado")
        //console.log("Lo que se va a modificar", valorviatico)
    }

    const muestraModal = async (detaviatico: any) => {
        const getData = async () => {

            try {
                const { data } = await axios.get(`/api/viatico_detalle/${detaviatico.ejercicio.toString()}/${detaviatico.viatico.toString()}/${detaviatico.oficina.toString()}`); // Cambia la URL de la API
                setdetviatico(data.data)
                setShowModal(true)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        getData();


    }

    const cerrarModal = () => {
        const algo: DetalleViatico = {
            comisionDetalle: '',
            comisionTitulo: '',
            depto: '',
            destino: 0,
            destinoNom: '',
            dias: 0,
            estatus: 0,
            fecha: '',
            fechaRegreso: '',
            fechaSalida: '',
            importe: 0,
            noEmp: 0,
            nombre: '',
            noViatico: '0',
            origen: 0,
            origenNom: '',
            puesto: ''
        }
        setdetviatico(algo)
        setShowModal(false)
    }


    useEffect(() => {
        const getCiudades = async () => {
            const { data } = await axios.get(`/api/ciudades`)
            setciudades(data.data)
        }
        getCiudades();

    }, [realoadData])


    return (
        <div>
            <Modalviatico
                isVisible={showModal}
                onClose={() =>
                    //setShowModal(false)
                    cerrarModal()
                }
                detviatico={detviatico}
                ciudades={ciudades}
                modificaModal={modificaModal}
            />
            <Tarjetaempleado params={{ noemp: params.noemp }} />
            <Tablasdeviaticos params={{ noemp: params.noemp, muestraModal: muestraModal, realoadData: realoadData}} />
        </div>
    )
}

export default HandlerViaticos