import { NextResponse } from "next/server";
import axios, { AxiosError } from 'axios';

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