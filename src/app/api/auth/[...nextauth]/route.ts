import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosError } from 'axios';


//const handler = NextAuth({

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Usuario", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                //console.log(credentials)
                try {

                    const { data } = await axios.post('http://200.56.97.5:7281/api-viaticos/Auth/login?user=' + credentials?.email + '&password=' + credentials?.password);
                    if (data) {
                        //console.log(data.userData.deptoDescripcion)
                        return {
                            id: data.userData.noEmpleado,
                            token: data.token,
                            name: data.user,
                            depto: data.userData.deptoDescripcion,
                            fullname: data.userData.nombreCompleto,
                        }
                    }

                } catch (error) {
                    if (error instanceof AxiosError) {
                        if (!error.response?.data.ok) throw new Error("El usuario y/o contraseña no son válidos")
                    }

                }
                return null;

            },
        })
    ],
    pages: {
        signIn: "/login",
    },

    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user;
            return token;
        },
        session({ session, token }) {
            session.user = token.user as any;
            //session.user.depto = token.
            return session
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }