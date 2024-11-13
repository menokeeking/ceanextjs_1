import axios, { AxiosError } from 'axios';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const { data } = await axios.get(
          //'http://200.56.97.5:7281/api/Empleados/GetEmpleados'
          //'http://200.56.97.5:7281/api-viaticos/Empleados'
          'http://localhost:5151/empleados_totales'
        );

      //console.log("desde el api", data)
        return NextResponse.json({
            
            data: data
        });
      } catch (error) {
        return NextResponse.json({
          data: error,
        });
      }
}





