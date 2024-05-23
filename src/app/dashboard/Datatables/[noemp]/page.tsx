
import HandlerViaticos from '@/components/HandlerViaticos';
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