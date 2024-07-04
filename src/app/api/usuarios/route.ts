import axios, { AxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(request: Request) {

    const body  = await request.json()
    
    // console.log("Descripcion de body: "+ body.usuario)
    // console.log("Descripcion de body: "+ body.texto1)
    // return NextResponse.json({ message: "Hola" })
    try {
          const response = await axios.put( `http://200.56.97.5:7281/api-viaticos/Auth/cambiopass?user=${body.usuario}&newPassword=${body.texto1}`);
          //console.log("lO QUE REGresa el response " +response)
          const responseData = response.data;
          //console.log(response.data)
  
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
  