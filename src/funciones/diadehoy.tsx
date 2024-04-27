

function  diadehoy(): string {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0
    const ano = fecha.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }

  export default diadehoy;