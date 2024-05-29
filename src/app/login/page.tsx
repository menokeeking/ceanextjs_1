import Image from 'next/image';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { FormLogin } from './formlogin';
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Página de Inicio',
  description: 'Login Page',
};

export default async function LoginPage() {

  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard/principal')
  }

  return (
    
    <div className=''>
      <section className="bg-gray-100 dark:bg-gray-100"> 
        <div className="flex flex-col items-center px-4 py-8 mx-auto md:h-screen lg:py-16">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> */}
            {/* <Image src={"/assets/logo2.png"} priority={true} alt="logo" width={450} height={100} className='m-4' /> */}
            <Image src={"/assets/logo2.png"} priority={true} alt="logo" width={450} height={100} className='m-4 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900' />
          {/* </a> */}

          <FormLogin titulo={'LOGIN GENERICO'} />

        </div>
      </section>


    </div>

  )
}