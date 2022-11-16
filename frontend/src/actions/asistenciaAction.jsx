/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// no-unused-vars
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import {
  SALA_VIEW_REQUEST,
  SALA_VIEW_SUCCESS,
  SALA_VIEW_FAIL,
  SALA_VIEW_RESET,
  SALA_DETAILS_REQUEST,
  SALA_DETAILS_SUCCESS,
  SALA_DETAILS_FAIL
} from '../constants/asistenciaConstants';

export const viewSala = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALA_VIEW_REQUEST
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

    const { data } = await axios.get(`/api/asistencias`, {}, config);
    dispatch({
      type: SALA_VIEW_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SALA_VIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const salaDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SALA_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/asistencias/${id}`);

    dispatch({
      type: SALA_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SALA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
