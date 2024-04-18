
function calcularDiferenciaFechas(fecha1 :Date, fecha2: Date): number {

    const diffEnTiempo: number = fecha1.getTime() - fecha2.getTime();
    const diffEnDias: number = (diffEnTiempo / (1000 * 3600 * 24));
    return diffEnDias + 1;
}

export default calcularDiferenciaFechas;