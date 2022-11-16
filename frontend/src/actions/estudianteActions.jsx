/* eslint-disable no-unused-vars */
// no-unused-vars
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import {
  ESTUDIANTE_LIST_REQUEST,
  ESTUDIANTE_LIST_SUCCESS,
  ESTUDIANTE_LIST_FAIL,
  ESTUDIANTE_DETAILS_REQUEST,
  ESTUDIANTE_DETAILS_SUCCESS,
  ESTUDIANTE_DETAILS_FAIL,
  ESTUDIANTE_DELETE_REQUEST,
  ESTUDIANTE_DELETE_SUCCESS,
  ESTUDIANTE_DELETE_FAIL,
  ESTUDIANTE_CREATE_REQUEST,
  ESTUDIANTE_CREATE_SUCCESS,
  ESTUDIANTE_CREATE_FAIL,
  ESTUDIANTE_UPDATE_REQUEST,
  ESTUDIANTE_UPDATE_SUCCESS,
  ESTUDIANTE_UPDATE_FAIL
} from '../constants/estudianteConstants';

export const listaEstudiantes = () => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_LIST_REQUEST });

    const { data } = await axios.get(`/api/estudiantes`);

    dispatch({
      type: ESTUDIANTE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const createEstudiante = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ESTUDIANTE_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/estudiantes/create/`, {}, config);
    dispatch({
      type: ESTUDIANTE_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const listaEstudianteDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/estudiantes/${id}`);

    dispatch({
      type: ESTUDIANTE_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const updateEstudiante = (estudiante) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ESTUDIANTE_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/estudiantes/update/${estudiante._id}/`,
      estudiante,
      config
    );
    dispatch({
      type: ESTUDIANTE_UPDATE_SUCCESS,
      payload: data
    });

    dispatch({
      type: ESTUDIANTE_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const deleteEstudiante = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ESTUDIANTE_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.delete(
      `/api/estudiantes/delete/${id}/`,
      config
    );

    dispatch({
      type: ESTUDIANTE_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
