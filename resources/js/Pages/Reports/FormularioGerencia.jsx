import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Necesitarás convertir el logo a base64 o guardarlo en public/
// Este es un placeholder, deberás reemplazarlo con tu logo real
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

const FormularioGerencia = () => {
  const [formData, setFormData] = useState({
    nombreGerente: '',
    fecha: new Date().toISOString().split('T')[0],
    
    // 1. Control de Asistencia
    empleadosTotal: 20,
    empleadosPresentes: '',
    incidenciasTotal: 1,
    incidenciasReales: '',
    
    // 2. Plagas
    proteccionHabitacionesTotal: 5378,
    proteccionHabitacionesAvance: '',
    limpiezaDrenajesTotal: 10,
    limpiezaDrenajesAvance: '',
    nebulizacionTotal: 10,
    nebulizacionAvance: '',
    reabastecimientoTotal: 10,
    reabastecimientoAvance: '',
    inventarioTotal: 10,
    inventarioAvance: '',
    
    // 3. Clientes
    hotelesTotal: 10,
    hotelesVisitados: '',
    feedbackTotal: 10,
    feedbackRealizado: '',
    
    // 4. Mantenimiento
    lamparasTotal: 20,
    lamparasRecomend: '',
    carpetaTotal: 2,
    carpetaAvance: '',
    
    // 5. Evaluaciones
    evaluacionTotal: 3,
    evaluacionRealizada: '',
    capacitacionTotal: 3,
    capacitacionRealizada: '',
    
    // 6. Incidentes
    incidentesTotal: 0,
    incidentesReales: '',
    accionesTotal: 0,
    accionesReales: '',
    
    // 7. Proyectos
    iniciativaTotal: 0,
    iniciativaReal: '',
    visitasTotal: 2,
    visitasReales: '',
    
    // 8. Auditorías
    auditoriaTotal: 0,
    auditoriaReal: '',
    cumplimientoTotal: 2,
    cumplimientoReal: '',
    
    // 9. Protección
    proteccionTotal: 10,
    proteccionReal: '',
    
    // Notas
    notasAdicionales: 'Seguimiento al tema de radio en Royalton Splash',
    observaciones: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calcularPorcentaje = (avance, total) => {
    if (!avance || !total || total === 0) return '0%';
    return `${Math.round((avance / total) * 100)}%`;
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Configuración de página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;
    
    // Tamaños de celdas
    const cellWidth = 25;
    const cellHeight = 6;
    
    // Tamaño de fuente uniforme
    const fontSize = 9;
    
    // Función para verificar si necesitamos una nueva página
    const checkNewPage = (height) => {
        if (y + height > pageHeight - margin) {
            doc.addPage();
            y = margin;
            return true;
        }
        return false;
    };
    
    // Agregar borde al documento completo
    doc.setDrawColor(0);
    doc.setLineWidth(0.3); // Línea más delgada
    doc.rect(margin, margin, pageWidth - 2*margin, pageHeight - 2*margin);
    
    // Título principal
    y += 15;
    doc.setFontSize(14); // Reducido de 16
    doc.setFont('helvetica', 'normal'); // Cambiado de bold a normal
    doc.text('Control Diario GERENTES DE ZONA', pageWidth/2, y, { align: 'center' });
    
    // Información del gerente y fecha
    y += 15;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre del Gerente de Zona', margin + 5, y);
    doc.text(formData.nombreGerente || 'BRIAN FLORES', pageWidth/2, y);
    
    // Fecha
    doc.text('Fecha', pageWidth - margin - 40, y);
    doc.text(formatearFecha(formData.fecha), pageWidth - margin - 20, y);
    
    // 1. Control de Asistencia
    y += 20;
    doc.setFontSize(fontSize + 1); // Ligeramente más grande para los títulos de sección
    doc.text('1. Control de Asistencia y Puntualidad', margin + 5, y);
    
    // Tabla de asistencia
    y += 10;
    doc.setFontSize(fontSize);
    
    // Encabezados
    const headerX1 = pageWidth - margin - (cellWidth * 2) - 5;
    const headerX2 = pageWidth - margin - cellWidth - 5;
    
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('TOTAL', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('REAL', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Fila 1: Total de empleados
    y += cellHeight + 1;
    doc.text('Total de empleados presentes:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.empleadosTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.empleadosPresentes || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Fila 2: Incidencias
    y += cellHeight + 1;
    doc.text('Incidencias reportadas:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.incidenciasTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.incidenciasReales || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 2. Actividades de Control de Plagas
    y += 15;
    doc.setFontSize(fontSize + 1);
    doc.text('2. Actividades de Control de Plagas', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('TOTAL', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('AVANCE', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas para cada actividad
    y += cellHeight + 1;
    doc.text('Protección en Habitaciones:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.proteccionHabitacionesTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.proteccionHabitacionesAvance || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Limpieza de Drenajes y Alcantarillas:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.limpiezaDrenajesTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.limpiezaDrenajesAvance || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Nebulización Contra Mosquitos:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.nebulizacionTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.nebulizacionAvance || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Reabastecimiento de Cerco Sanitario:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.reabastecimientoTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.reabastecimientoAvance || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Inventario y Mantenimiento de Equipos:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.inventarioTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.inventarioAvance || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 3. Gestión de Relaciones con Clientes
    y += 15;
    checkNewPage(50); // Verificar si necesitamos nueva página
    
    doc.setFontSize(fontSize + 1);
    doc.text('3. Gestión de Relaciones con Clientes', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('No HOTELES', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('VISITADOS', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas
    y += cellHeight + 1;
    doc.text('Recomendaciones y acciones tomadas:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.hotelesTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.hotelesVisitados || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Feedback general:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.feedbackTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.feedbackRealizado || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 4. Mantenimiento y Revisiones
    y += 15;
    checkNewPage(50);
    
    doc.setFontSize(fontSize + 1);
    doc.text('4. Mantenimiento y Revisiones', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('No LAMPARAS', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('RECOMEND', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas
    y += cellHeight + 1;
    doc.text('Mantenimiento de Lámparas UV (estado):', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.lamparasTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.lamparasRecomend || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Desarrollo y Revisión de Carpeta: ', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.carpetaTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.carpetaAvance || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 5. Evaluaciones y Capacitación
    y += 15;
    checkNewPage(50);
    
    doc.setFontSize(fontSize + 1);
    doc.text('5. Evaluaciones y Capacitación', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('TOTAL', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('CAPACITAC', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas
    y += cellHeight + 1;
    doc.text('Evaluación y Retroalimentación de Agentes:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.evaluacionTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.evaluacionRealizada || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Capacitación de Personal:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.capacitacionTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.capacitacionRealizada || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 6. Gestión de Incidentes y Emergencias
    y += 15;
    checkNewPage(50);
    
    doc.setFontSize(fontSize + 1);
    doc.text('6. Gestión de Incidentes y Emergencias', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('HALLAZGOS', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('SOLUCION', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas
    y += cellHeight + 1;
    doc.text('Incidentes reportados:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.incidentesTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.incidentesReales || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Acciones tomadas:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.accionesTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.accionesReales || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 7. Proyectos Especiales e Iniciativas
    y += 15;
    checkNewPage(50);
    
    doc.setFontSize(fontSize + 1);
    doc.text('7. Proyectos Especiales e Iniciativas', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('GTE ZONA', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('INICIATIVA', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas
    y += cellHeight + 1;
    doc.text('Iniciativa Propia:', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.iniciativaTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.iniciativaReal || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Visitas con Dirección: ', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.visitasTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.visitasReales || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 8. Auditorías y Cumplimiento
    y += 15;
    checkNewPage(50);
    
    doc.setFontSize(fontSize + 1);
    doc.text('8. Auditorías y Cumplimiento', margin + 5, y);
    
    // Encabezados
    y += 10;
    doc.setFontSize(fontSize);
    doc.setFillColor(240, 240, 240);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight, 'F');
    doc.rect(headerX2, y - 5, cellWidth, cellHeight, 'F');
    doc.text('AUDITORIA', headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text('RESULTADO', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Filas
    y += cellHeight + 1;
    doc.text('Auditoría de Proveedores: ', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.auditoriaTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.auditoriaReal || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    y += cellHeight + 1;
    doc.text('Revisión de Cumplimiento y Normativas: ', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.cumplimientoTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.cumplimientoReal || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // 9. Protección
    y += 15;
    checkNewPage(50);
    
    doc.setFontSize(fontSize + 1);
    doc.text('9. Protección AREAS CLAVES', margin + 5, y);
    
    // Filas
    y += 10;
    doc.setFontSize(fontSize);
    doc.text('Protección de Cocinas y Salones: ', margin + 5, y);
    doc.rect(headerX1, y - 5, cellWidth, cellHeight);
    doc.rect(headerX2, y - 5, cellWidth, cellHeight);
    doc.text(formData.proteccionTotal.toString(), headerX1 + cellWidth/2, y, { align: 'center' });
    doc.text(formData.proteccionReal || '', headerX2 + cellWidth/2, y, { align: 'center' });
    
    // Notas Adicionales
    y += 15;
    checkNewPage(40);
    
    doc.setFontSize(fontSize + 1);
    doc.text('Notas Adicionales:', margin + 5, y);
    y += 7;
    doc.setFontSize(fontSize);
    doc.text(formData.notasAdicionales || '', margin + 5, y, {
        maxWidth: pageWidth - (margin * 2) - 10
    });
    
    // Observaciones
    y += 15;
    checkNewPage(40);
    
    doc.setFontSize(fontSize + 1);
    doc.text('Observaciones generales del día: ', margin + 5, y);
    y += 7;
    doc.setFontSize(fontSize);
    doc.text(formData.observaciones || '', margin + 5, y, {
        maxWidth: pageWidth - (margin * 2) - 10
    });
    
    // Guardar PDF
    doc.save(`Control_Diario_${formatearFecha(formData.fecha)}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generarPDF();
    alert('Reporte generado correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Nombre del Gerente de Zona
            </label>
            <input
              type="text"
              name="nombreGerente"
              value={formData.nombreGerente}
              onChange={handleChange}
              className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
              placeholder="EDHER ADRIAN SANTOS PEREZ"
            />
          </div>
          <div className="ml-4 flex-none">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* 1. Control de Asistencia */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            1. Control de Asistencia y Puntualidad
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Total de empleados presentes:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.empleadosTotal}</span>
                <input
                  type="number"
                  name="empleadosPresentes"
                  value={formData.empleadosPresentes}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Incidencias reportadas:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.incidenciasTotal}</span>
                <input
                  type="number"
                  name="incidenciasReales"
                  value={formData.incidenciasReales}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Actividades de Control de Plagas */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            2. Actividades de Control de Plagas
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Protección en Habitaciones:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.proteccionHabitacionesTotal}</span>
                <input
                  type="number"
                  name="proteccionHabitacionesAvance"
                  value={formData.proteccionHabitacionesAvance}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {calcularPorcentaje(formData.proteccionHabitacionesAvance, formData.proteccionHabitacionesTotal)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Limpieza de Drenajes y Alcantarillas:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.limpiezaDrenajesTotal}</span>
                <input
                  type="number"
                  name="limpiezaDrenajesAvance"
                  value={formData.limpiezaDrenajesAvance}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {calcularPorcentaje(formData.limpiezaDrenajesAvance, formData.limpiezaDrenajesTotal)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Nebulización Contra Mosquitos:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.nebulizacionTotal}</span>
                <input
                  type="number"
                  name="nebulizacionAvance"
                  value={formData.nebulizacionAvance}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {calcularPorcentaje(formData.nebulizacionAvance, formData.nebulizacionTotal)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Reabastecimiento de Cerco Sanitario:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.reabastecimientoTotal}</span>
                <input
                  type="number"
                  name="reabastecimientoAvance"
                  value={formData.reabastecimientoAvance}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {calcularPorcentaje(formData.reabastecimientoAvance, formData.reabastecimientoTotal)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Inventario y Mantenimiento de Equipos:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.inventarioTotal}</span>
                <input
                  type="number"
                  name="inventarioAvance"
                  value={formData.inventarioAvance}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {calcularPorcentaje(formData.inventarioAvance, formData.inventarioTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Gestión de Relaciones con Clientes */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            3. Gestión de Relaciones con Clientes
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Recomendaciones y acciones tomadas:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.hotelesTotal}</span>
                <input
                  type="number"
                  name="hotelesVisitados"
                  value={formData.hotelesVisitados}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Feedback general:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.feedbackTotal}</span>
                <input
                  type="number"
                  name="feedbackRealizado"
                  value={formData.feedbackRealizado}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Mantenimiento y Revisiones */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            4. Mantenimiento y Revisiones
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Mantenimiento de Lámparas UV:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.lamparasTotal}</span>
                <input
                  type="text"
                  name="lamparasRecomend"
                  value={formData.lamparasRecomend}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="OK"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Desarrollo y Revisión de Carpeta:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.carpetaTotal}</span>
                <input
                  type="number"
                  name="carpetaAvance"
                  value={formData.carpetaAvance}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Evaluaciones y Capacitación */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            5. Evaluaciones y Capacitación
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Evaluación y Retroalimentación:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.evaluacionTotal}</span>
                <input
                  type="number"
                  name="evaluacionRealizada"
                  value={formData.evaluacionRealizada}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Capacitación de Personal:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.capacitacionTotal}</span>
                <input
                  type="number"
                  name="capacitacionRealizada"
                  value={formData.capacitacionRealizada}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6. Gestión de Incidentes y Emergencias */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            6. Gestión de Incidentes y Emergencias
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Incidentes reportados:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.incidentesTotal}</span>
                <input
                  type="number"
                  name="incidentesReales"
                  value={formData.incidentesReales}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Acciones tomadas:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.accionesTotal}</span>
                <input
                  type="number"
                  name="accionesReales"
                  value={formData.accionesReales}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Proyectos Especiales e Iniciativas */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            7. Proyectos Especiales e Iniciativas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Iniciativa Propia:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.iniciativaTotal}</span>
                <input
                  type="number"
                  name="iniciativaReal"
                  value={formData.iniciativaReal}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Visitas con Dirección:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.visitasTotal}</span>
                <input
                  type="number"
                  name="visitasReales"
                  value={formData.visitasReales}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 8. Auditorías y Cumplimiento */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            8. Auditorías y Cumplimiento
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Auditoría de Proveedores:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.auditoriaTotal}</span>
                <input
                  type="number"
                  name="auditoriaReal"
                  value={formData.auditoriaReal}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Revisión de Cumplimiento y Normativas:
              </label>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.cumplimientoTotal}</span>
                <input
                  type="number"
                  name="cumplimientoReal"
                  value={formData.cumplimientoReal}
                  onChange={handleChange}
                  className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                    text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 9. Protección */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            9. Protección
          </h2>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Protección de Cocinas y Salones:
            </label>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700 dark:text-gray-300">{formData.proteccionTotal}</span>
              <input
                type="number"
                name="proteccionReal"
                value={formData.proteccionReal}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* Notas Adicionales */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            Notas Adicionales
          </h2>
          <textarea
            name="notasAdicionales"
            value={formData.notasAdicionales}
            onChange={handleChange}
            className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
              text-gray-700 dark:text-gray-300 dark:bg-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
          ></textarea>
        </div>

        {/* Observaciones */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            Observaciones generales del día
          </h2>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 
              text-gray-700 dark:text-gray-300 dark:bg-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-600 pt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Control Diario GERENTES DE ZONA
            </p>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              {formData.nombreGerente || 'EDHER ADRIAN SANTOS PEREZ'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Fecha: {formatearFecha(formData.fecha)}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={generarPDF}
            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 
              text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Descargar Reporte PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioGerencia;