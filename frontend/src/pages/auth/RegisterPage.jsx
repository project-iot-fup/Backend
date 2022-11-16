/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import User from '../../assets/svg/user';
import Email from '../../assets/svg/email';
import Password from '../../assets/svg/password';
import Loader from '../../assets/svg/loader';

import { register } from '../../actions/userActions';

function RegisterPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      // dispatch estudianteCreate
      // dispatch(createEstudiante());
      console.log(userInfo);
      navigate('/classroom');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <section className="bg-zinc-800">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-zinc-900 rounded-lg w-[700px] h-[800px] p-6 shadow-lg shadow-zinc-900">
            <h1 className="text-5xl pt-12 pb-8 font-black text-center text-white leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-100">
              Crear Cuenta
            </h1>
            <div>
              <p className="text-lg font-normal text-center text-white">
                Hola, registrate para poder acceder a la plataforma
              </p>
              {error && (
                <p className="text-lg font-normal text-center text-red-500 ">
                  {/* El correo con el que intentas registrarte ya existe */}
                  {error}
                </p>
              )}
            </div>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validate={(res) => {
                const error = {};

                // Validacion Nombre
                if (!res.name) {
                  error.name = 'Por favor ingresa un nombre';
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(res.name)) {
                  error.name = 'El nombre solo puede contener letras y espacio';
                }
                // Validacion Email
                if (!res.email) {
                  error.email = 'Por favor ingresa un correo electronico';
                } else if (
                  !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                    res.email
                  )
                ) {
                  error.email =
                    'El correo electronico solo puede contener letras, numeros, guiones, puntos y arrobas';
                }

                // Validacion Contraseña
                if (!res.password) {
                  error.password = 'Introduzca una contraseña';
                } else if (res.password.length < 6) {
                  error.password =
                    'La contraseña debe tener al menos 6 caracteres';
                }

                // Validacion Repetir Contraseña
                if (!res.confirmPassword) {
                  error.confirmPassword = 'Repita la contraseña';
                } else if (res.confirmPassword !== res.password) {
                  error.confirmPassword = 'Las contraseñas no coinciden';
                }

                return error;
              }}
              onSubmit={(res, { resetForm }) => {
                resetForm();
                setFormData(true);
                dispatch(register(res.name, res.email, res.password));
                setTimeout(() => {
                  setFormData(false);
                }, 1000);
                return res;
              }}
            >
              {({ errors }) => (
                <Form>
                  <div className="mt-8 mb-8 h-[450px] flex justify-center flex-col gap-4 items-center w-[650px]">
                    <span className="w-[400px] relative">
                      <div>
                        <Field
                          className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 text-white"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Nombre de Usuario"
                        />
                        <span>
                          <User className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                        </span>
                      </div>
                      <ErrorMessage
                        name="name"
                        component={() => (
                          <div className="text-red-500 text-xs pl-1 pt-2 font-normal">
                            {errors.name}
                          </div>
                        )}
                      />
                    </span>
                    <span className="w-[400px] relative">
                      <div>
                        <Field
                          className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 text-white"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Correo Electronico"
                        />
                        <span>
                          <Email className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                        </span>
                      </div>
                      <ErrorMessage
                        name="email"
                        component={() => (
                          <div className="text-red-500 text-xs pl-1 pt-2 font-normal">
                            {errors.email}
                          </div>
                        )}
                      />
                    </span>
                    <span className="w-[400px] relative">
                      <div>
                        <Field
                          className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 text-white"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Contraseña"
                        />
                        <span>
                          <Password className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component={() => (
                          <div className="text-red-500 text-xs pl-1 pt-2 font-normal">
                            {errors.password}
                          </div>
                        )}
                      />
                    </span>
                    <span className="w-[400px] relative">
                      <div>
                        <Field
                          className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 text-white"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirmar contraseña"
                        />
                        <span>
                          <Password className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                        </span>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component={() => (
                          <div className="text-red-500 text-xs pl-1 pt-2 font-normal">
                            {errors.confirmPassword}
                          </div>
                        )}
                      />
                    </span>
                    <span className="w-[400px] relative">
                      <button
                        type="submit"
                        className="bg-yellow-400 w-full rounded-lg"
                      >
                        {!formData && (
                          <h1 className="text-black text-md font-bold py-4">
                            Registrarse
                          </h1>
                        )}
                        {formData && <Loader className="fill-black" />}
                      </button>
                    </span>
                  </div>
                </Form>
              )}
            </Formik>

            <span>
              <p className="text-white text-lg font-normal text-center tracking-wide">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/auth/login"
                  className="font-normal text-yellow-400 text-lg hover:text-yellow-300"
                >
                  Inicia sesión
                </Link>
              </p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
