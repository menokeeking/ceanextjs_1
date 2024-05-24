
import HandlerViaticos from '@/components/HandlerViaticos';

export async function generateStaticParams() {
    const posts = await fetch('http://200.56.97.5:7281/api-viaticos/Empleados').then((res) => res.json())
   
    return posts.map((post: { noemp: string; }) => ({
      noemp: post.noemp,
    }))
  }

function Page({ params }: { params: { noemp: string} }) {

    
 
    return (
        <div className="">
            {/* {params.noemp} */}
            <HandlerViaticos params={{
                noemp: params.noemp
            }} />
        </div>
    )
}



export default Page

