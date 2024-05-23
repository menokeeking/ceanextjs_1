import { NextResponse, NextRequest } from "next/server";
import axios, { AxiosError } from 'axios';
import { TablaViaticos } from '@/interfaces/TablaViaticos';


interface Segments {
    params: {
        ano: number;
        viat: number;
        ofi: number;
    };
}

export async function GET(request: Request, { params }: Segments) {

    try {
        const { data } = await axios.get(
            `http://200.56.97.5:7281/api-viaticos/Viaticos/DetalleViatico/${params.ano}/${params.viat}/${params.ofi}`
            //`http://localhost:5151/viaticos/${params.ano}/${params.viat}/${params.ofi}`

        ); //DetalleViatico/2024/14/2
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

export async function PUT(request: Request) {

    const data = request.headers
        return NextResponse.json({
            message: data
        }, {
            status: 200
        })


    //const data = request.body; 
    console.log(request.body)
    // try {
    //     const response = await axios.put( `http://200.56.97.5:7281/api-viaticos/Viaticos`, request.body);

    //     console.log(response)
    //     const responseData = response.data;
    //     // Haz algo con responseData...

    //     return NextResponse.json({
    //         message: "La actualización PUT fue exitosa"
    //     }, {
    //         status: 200
    //     })
    //   } catch (error) {
    //     console.error(error);
    //     if (axios.isAxiosError(error)) {
    //         return NextResponse.json({ message: error.message }, {
    //             status: 500
    //         });
    //     }
    //     else{
    //         return NextResponse.json({
    //             data: error,
    //             message: "Error en la solicitud PUT"
    //         }, {
    //             status: 500
    //         })
    //     }
    //   }

}

