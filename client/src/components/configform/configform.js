import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CONFIGFORMS,
  GET_CONFIGFORM,
  CONFIGFORM_ERROR,
  ADD_CONFIGFORM,
  DELETE_CONFIGFORM,
  UPDATE_CONFIGFORM
} from './types';

// Add

export const addConfigForm = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/configforms`, formData, config);
    dispatch({
      type: ADD_CONFIGFORM,
      payload: res.data
    });

    dispatch(setAlert('Created Item', 'success'));

  } catch (err) {
    dispatch({
      type: CONFIGFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Update

export const updateConfigForm = (formData, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/configforms/${id}`, formData, config);
    dispatch({
      type: UPDATE_CONFIGFORM,
      payload: res.data
    });

    dispatch(setAlert('Item Updated', 'success'));

  } catch (err) {
    dispatch({
      type: CONFIGFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Get all items

export const getConfigForms = () => async dispatch => {
  try {
    const res = await axios.get('/api/configforms');
    dispatch({
      type: GET_CONFIGFORMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONFIGFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Get item

export const getConfigForm = id => async dispatch => {
  try {
    const res = await axios.get(`/api/configforms/${id}`);

    dispatch({
      type: GET_CONFIGFORM,
      payload: res.data
    });
    console.log(res.data)

  } catch (err) {
    dispatch({
      type: CONFIGFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}




// Delete post

export const deleteConfigForms = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/configforms/${postId}`);
    dispatch({
      type: DELETE_CONFIGFORM,
      payload: postId
    });

    dispatch(setAlert('Item Removed', 'success'));

  } catch (err) {
    dispatch({
      type: CONFIGFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

/*

// Get posts

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
    console.log(res.data)

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Add AddComment

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}


  // DELETE Comment

  export const deleteComment = (postId, commentId) => async dispatch => {
    try {
      const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });

      dispatch(setAlert('Comment Removed', 'success'));

    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

    }
  }
*/
