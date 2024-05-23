import axios, { AxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    const { data } = await axios.get(
      'http://200.56.97.5:7281/api-viaticos/Viaticos/lista-viaticos-empleado/2023/7012'
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

export async function PUT(request: Request) {

  const body = await request.json()

  //console.log("Descripcion de body: "+body)

  try {
        const response = await axios.put( `http://200.56.97.5:7281/api-viaticos/Viaticos`, body);
        //console.log("lO QUE REGresa el response " +response)
        const responseData = response.data;
        console.log(response.data)

        return NextResponse.json({
            message: "La actualización PUT fue exitosa"
        }, {
            status: 201
        })
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ message: error.message }, {
                status: 500
            });
        }
        else{
            return NextResponse.json({
                data: error,
                message: "Error en la solicitud PUT"
            }, {
                status: 500
            })
        }
      }


}
