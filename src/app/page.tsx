import { Metadata } from "next"

export const metadata: Metadata = {
 title: "Pagina Principal",
 description: "Sistema Web en NextJs" 
}

function HomePage() {
  return (
    <div>
      <h1 className="text-xl"> Pagina Web en NEXTJS</h1>
    </div>
  )
}

export default HomePage