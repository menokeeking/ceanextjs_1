import {NextResponse} from 'next/server'

export async function POST(request: Request){

    const {username, password} = await request.json()
    //console.log(username, password)


    
    if (!password || password.length < 6) return NextResponse.json({
        message: "El password debe de contar con al menos 6 caracteres"
    }, {
        status: 400
    })
         return NextResponse.json({message: "signup"})
    
    

}