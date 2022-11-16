/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

import {
  SALA_VIEW_REQUEST,
  SALA_VIEW_SUCCESS,
  SALA_VIEW_FAIL,
  SALA_VIEW_RESET,
  SALA_DETAILS_REQUEST,
  SALA_DETAILS_SUCCESS,
  SALA_DETAILS_FAIL
} from '../constants/asistenciaConstants';

export const asistenciaViewReducer = (state = { asistencias: [] }, action) => {
  switch (action.type) {
    case SALA_VIEW_REQUEST:
      return { loading: true };

    case SALA_VIEW_SUCCESS:
      return { loading: false, asistencias: action.payload };

    case SALA_VIEW_FAIL:
      return { loading: false, error: action.payload };

    case SALA_VIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const salaDetailsReducer = (state = { asistencia: [] }, action) => {
  switch (action.type) {
    case SALA_DETAILS_REQUEST:
      return { ...state, loading: true };

    case SALA_DETAILS_SUCCESS:
      return { loading: false, asistencia: action.payload };

    case SALA_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
