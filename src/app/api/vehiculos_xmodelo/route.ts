import axios, { AxiosError } from 'axios';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const { data } = await axios.get('http://172.31.74.11:5151/vehiculos_xunidad');

        return NextResponse.json({     
            data: data
        });
      } catch (error) {
        return NextResponse.json({
          data: error,
        });
      }
}