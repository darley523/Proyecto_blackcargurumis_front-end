import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Genera y descarga una boleta en PDF con los detalles de la compra
 * @param {Object} datosCompra - Información de la compra
 * @param {Array} datosCompra.items - Productos comprados
 * @param {number} datosCompra.subtotal - Subtotal sin envío
 * @param {number} datosCompra.costoEnvio - Costo de envío
 * @param {number} datosCompra.total - Total final
 * @param {Object} datosCompra.usuario - Datos del usuario
 * @param {string} datosCompra.numeroPedido - Número de pedido (opcional)
 */
export const generarBoletaPDF = (datosCompra) => {
    try {
        const doc = new jsPDF();
    
    // Configuración de la fecha actual
    const fecha = new Date().toLocaleString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Encabezado
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Blackcatgurumis', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('Boleta de Compra', 105, 30, { align: 'center' });
    
    // Información de la boleta
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${fecha}`, 20, 45);
    
    if (datosCompra.numeroPedido) {
        doc.text(`N° Pedido: ${datosCompra.numeroPedido}`, 20, 52);
    }
    
    if (datosCompra.usuario) {
        // Obtener el nombre del usuario (o email si no hay nombre en el JWT)
        const nombreCliente = datosCompra.usuario.nombre 
            || datosCompra.usuario.name 
            || datosCompra.usuario.sub // email del JWT
            || datosCompra.usuario.email 
            || 'Cliente';
        doc.text(`Cliente: ${nombreCliente}`, 20, 59);
    }

    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, 190, 65);

    // Tabla de productos
    const productosData = datosCompra.items.map(item => [
        item.nombre,
        item.quantity.toString(),
        `$${item.precio.toLocaleString('es-CL')}`,
        `$${(item.precio * item.quantity).toLocaleString('es-CL')}`
    ]);

    // Usar autoTable como función importada
    autoTable(doc, {
        startY: 70,
        head: [['Producto', 'Cant.', 'Precio Unit.', 'Subtotal']],
        body: productosData,
        theme: 'striped',
        headStyles: {
            fillColor: [51, 51, 51],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 9,
            cellPadding: 3
        },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { halign: 'center', cellWidth: 20 },
            2: { halign: 'right', cellWidth: 40 },
            3: { halign: 'right', cellWidth: 40 }
        },
        margin: { left: 20, right: 20 }
    });

    // Resumen de totales - obtener posición Y final de la tabla
    let finalY = 150; // valor por defecto
    if (doc.lastAutoTable && doc.lastAutoTable.finalY) {
        finalY = doc.lastAutoTable.finalY + 10;
    } else if (doc.previousAutoTable && doc.previousAutoTable.finalY) {
        finalY = doc.previousAutoTable.finalY + 10;
    }
    
    doc.setFontSize(11);
    doc.text('Subtotal:', 130, finalY);
    doc.text(`$${datosCompra.subtotal.toLocaleString('es-CL')}`, 190, finalY, { align: 'right' });
    
    doc.text('Envío:', 130, finalY + 7);
    doc.text(`$${datosCompra.costoEnvio.toLocaleString('es-CL')}`, 190, finalY + 7, { align: 'right' });
    
    // Línea antes del total
    doc.setLineWidth(0.5);
    doc.line(130, finalY + 10, 190, finalY + 10);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('TOTAL:', 130, finalY + 17);
    doc.text(`$${datosCompra.total.toLocaleString('es-CL')}`, 190, finalY + 17, { align: 'right' });

    // Pie de página
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text('¡Gracias por tu compra!', 105, finalY + 35, { align: 'center' });
    doc.text('Síguenos en Instagram: @blackcatgurumis', 105, finalY + 40, { align: 'center' });
    
    // Generar nombre del archivo con timestamp
    const timestamp = new Date().getTime();
    const nombreArchivo = `Boleta_Blackcatgurumis_${timestamp}.pdf`;
    
    // Descargar el PDF
    doc.save(nombreArchivo);
    
    } catch (error) {
        console.error('Error al generar PDF:', error);
        throw error;
    }
};
