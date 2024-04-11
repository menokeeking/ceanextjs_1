import { NextResponse } from "next/server";
import axios, { AxiosError } from 'axios';

interface Segments {
    params: {
        emp: number;
    };
}

export async function GET(request: Request, { params }: Segments) {
    try {

        const { data } = await axios.get(
            `http://200.56.97.5:7281/api-viaticos/Viaticos/lista-viaticos-empleado/2024/${params.emp}`
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