
// import { Ciudad } from '@/interfaces/Ciudades';
// import { DetalleViatico } from '@/interfaces/DetalleViatico';
// import { TablaViaticos } from '@/interfaces/TablaViaticos';
// import axios from 'axios';
// import { useEffect, useState } from 'react'
// import Modalviatico from './Modalviatico';
// import Tablasdeviaticos from './Tablasdeviaticos';
// import Tarjetaempleado from './Tarjetaempleado';

function HandlerViaticos({ params }: { params: { noemp: string} }) {

    // const [showModal, setShowModal] = useState(false);
    // const [ciudades, setciudades] = useState<Ciudad[]>({} as Ciudad[])
    // const [detviatico, setdetviatico] = useState<DetalleViatico>({ fecha: '01/01/2024', fechaRegreso: '01/01/2024', fechaSalida: '01/01/2024' } as DetalleViatico)
    // const [realoadData, setrealoadData] = useState(false)

    // const modificaModal = async (valorviatico: TablaViaticos) => {
    //     const url = '/api/viaticos'
    //     const putData = async () => {
    //         const config = { headers: { 'Content-Type': 'application/json' } };
    //         try {
    //             const data = await axios.put(url, valorviatico, config);
    //             console.log(data)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     putData();
    //     setrealoadData((prev) => !prev)
    //     setShowModal(false)
    // }

    // const muestraModal = async (detaviatico: DetalleViatico) => {
    //     setShowModal(true)
    //     setdetviatico(detaviatico)
    //     //console.log(detaviatico)

    // }

    // useEffect(() => {
    //     const getCiudades = async () => {
    //         const { data } = await axios.get(`/api/ciudades`)
    //         setciudades(data.data)
    //     }
    //     getCiudades();

    // }, [realoadData])

    return (
        <div>
            <p>Hola mundo, Empleado: {params.noemp}</p>
            {/* <Modalviatico
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                detviatico={detviatico}
                ciudades={ciudades}
                modificaModal={modificaModal}
            /> */}
            {/* <Tarjetaempleado params={{ noemp: params.noemp }} /> */}
            {/* <Tablasdeviaticos params={{ noemp: params.noemp, muestraModal:muestraModal }} /> */}
        </div>
    )
}

export default HandlerViaticos