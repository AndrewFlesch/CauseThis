import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_UTILS,
  GET_UTIL,
  UTIL_ERROR,
  ADD_UTIL,
  DELETE_UTIL,
  UPDATE_UTIL
} from './types';

// Add

export const addUtil = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/utils`, formData, config);
    dispatch({
      type: ADD_UTIL,
      payload: res.data
    });

    dispatch(setAlert('Created Item', 'success'));

  } catch (err) {
    dispatch({
      type: UTIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Update

export const updateUtil = (items, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/utils/${id}`, items);
    dispatch({
      type: UPDATE_UTIL,
      payload: res.data
    });

    dispatch(setAlert('Item Updated', 'success'));

  } catch (err) {
    dispatch({
      type: UTIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Get all items

export const getUtils = () => async dispatch => {
  try {
    const res = await axios.get('/api/utils');
    dispatch({
      type: GET_UTILS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: UTIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Get item

export const getUtil = id => async dispatch => {
  try {
    const res = await axios.get(`/api/utils/${id}`);

    dispatch({
      type: GET_UTIL,
      payload: res.data
    });
    console.log(res.data)

  } catch (err) {
    dispatch({
      type: UTIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}




// Delete post

export const deleteUtil = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/utils/${postId}`);
    dispatch({
      type: DELETE_UTIL,
      payload: postId
    });

    dispatch(setAlert('Item Removed', 'success'));

  } catch (err) {
    dispatch({
      type: UTIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}
