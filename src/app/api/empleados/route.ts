import axios, { AxiosError } from 'axios';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const { data } = await axios.get(
          'http://200.56.97.5:7281/api-viaticos/Empleados'
          //'http://localhost:5151/empleados'
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

export async function POST() {
  return NextResponse.json({
    data: "Falta logica de agregar empleado"
});
}

export async function PUT(request: Request) {
  const body = request

  //console.log("Lo que llega del en el API PUT", body)

  return NextResponse.json({
    data: body.text()
});
}

