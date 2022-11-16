/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { motion } from 'framer-motion';

import { useNavigate, useParams } from 'react-router-dom';

import {
  listaEstudianteDetails,
  updateEstudiante
} from '../../actions/estudianteActions';
import { ESTUDIANTE_UPDATE_RESET } from '../../constants/estudianteConstants';

import Tag from '../../components/Tag';
import Message from '../../components/Message';

import Loader from '../../assets/svg/loader';
import User from '../../assets/svg/user';
import Book from '../../assets/svg/book';
import Badge from '../../assets/svg/badge';
import Warning from '../../assets/svg/warning';
import Check from '../../assets/svg/check';

function ClassroomRegisterPage() {
  const [formData, setFormData] = useState(false);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [materias, setMaterias] = useState();
  const [cedula, setCedula] = useState('');

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const estudianteDetails = useSelector((state) => state.estudianteDetails);
  const { error, loading, estudiante } = estudianteDetails;

  const estudianteUpdate = useSelector((state) => state.estudianteUpdate);

  const {
    // error: errorUpdate,
    // loading: loadingUpdate,
    success: successUpdate
  } = estudianteUpdate;

  const submitHandler = (e) => {
    // console.log('submitHandler');
    e.preventDefault();
    setFormData(true);
    dispatch(
      updateEstudiante({
        _id: params.id,
        nombre,
        apellido,
        materias
      })
    );
    setTimeout(() => {
      setFormData(false);
    }, 1000);
  };

  const handleClose = () => {
    setShow(false);
    console.log('handleClose');
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ESTUDIANTE_UPDATE_RESET });
      setShow(true);
      console.log('successUpdate');
    } else if (!estudiante.nombre || estudiante._id !== Number(params.id)) {
      dispatch(listaEstudianteDetails(params.id));
    } else {
      setNombre(estudiante.nombre);
      setApellido(estudiante.apellido);
      setMaterias(estudiante.materias);
      setCedula(estudiante.cedula);
    }
  }, [dispatch, estudiante, params, successUpdate, navigate]);

  console.log(estudiante);

  return (
    <>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Message
            onClick={handleClose}
            message="Estudiante actualizado"
            description="Se ha actualizado correctamente el estudiante"
            className="text-green-500"
            icon={<Check className="fill-green-500" />}
          />
        </motion.div>
      )}
      {loading ? (
        <div className="grid place-items-center h-96">
          <Loader width="200px" height="200px" className="fill-black " />
        </div>
      ) : error ? (
        <div className="grid place-items-center h-auto my-8 lg:my-44">
          <h1>{error}</h1>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center h-full">
            <div className="bg-zinc-900 rounded-lg w-[700px] h-[700px] p-6 shadow-lg shadow-zinc-900">
              <h1 className="text-5xl pt-12 pb-8 font-black text-center text-white leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-100">
                Editar Estudiante
              </h1>
              <div className="flex justify-center relative items-center">
                <Tag estudiante={estudiante} _id={params.id} />
              </div>
              <form onSubmit={submitHandler}>
                <div className="h-[400px] flex justify-center flex-col gap-4 items-center w-[650px]">
                  <span className="w-[400px] relative">
                    <input
                      type="text"
                      disabled
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombres del Estudiante"
                      className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 disabled:text-zinc-400"
                    />
                    <span>
                      <User className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                    </span>
                  </span>
                  <span className="w-[400px] relative">
                    <input
                      type="text"
                      disabled
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Apellidos del Estudiante"
                      className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 disabled:text-zinc-400"
                    />
                    <span>
                      <User className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                    </span>
                  </span>
                  <span className="w-[400px] relative">
                    <input
                      type="text"
                      disabled
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      placeholder="Apellidos del Estudiante"
                      className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 disabled:text-zinc-400"
                    />
                    <span>
                      <Badge className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                    </span>
                  </span>
                  <span className="w-[400px] relative">
                    <select
                      value={materias}
                      onChange={(e) => setMaterias(e.target.value)}
                      className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 text-white"
                    >
                      <option disabled value="0">
                        Seleccione una materia
                      </option>
                      <option value="Creditos Libres II">
                        Creditos Libres II
                      </option>
                    </select>
                    <span>
                      <Book className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                    </span>
                  </span>
                  <span className="w-[400px] relative">
                    <button
                      type="submit"
                      className="bg-yellow-400 w-full rounded-lg"
                    >
                      {!formData && (
                        <h1 className="text-black text-md font-bold py-4">
                          Actualizar Datos
                        </h1>
                      )}
                      {formData && <Loader className="fill-black" />}
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ClassroomRegisterPage;
