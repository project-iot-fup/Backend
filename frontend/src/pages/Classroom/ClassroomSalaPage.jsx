/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { salaDetails } from '../../actions/asistenciaAction';

function ClassroomSalaPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const salaDetail = useSelector((state) => state.salaDetail);
  const { asistencia } = salaDetail;

  const [salas, setSalas] = useState(salaDetail.asistencia);

  console.log(asistencia);
  useEffect(() => {
    dispatch(salaDetails(id));
  }, [dispatch, id]);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day} de ${month} ${year}`;
  };

  console.log(salas);
  return (
    // <h1>{salas._id}</h1>
    <div className="flex justify-center items-center h-full">
      <div className="bg-zinc-900 rounded-lg w-[700px] h-[800px] p-6 shadow-lg shadow-zinc-900">
        <div className="grid grid-cols-2 items-start">
          <span className="col-span-1 flex flex-col gap-4">
            <h1 className="text-xl text-bold font-bold text-white">
              {/* Jornada: Nocturna 🌒 */}
              {asistencia.materia.jornada === 'Nocturna' ? (
                <span className="text-xl">Jornada: Nocturna 🌒</span>
              ) : (
                <span className="text-xl">Jornada: Diurna 🌞</span>
              )}
            </h1>
            <h1 className="text-xl text-bold font-bold text-white">
              Docente: {asistencia.materia.profesor}
            </h1>
            <h1 className="text-xl text-bold font-bold text-white">
              Materia: {asistencia.materia.nombre}
            </h1>
          </span>
          <span className="col-span-1">
            <h1 className="text-xl text-bold font-bold text-white">
              <span className="text-yellow-400">📅 Fecha:</span>{' '}
              {formatDate(asistencia.fecha_inicio)}
            </h1>
            <h1 className="text-xl text-bold font-bold text-white">
              <span className="text-yellow-400">⏰ Hora:</span> 6:00 pm - 8:00
              pm
            </h1>
            <h1 className="text-xl text-bold font-bold text-white">
              <span className="text-yellow-400">🏫 Sede: </span>
              {asistencia.sede}
            </h1>
            <h1 className="text-xl text-bold font-bold text-white">
              <span className="text-yellow-400">🚪 Sala: </span>
              {asistencia.numero}
            </h1>
          </span>
        </div>
        <div className="overflow-y-auto relative mt-8 p-4 rounded-md h-[550px] border-[3px] border-zinc-600">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="text-zinc-500">N° Identificación</th>
                <th className="text-zinc-500">Nombre</th>
                <th className="text-zinc-500">Hora de ingreso</th>
                <th className="text-zinc-500">Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="text-white">
                <td>1234567890</td>
                <td>Erazo Medina Manuel Esteban</td>
                <td>6:00:00</td>
                <td className="text-green-500">Si Asistio</td>
              </tr> */}
              {/* {asistencia.asistencia.map((estudiante) => (
                <tr className="text-white">
                  <td>{estudiante.estudiante.cedula}</td>
                  <td>{estudiante.estudiante.nombre}</td>
                  <td>{estudiante.hora_ingreso}</td>
                  <td className="text-green-500">Si Asistio</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClassroomSalaPage;
