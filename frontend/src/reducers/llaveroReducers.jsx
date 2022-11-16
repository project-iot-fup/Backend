/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import {
  LLAVERO_CREATE_REQUEST,
  LLAVERO_CREATE_SUCCESS,
  LLAVERO_CREATE_FAIL,
  LLAVERO_CREATE_RESET,
  LLAVERO_DETAILS_REQUEST,
  LLAVERO_DETAILS_SUCCESS,
  LLAVERO_DETAILS_FAIL
} from '../constants/llaveroConstants';

export const llaveroCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LLAVERO_CREATE_REQUEST:
      return { loading: true };

    case LLAVERO_CREATE_SUCCESS:
      return { loading: false, success: true, llavero: action.payload };

    case LLAVERO_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case LLAVERO_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const llaveroDetailsReducer = (
  state = { llavero: { llavero: {} } },
  action
) => {
  switch (action.type) {
    case LLAVERO_DETAILS_REQUEST:
      return { ...state, loading: true };

    case LLAVERO_DETAILS_SUCCESS:
      return { loading: false, llavero: action.payload };

    case LLAVERO_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
