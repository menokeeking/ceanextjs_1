import axios, { AxiosError } from 'axios';
import {NextResponse} from 'next/server';

interface Segments {
    params: {
        ejercicio: number;
        empleado: number;
    };
}


export async function GET(request: Request, { params }: Segments) {
    try {

        const { data } = await axios.get(
            `http://200.56.97.5:7281/api-viaticos/Viaticos/lista-viaticos-empleado/${params.ejercicio}/${params.empleado}`
        );
        //console.log(data)    
        return NextResponse.json({

            data: data
            
        });
    } catch (error) {
        return NextResponse.json({
            data: error,
        });
    }


}