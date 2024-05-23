

function  diadehoy(fecha: Date): string {
    // const fecha = new Date();
    // const dia = String(fecha.getDate()).padStart(2, '0');
    // const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0
    // const ano = fecha.getFullYear();
  
    //return `${dia}/${mes}/${ano}`;

    const date = new Date(fecha).toLocaleDateString('es-ES',{ year: 'numeric', month: '2-digit', day: '2-digit'}).split( '/' ).reverse( ).join( '-' );
    const time = new Date(fecha).toLocaleTimeString('es-ES',{ hour: "2-digit", minute: "2-digit", second: "2-digit"});

    //console.log(date +'T'+ time);
    return (date +'T'+ time);
  }

  export default diadehoy;