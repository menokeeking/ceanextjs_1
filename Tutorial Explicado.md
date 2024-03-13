1.- Se crea el proyecto con la siguiente instruccion:
    npx create-next-app next-auth-oracle
        TypeScript      YES
        ESLint          YES
        Tailwind CSS    YES
        src/ directory  YES
        App Router      YES
        import alias    NO

2.- Instalar módulos extras
    npm i next-auth mongoose bcryptjs axios (hay que sustituir mongoose por oracledb)

3.- Instalar los tipos de bcryptjs 
    npm i @types/bcryptjs -D (Para que lo instale como dependencia de desarrollo).

4.- Se revisa que esten en listados los modulos instalados anteriormente en el archivo package.json

5.- En la carpeta APP se requiere crear 2 páginas, LOGIN y REGISTER
    - Se crea un componente basico dentro de login y otro similar en register, con el nombre de page.tsx
    - Se aplica la abreviatura rfce+tab para crear el codigo, eliminando el import React from 'react'

6.- Se crea otra carpeta dentro de APP llamada API
    - Dentro de esta carpeta, se crea otra llamada hello 
    - Posteriormente se crea un archivo route.ts que es el codigo que se va a ejecutar cuando se visite 

7.- Se abre la terminar nuevamente para probar el avance
    npm run dev

    - Se elimina todo el codigo de la pagina principal src\app\page.tsx , dejando un solo mensaje
    - Se comprueba el acceso a http://localhost:3000/register y http://localhost:3000/login
    - Por último se comprueba el acceso al API con la direccion http://localhost:3000/api/hello

// CONEXION A LA BASE DE DATOS

8.- Se crea una carpeta dentro de APP, llamada libs donde se creara la conexion a la bd



