import {jsPDF} from "jspdf"
import { TablaEmpleados } from "@/interfaces/TablaEmpleados";


export const creapdf_emp = ( empleados : TablaEmpleados) => {

    const image1 = new Image();
    image1.src = '/assets/logo2.png';

    const userimg = new Image();
    userimg.src = `/images/p${empleados.empleado}.jpg`;

    const doc = new jsPDF();
    // Encabezado
    doc.setFontSize(15);
    doc.text("Comisión Estatal del Agua de Baja California", 130, 10, {align: "center"}  );
    doc.setFontSize(12);
    doc.text("Sistemas Informáticos", 130, 16,{align: "center"} );
    doc.setFontSize(14);
    doc.text("Titulo del Reporte", 130, 24,{align: "center"} );
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.addImage(image1, "PNG", 5, 5, 60, 14);
    //doc.roundedRect(5, 5, 60, 20, 3, 3, "FD");
    doc.setDrawColor(209, 209, 209);
    doc.line(0, 30, 210, 30); 

    // Cuerpo del REporte
    doc.setDrawColor(20, 20, 20);
    //doc.roundedRect(5, 40, 200, 10, 3, 3, "FD");
    doc.addImage(userimg, "JPEG", 20, 40, 15, 17);
    doc.text(`Detalle del Empleado: ${empleados.empleado}`, 105, 45,{align: "center"} );
    //doc.text("Detalle del Empleado:", 105, 47,{align: "center"} );
    doc.setFontSize(8);
    doc.text("Nombre: ", 20, 70);
    doc.text(`${empleados.nombre}`, 40, 70);
    doc.text("Paterno: ", 20, 75);
    doc.text(`${empleados.paterno}`, 40, 75);
    doc.text("Materno: ", 20, 80);
    doc.text(`${empleados.materno}`, 40, 80);
    doc.setLineWidth(0.1);
    doc.line(18, 87, 190, 87);
    doc.text("Nivel: ", 20, 97);
    doc.text(`${empleados.nivel}`, 30, 97);
    doc.text("Depto: ", 40, 97);
    doc.text(`${empleados.deptoUe}`, 50, 97);
    doc.text("Obra: ", 65, 97);
    doc.text(`${empleados.lugarTrab}`, 75, 97);
    doc.text("Deptoppto: ", 90, 97);
    doc.text(`${empleados.correo}`, 105, 97);
    doc.text("Deptocomi: ", 120, 97);
    doc.text(`${empleados.deptoComi}`, 135, 97);


    // Pie de pagina
    doc.setFontSize(6);
    doc.setDrawColor(209, 209, 209);
    doc.line(0, 282, 210, 282);
    doc.text("(Nombre del Reporte)", 10, 286);
    doc.text("(Nombre del Area)", 105, 286,{align: "center"} );

    //Salvar el documento
    window.open(doc.output('bloburl'), '_blank');
    //window.open(doc.output('bloburl'), '_blank');
    //doc.save(`DetalleEmp_${empleados.idEmpleado}.pdf`);


}
