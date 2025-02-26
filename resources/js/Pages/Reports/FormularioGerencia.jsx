import React, { useState } from 'react';
import jsPDF from 'jspdf';

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
    
    // Configuración inicial
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let y = 20;

    // Agregar logo (necesitarás la imagen en base64 o como asset)
    // doc.addImage('/ruta/al/logo-secoc.png', 'PNG', margin, y, 40, 20);
    
    // Título principal
    y += 30;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Control Diario GERENTES DE ZONA', pageWidth/2, y, { align: 'center' });

    // Información del gerente y fecha
    y += 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre del Gerente de Zona: ${formData.nombreGerente}`, margin, y);
    doc.text(formatearFecha(formData.fecha), pageWidth - margin, y, { align: 'right' });

    // Función helper para crear tablas
    const crearTablaSeccion = (titulo, datos, startY) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(titulo, margin, startY);
        
        // Dibujar tabla
        doc.setLineWidth(0.1);
        doc.line(margin, startY + 3, pageWidth - margin, startY + 3);
        
        return startY + 15;
    };

    // 1. Control de Asistencia
    y = crearTablaSeccion('1. Control de Asistencia y Puntualidad', null, y + 10);
    doc.setFont('helvetica', 'normal');
    
    // Crear tabla con líneas
    doc.rect(margin, y, 60, 7); // Celda "TOTAL"
    doc.rect(margin + 60, y, 20, 7); // Celda valor total
    doc.rect(margin + 80, y, 60, 7); // Celda "REAL"
    doc.rect(margin + 140, y, 20, 7); // Celda valor real
    
    doc.text('Total de empleados presentes:', margin + 2, y + 5);
    doc.text(formData.empleadosTotal.toString(), margin + 65, y + 5);
    doc.text(formData.empleadosPresentes.toString(), margin + 145, y + 5);

    // Continuar con el resto de secciones...
    
    // 2. Actividades de Control de Plagas
    y = crearTablaSeccion('2. Actividades de Control de Plagas', null, y + 15);
    
    // ... código similar para cada sección ...

    // Notas Adicionales
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Notas Adicionales:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.notasAdicionales || '', margin, y + 7, {
        maxWidth: pageWidth - (margin * 2)
    });

    // Observaciones
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.text('Observaciones generales del día:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.observaciones || '', margin, y + 7, {
        maxWidth: pageWidth - (margin * 2)
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

        {/* 1. Control de Asistencia y Puntualidad */}
        <div className="mb-6 border-t border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            1. Control de Asistencia y Puntualidad
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Total de empleados presentes:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.empleadosTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="empleadosPresentes"
                value={formData.empleadosPresentes}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Incidencias reportadas:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.incidenciasTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="incidenciasReales"
                value={formData.incidenciasReales}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 2. Actividades de Control de Plagas */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            2. Actividades de Control de Plagas
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Protección en Habitaciones:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.proteccionHabitacionesTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="proteccionHabitacionesAvance"
                value={formData.proteccionHabitacionesAvance}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Avance"
              />
              <div className="text-xs mt-1 text-right text-gray-900 dark:text-gray-100">
                {calcularPorcentaje(formData.proteccionHabitacionesAvance, formData.proteccionHabitacionesTotal)}
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Limpieza de Drenajes y Alcantarillas:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.limpiezaDrenajesTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="limpiezaDrenajesAvance"
                value={formData.limpiezaDrenajesAvance}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-xs mt-1 text-right text-gray-900 dark:text-gray-100">
                {calcularPorcentaje(formData.limpiezaDrenajesAvance, formData.limpiezaDrenajesTotal)}
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Nebulización Contra Mosquitos:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.nebulizacionTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="nebulizacionAvance"
                value={formData.nebulizacionAvance}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-xs mt-1 text-right text-gray-900 dark:text-gray-100">
                {calcularPorcentaje(formData.nebulizacionAvance, formData.nebulizacionTotal)}
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Reabastecimiento de Cerco Sanitario:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.reabastecimientoTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="reabastecimientoAvance"
                value={formData.reabastecimientoAvance}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-xs mt-1 text-right text-gray-900 dark:text-gray-100">
                {calcularPorcentaje(formData.reabastecimientoAvance, formData.reabastecimientoTotal)}
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Inventario y Mantenimiento de Equipos:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.inventarioTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="inventarioAvance"
                value={formData.inventarioAvance}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-xs mt-1 text-right text-gray-900 dark:text-gray-100">
                {calcularPorcentaje(formData.inventarioAvance, formData.inventarioTotal)}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Gestión de Relaciones con Clientes */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            3. Gestión de Relaciones con Clientes
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Recomendaciones y acciones tomadas:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.hotelesTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="hotelesVisitados"
                value={formData.hotelesVisitados}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Feedback general:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.feedbackTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="feedbackRealizado"
                value={formData.feedbackRealizado}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 4. Mantenimiento y Revisiones */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            4. Mantenimiento y Revisiones
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Mantenimiento de Lámparas UV:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.lamparasTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="text"
                name="lamparasRecomend"
                value={formData.lamparasRecomend}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="OK"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Desarrollo y Revisión de Carpeta y Protocolos:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.carpetaTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="carpetaAvance"
                value={formData.carpetaAvance}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 5. Evaluaciones y Capacitación */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            5. Evaluaciones y Capacitación
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Evaluación y Retroalimentación de Agentes:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.evaluacionTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="evaluacionRealizada"
                value={formData.evaluacionRealizada}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Capacitación de Personal:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.capacitacionTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="capacitacionRealizada"
                value={formData.capacitacionRealizada}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 6. Gestión de Incidentes y Emergencias */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            6. Gestión de Incidentes y Emergencias
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Incidentes reportados:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.incidentesTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="incidentesReales"
                value={formData.incidentesReales}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Acciones tomadas:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.accionesTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="accionesReales"
                value={formData.accionesReales}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 7. Proyectos Especiales e Iniciativas */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            7. Proyectos Especiales e Iniciativas
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Iniciativa Propia:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.iniciativaTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="iniciativaReal"
                value={formData.iniciativaReal}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Visitas con Dirección y/o Comité Ejecutivo:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.visitasTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="visitasReales"
                value={formData.visitasReales}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 8. Auditorías y Cumplimiento */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            8. Auditorías y Cumplimiento
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Auditoría de Proveedores y Recursos Externos:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.auditoriaTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="auditoriaReal"
                value={formData.auditoriaReal}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Revisión de Cumplimiento y Normativas:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.cumplimientoTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="cumplimientoReal"
                value={formData.cumplimientoReal}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
                  text-gray-700 dark:text-gray-300 dark:bg-gray-700 
                  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* 9. Protección */}
        <div className="mb-6 border-b dark:border-gray-600 py-4">
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            9. Protección
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                Protección de Cocinas y Salones:
              </label>
            </div>
            <div className="col-span-1">
              <div className="font-medium text-center text-gray-900 dark:text-gray-100">
                {formData.proteccionTotal}
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                name="proteccionReal"
                value={formData.proteccionReal}
                onChange={handleChange}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-1 px-2 
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
            type="submit"
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