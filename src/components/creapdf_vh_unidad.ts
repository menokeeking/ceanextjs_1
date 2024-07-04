import {jsPDF} from "jspdf"
import { TablaVehiculos } from "@/interfaces/TablaVehiculos";



export const creapdf_vh_unidad = ( vehiculo : TablaVehiculos) => {

    let imagePath = `/uploads/v${vehiculo.numero}.jpg`;
    let anyExistingImage = "/uploads/sinimagen.jpg";

    const image1 = new Image();
    image1.src = '/assets/logo2.png';

    const userimg = new Image();
    userimg.src = `/uploads/v${vehiculo.numero}.jpg`;

    // if (fs.existsSync(imagePath)){
    //     userimg.src = `/uploads/v${vehiculo.numero}.jpg`;
    // }else{
    //     userimg.src = "/uploads/sinimagen.jpg";
    // }
   

    //const doc = new jsPDF();
    const doc = new jsPDF('p', 'mm', 'letter');
    // Encabezado
    doc.setFontSize(15);
    doc.setFont("helvetica", "normal");
    doc.text("Comisión Estatal del Agua de Baja California", 130, 10, {align: "center"}  );
    doc.setFontSize(12);
    doc.text("Sistema del Taller Mecánico", 130, 16,{align: "center"} );
    doc.setFontSize(14);
    doc.text("Información Vehicular", 130, 24,{align: "center"} );
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.addImage(image1, "PNG", 10, 7, 60, 14);
    //doc.roundedRect(5, 5, 60, 20, 3, 3, "FD");
    doc.setDrawColor(209, 209, 209);
    doc.line(5, 30, 210, 30); 

    // Cuerpo del REporte
    doc.setFontSize(9);
    //doc.addImage(userimg, "JPEG", 20, 40, 15, 17);
    doc.setDrawColor(20, 20, 20);

    doc.setFillColor(240, 240, 240)
    doc.rect(10, 40, 32, 8, "FD");
    doc.text("NO. ECONOMICO", 12, 45,{align: "left"} );

    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(20, 20, 20);
    doc.rect(42, 40, 13, 8);
    doc.text(`${vehiculo.numero}`, 49, 45,{align: "center"} );

    doc.setFillColor(240, 240, 240)
    doc.rect(60, 40, 34, 8, "FD");
    doc.text("DEPARTAMENTO", 63, 45,{align: "left"} );

    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(20, 20, 20);
    doc.rect(96, 40, 111, 8);
    doc.text(`${vehiculo.depto}`, 99, 45,{align: "left"} );

    //Cuadro de imagen de Imagen
    doc.addImage(userimg, "JPEG", 10, 51, 45, 30)

    doc.setFont("helvetica", "bold");
    doc.text("ODOMETRO: ", 10, 86);
    doc.text(`${vehiculo.odometro}`, 31, 86,{align: "left"} );

    
    //Cuadro para información del vehiculo en tabla bm_activos
    doc.setFont("helvetica", "normal");
    doc.setDrawColor(20, 20, 20);
    doc.setFillColor(255, 255, 255)
    doc.rect(60, 51, 147, 30);
    
    doc.setFontSize(8);

    //Columna Izquierda
    doc.text("Marca: ", 65, 57);
    doc.text(`${vehiculo.marca}`, 83, 57);
    doc.text("Modelo: ", 65, 62);
    doc.text(`${vehiculo.modelo}`, 83, 62);
    doc.text("Serie: ", 65, 67);
    doc.text(`${vehiculo.serie}`, 83, 67);
    doc.text("Resguardo: ", 65, 72);
    doc.text(`${vehiculo.resguardo}`, 83, 72);
    doc.text("Empleado: ", 65, 77);
    doc.text(`${vehiculo.resguardante}`, 83,77);

    //Columna Derecha
    doc.text("Importe: ", 140, 57);
    doc.text(`${vehiculo.importe}`, 160, 57);
    doc.text("F. Adq: ", 140, 62);
    doc.text(`${vehiculo.fechaAdq}`, 160, 62);
    doc.text("No. Seguro: ", 140, 67);
    doc.text(`${vehiculo.noSeguro}`, 160, 67);
    doc.text("Empresa: ", 140, 72);
    doc.text(`${vehiculo.nombreAseg}`, 160, 72);
    doc.text("Vigencia: ", 140, 77);
    doc.text(`${vehiculo.vigencia}`, 160, 77);

    ;

    //doc.setLineWidth(0.1);
   // doc.line(18, 87, 190, 87);

    doc.setFontSize(10);
    doc.text("No. Activo: ", 15, 100);
    doc.text(`${vehiculo.noActivo}`, 45, 100);
    doc.text("Placas: ", 15, 107);
    doc.text(`${vehiculo.placas}`, 45, 107);
    doc.text("Año: ", 15, 114);
    doc.text(`${vehiculo.ano}`, 45, 114);
    doc.text("Combustible: ", 15, 121);
    doc.text(`${vehiculo.tipo}`, 45, 121);
    doc.text("Color: ", 15, 128);
    doc.text(`${vehiculo.color}`, 45, 128);
    doc.text("Capacidad: ", 15, 135);
    doc.text(`${vehiculo.capacidad}`, 45, 135);
    doc.text("Ubicación: ", 15, 142);
    doc.text(`${vehiculo.ubicacion}`, 45, 142);
    doc.text("Pernocta: ", 15, 149);
    doc.text(`${vehiculo.pernoc}`, 45, 149);
    doc.text("Estatus: ", 15, 156);
    doc.text(`${vehiculo.estatus}`, 45, 156);

    doc.text("Descripción: ", 100, 100);
    doc.text("Comentarios: ", 100, 125);

    doc.setFontSize(8);
    doc.text(`${vehiculo.descripcion}`, 100,105,{maxWidth: 100, align: "justify"})
    doc.text(`${vehiculo.comentarios}`, 100,120,{maxWidth: 100, align: "justify"})

    //Cuadro de Mantenimiento
    doc.roundedRect(110, 170, 98, 30,3,3,"D");
    doc.setFillColor(240, 240, 240)
    doc.roundedRect(111, 171, 96, 6,3,3, "F");

    doc.setFillColor(255, 255, 255)
    doc.text("MANTENIMIENTOS", 160, 175,{align: "center"});
    doc.text("ULTIMO SERVICIO", 122, 181);
    doc.text("PROXIMO SERVICIO", 170, 181);
    doc.text(`${vehiculo.fUltServ}`, 118, 187, {align: "center"})
    doc.text(`${vehiculo.fProxServ}`, 162, 187, {align: "center"})

    

    doc.setFontSize(10);
    // Pie de pagina
    doc.setFontSize(6);
    doc.setDrawColor(209, 209, 209);
    doc.line(5, 270, 210, 270);
    doc.text("(creapdf_vh_unidad)", 10, 275);
    doc.text("COORDINACION DE RECURSOS MATERIALES", 105, 275,{align: "center"} );

    //Salvar el documento
    window.open(doc.output('bloburl'), '_blank');
    //window.open(doc.output('bloburl'), '_blank');
    //doc.save(`DetalleEmp_${empleados.idEmpleado}.pdf`);


}
