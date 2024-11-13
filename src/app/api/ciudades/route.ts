import axios, { AxiosError } from 'axios';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const { data } = await axios.get(
          //'http://200.56.97.5:7281/api-viaticos/Ciudades'
          'http://200.56.97.5:7281/api/Viaticos/Ciudades'
        );

      //console.log(data)
        return NextResponse.json({
            
            data: data.data
        });
      } catch (error) {
        return NextResponse.json({
          data: error,
        });
      }
}