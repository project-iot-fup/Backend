/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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

import { useNavigate } from 'react-router-dom';

import Message from './Message';

import Loader from '../assets/svg/loader';
import Barcode from '../assets/svg/barcode';
import Warning from '../assets/svg/warning';
import Check from '../assets/svg/check';

import { createLLavero, listallaveroDetails } from '../actions/llaveroActions';

function Tag(props) {
  const [formData, setFormData] = useState(false);

  const [tag, setTag] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const llaveroDetails = useSelector((state) => state.llaveroDetails);
  const { llavero } = llaveroDetails;

  const llaveroCreate = useSelector((state) => state.llaveroCreate);

  // console.log(props.estudianteId);
  // console.log(userId);
  // console.log(props.llavero);

  const {
    error: errorCreate,
    loading: loadingUpdate,
    success: successCreate
  } = llaveroCreate;

  const handleClose = () => {
    setShow(false);
    console.log('handleClose');
  };

  const submitHandler = (e) => {
    console.log('submit');
    e.preventDefault();
    setFormData(true);
    dispatch(createLLavero());
    setTimeout(() => {
      setFormData(false);
    }, 3000);
  };

  useEffect(() => {
    if (successCreate) {
      dispatch(listallaveroDetails(props.estudianteId));
    }
  }, [dispatch, props.estudianteId, successCreate]);

  return (
    <>
      <div className="relative">
        {props.llavero[0] === undefined ? (
          <span className="flex flex-row gap-12 items-center">
            <h1 className="text-white font-normal text-sm w-40">Tag:</h1>
            <button
              type="button"
              onClick={submitHandler}
              className="w-56 bg-black rounded-md shadow-md shadow-black"
            >
              {!formData && (
                <span className="flex flex-row gap-2 items-center py-2 px-6">
                  <Barcode className="fill-white" />
                  <h1 className="text-sm font-normal text-white">
                    Generar Tag
                  </h1>
                </span>
              )}
              {formData && <Loader className="fill-white w-44" />}
            </button>
          </span>
        ) : (
          <>
            <span className="flex flex-row gap-12 items-center">
              <h1 className="text-white font-normal text-sm w-40">Tag:</h1>
              <span className="flex flex-row items-center gap-2 w-56 bg-zinc-800 font-normal text-sm rounded-md py-3 px-4 outline-none">
                <Barcode className="fill-zinc-400" />
                <h1 className="text-zinc-400">{props.llavero[0].tag}</h1>
              </span>
            </span>
          </>
        )}
      </div>
      {errorCreate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Message
            onClick={handleClose}
            message="Registro Fallido"
            description="Vuelva a pasar el tag por el lector"
            className="text-yellow-400"
            icon={<Warning className="fill-yellow-400" />}
          />
        </motion.div>
      )}
      {successCreate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Message
            onClick={handleClose}
            message="Registro exitoso"
            description="Se ha creado el tag con éxito"
            className="text-green-500"
            icon={<Check className="fill-green-500" />}
          />
        </motion.div>
      )}
    </>
  );
}

export default Tag;
