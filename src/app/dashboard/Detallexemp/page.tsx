"use client"
import { useSearchParams} from 'next/navigation';
import HandlerViaticos from '@/components/HandlerViaticos';

function Detallexemp() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

  return (
    <div className='-z-10'>
        <HandlerViaticos params={{
                noemp: id!
            }} />
    </div>
  )
}

export default Detallexemp