import axios, { AxiosError } from 'axios';
import vh_estatus from '@/datos/vh_estatus.json'
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        // const { data } = await axios.get(
        //   'http://200.56.97.5:7281/api-viaticos/Empleados'
        // );

      //console.log(data)


        return NextResponse.json({
            
            //data: data
            data: vh_estatus
        });
      } catch (error) {
        return NextResponse.json({
          data: error,
        });
      }
}