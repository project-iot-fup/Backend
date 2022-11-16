/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getUserDetails } from '../../actions/userActions';

import {
  listaEstudianteDetails,
  createEstudiante,
  updateEstudiante
} from '../../actions/estudianteActions';

import { listallaveroDetails } from '../../actions/llaveroActions';

import Tag from '../../components/Tag';

import Loader from '../../assets/svg/loader';
import Message from '../../components/Message';
import Check from '../../assets/svg/check';

function ClassroomProfilePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(false);

  const llaveroDetails = useSelector((state) => state.llaveroDetails);
  const { llavero } = llaveroDetails;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [materias, setMaterias] = useState();
  const [cedula, setCedula] = useState('');
  const [estudianteId, setEstudianteId] = useState('');
  const [userId, setUserId] = useState('');

  const [photo, setPhoto] = useState('');

  const estudianteCreate = useSelector((state) => state.estudianteCreate);

  const {
    error: errorCreate,
    loading: loadingUpdate,
    success: successCreate,
    estudiante: createdEstudiante
  } = estudianteCreate;

  const [image, setImage] = useState(
    'https://tse4.mm.bing.net/th?id=OIP.w7yUEoBa_ufv1o3iEYAVhQAAAA&pid=Api'
  );

  const [show, setShow] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  // console.log(user);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const estudianteDetails = useSelector((state) => state.estudianteDetails);
  const { estudiante } = estudianteDetails;

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
        _id: userInfo.id,
        nombre,
        photo,
        apellido,
        cedula,
        materias
      })
    );
    setTimeout(() => {
      setShow(true);
      setFormData(false);
    }, 1000);
  };

  const createHandler = (e) => {
    e.preventDefault();
    setFormData(true);
    console.log('createHandler');
    dispatch(
      createEstudiante({
        user: userInfo.id,
        photo,
        nombre,
        apellido,
        cedula,
        materias
      })
    );
    setTimeout(() => {
      // setShow(true);
      setFormData(false);
    }, 1000);
  };

  const handleReset = () => {
    dispatch(listaEstudianteDetails(userInfo.id));
    setFormData(false);
  };

  const handleClose = () => {
    setShow(false);
    console.log('handleClose');
  };

  useEffect(() => {
    if (estudiante) {
      if (!userInfo) {
        navigate('/auth/login');
      } else if (successUpdate) {
        // dispatch({ type: 'ESTUDIANTE_UPDATE_RESET' });
        // navigate('/classroom');
        // setShow(true);
        dispatch(listaEstudianteDetails(userInfo.id));
      } else if (!estudiante.nombre) {
        dispatch(getUserDetails('profile'));
        dispatch(listaEstudianteDetails(userInfo.id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setNombre(estudiante.nombre);
        setPhoto(estudiante.photo);
        setApellido(estudiante.apellido);
        setMaterias(estudiante.materias);
        setCedula(estudiante.cedula);
        setEstudianteId(estudiante._id);
        setUserId(estudiante.user);
        dispatch(listallaveroDetails(estudiante._id));
        setShow(false);
      }
    } else {
      // dispatch({ type: ESTUDIANTE_CREATE_RESET });
      setName(user.name);
      setEmail(user.email);
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    estudiante,
    successUpdate,
    successCreate,
    user
  ]);

  return (
    <>
      <Helmet>
        <title>Perfil de {name}</title>
      </Helmet>
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
      <section className="w-full h-[38em] lg:h-full bg-zinc-900 shadow-md shadow-zinc-900 rounded-md overflow-hidden relative">
        <div className="bg-zinc-700 h-48 relative" />
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-4 w-full absolute top-[120px] p-8">
            <div className="col-span-3 flex flex-row gap-8 items-center mb-8">
              <div className="bg-white p-[3px] rounded-full shadow-lg shadow-black">
                {photo ? (
                  <img
                    src={photo}
                    className="rounded-full overflow-hidden w-32 h-32 object-cover"
                  />
                ) : (
                  <img
                    src={image}
                    className="rounded-full overflow-hidden w-32 h-32 object-cover"
                  />
                )}
              </div>
              <span className="flex flex-col pt-9">
                <h1 className="text-white font-bold text-3xl">Mi Perfil</h1>
                <h1 className="text-white font-normal text-sm">
                  Actualiza tu foto de perfil e información personal
                </h1>
                <span className="flex flex-row gap-2">
                  {/* input clear */}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) =>
                      setPhoto(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                  <label
                    htmlFor="file"
                    className="flex flex-row items-center gap-2 cursor-pointer"
                  >
                    <h1 className="text-yellow-400 hover:text-zinc-300 font-normal text-xs underline cursor-pointer">
                      Editar Foto
                    </h1>
                  </label>

                  <h1 className="text-yellow-400 hover:text-zinc-300 font-normal text-xs underline cursor-pointer">
                    Actualizar Contraseña
                  </h1>
                  <h1 className="text-yellow-400 hover:text-zinc-300 font-normal text-xs underline cursor-pointer">
                    Actualizar Correo Electrónico
                  </h1>
                </span>
              </span>
            </div>
            <div className="hidden col-span-1 lg:flex flex-row gap-2 pt-6 items-center justify-end mb-8">
              <button
                type="button"
                onClick={handleReset}
                className="border-gray-800 hover:border-none hover:bg-gray-800 border-2 py-3 px-4 rounded-md text-white  font-bold text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={
                  formData
                    ? 'bg-yellow-400 w-40 rounded-md text-black font-bold text-sm cursor-wait'
                    : 'border-yellow-400 border-2 bg-yellow-400 hover:bg-yellow-500 hover:border-none w-40 rounded-md text-black font-bold text-sm cursor-pointer'
                }
              >
                {!formData && <h1 className="py-3 px-4">Guardar Cambios</h1>}
                {formData && <Loader className="fill-black" />}
              </button>
            </div>
            <div className="col-span-2 flex flex-col gap-8 mb-8">
              <span className="flex flex-row gap-12 items-center">
                <h1 className="text-white font-normal text-sm w-40">
                  Nombre de Usuario:
                </h1>
                <input
                  type="text"
                  value={name}
                  disabled
                  onChange={(e) => setName(e.target.value)}
                  className="w-56 bg-zinc-800 disabled:text-zinc-400 text-white font-normal text-sm rounded-md py-3 px-4 outline-none"
                />
              </span>
              <span className="flex flex-row gap-12 items-center">
                <h1 className="text-white font-normal text-sm w-40">Nombre:</h1>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-56 bg-zinc-800 text-white font-normal text-sm rounded-md py-3 px-4 outline-none"
                />
              </span>
              <span className="flex flex-row gap-12 items-center">
                <h1 className="text-white font-normal text-sm w-40">
                  Identificación:
                </h1>
                <input
                  type="number"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-56 bg-zinc-800 text-white font-normal text-sm rounded-md py-3 px-4 outline-none"
                />
              </span>
            </div>
            <div className="col-span-2 flex flex-col gap-8 mb-8">
              <span className="flex flex-row gap-12 items-center">
                <h1 className="text-white font-normal text-sm w-40">
                  Correo Electronico:
                </h1>
                <input
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-56 bg-zinc-800 disabled:text-zinc-400 text-white font-normal text-sm rounded-md py-3 px-4 outline-none"
                />
              </span>
              <span className="flex flex-row gap-12 items-center">
                <h1 className="text-white font-normal text-sm w-40">
                  Apellido:
                </h1>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-56 bg-zinc-800 text-white font-normal text-sm rounded-md py-3 px-4 outline-none"
                />
              </span>

              {/* <input
                  type="text"
                  disabled
                  value={apellido}
                  className="w-56 bg-zinc-800 text-white font-normal text-sm rounded-md py-3 px-4 outline-none"
                /> */}
              <Tag llavero={llavero} estudianteId={estudianteId} />
            </div>
            <hr className="col-span-4 border-zinc-700" />
          </div>
        </form>
      </section>
    </>
  );
}

export default ClassroomProfilePage;
