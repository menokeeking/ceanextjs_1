import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: Request) {

    try {
        const data = await request.formData()
        const file = data.get('file') as File

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), 'public/uploads', file.name)
        
        writeFile(filePath, buffer)

        //console.log("file uploaded to", filePath)

        return new Response(JSON.stringify({
            message: 'Uploaded File'
        }))
    } catch (error) {
        return NextResponse.json(
            JSON.stringify({
                message: "No hay archivo",
            }), {
            status: 400,
        }
        );

    }
}