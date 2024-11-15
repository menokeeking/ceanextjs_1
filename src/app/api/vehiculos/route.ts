import axios, { AxiosError } from 'axios';
import vehiculos from '@/datos/vehiculos.json';
//import lista_vehiculos from '@/datos/listavehiculos.json';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const { data } = await axios.get(
          'http://200.56.97.5:7281/api/Vehiculos/GetListaVehiculos'
        );

        return NextResponse.json({
            
            data: data.data
        });
      } catch (error) {
        return NextResponse.json({
          data: error,
        });
      }
}