/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Helmet } from 'react-helmet';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/userActions';

import Email from '../../assets/svg/email';
import Password from '../../assets/svg/password';
import Loader from '../../assets/svg/loader';

function LoginPage() {
  const [formData, setFormData] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/classroom');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <section className="bg-zinc-800">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-zinc-900 rounded-lg w-[700px] h-[700px] p-6 shadow-lg shadow-zinc-900">
            <h1 className="text-5xl pt-12 pb-8 font-black text-center text-white leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-100">
              Iniciar Sesión
            </h1>
            <div>
              <p className="text-lg font-normal text-center text-white">
                Oye, ingresa tus datos para iniciar sesión en tu cuenta
              </p>
              {error && (
                <p className="text-lg font-normal text-center text-red-500 ">
                  No se encontró ninguna cuenta activa con las credenciales
                  dadas
                </p>
              )}
            </div>
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              validate={(res) => {
                const error = {};

                // Validacion Email
                if (!res.username) {
                  error.username =
                    'Por favor, introduzca un correo electrónico';
                } else if (
                  !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                    res.username
                  )
                ) {
                  error.username =
                    'El correo electrónico solo puede contener letras, números, guiones, puntos y un signo en el momento';
                }
                // Validacion Contraseña
                if (!res.password) {
                  error.password = 'Por favor, Introduzca una contraseña';
                } else if (res.password.length < 6) {
                  error.password =
                    'La contraseña debe tener al menos 6 caracteres';
                }
                return error;
              }}
              onSubmit={(res, { resetForm }) => {
                resetForm();
                setFormData(true);
                dispatch(login(res.username, res.password));
                setTimeout(() => {
                  setFormData(false);
                }, 1000);
                return res;
              }}
            >
              {({ errors }) => (
                <Form>
                  <div className="h-[400px] flex justify-center flex-col gap-4 items-center w-[650px]">
                    <span className="w-[400px] relative">
                      <div>
                        <Field
                          className="outline-none relative w-full h-full py-4 pl-14 rounded-lg bg-zinc-800 text-white"
                          type="email"
                          id="username"
                          name="username"
                          placeholder="Correo Electronico"
                        />
                        <span>
                          <Email className="absolute top-[26px] left-4 transform -translate-y-1/2 fill-zinc-400 " />
                        </span>
                      </div>
                      <ErrorMessage
                        name="username"
                        component={() => (
                          <div className="text-red-500 text-xs pl-1 pt-2 font-normal">
                            {errors.username}
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
                      <button
                        type="submit"
                        className="bg-yellow-400 w-full rounded-lg"
                      >
                        {!formData && (
                          <h1 className="text-black text-md font-bold py-4">
                            Entrar
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
                ¿No tienes cuenta?{' '}
                <Link
                  to="/auth/register"
                  className="font-normal text-yellow-400 text-lg hover:text-yellow-300"
                >
                  Registrate ahora
                </Link>
              </p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
