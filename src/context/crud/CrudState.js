import React, { useReducer } from 'react';
import axios from 'axios';
import crudContext from './crudContext';
import crudReducer from './crudReducers';

 
import {
    GET_MEETINGS,
    ADD_MEETING,
    DELETE_MEETING,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_MEETING, 
    FILTER_MEETINGS,
    CLEAR_FILTER,
    MEETING_ERROR,
    CLEAR_MEETINGS
} from '../types';

const CrudState = props => {
  const initialState = {
    meetings: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(crudReducer, initialState);


 

  // Get Meetings
  const getMeetings = async () => {
    try {
      const res = await axios.get('/api/crud');

      dispatch({
        type: GET_MEETINGS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEETING_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Meeting
  const addMeeting = async meeting => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/crud', meeting, config);

      dispatch({
        type: ADD_MEETING,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEETING_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Meeting
  const deleteMeeting = async id => {
    try {
      await axios.delete(`/api/crud/${id}`);

      dispatch({
        type: DELETE_MEETING,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: MEETING_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Meeting
  const updateMeeting = async meeting => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/crud/${meeting._id}`,
        meeting,
        config
      );
 
      dispatch({
        type: UPDATE_MEETING,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEETING_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Meeting
  const clearMeetings = () => {
    dispatch({ type: CLEAR_MEETINGS });
  };

  // Set Current Meeting
  const setCurrent = meeting => {
    dispatch({ type: SET_CURRENT, payload: meeting });
  };

  // Clear Current Meeting
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Meeting
  const filterMeetings = text => {
    dispatch({ type: FILTER_MEETINGS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <crudContext.Provider
      value={{
        meetings: state.meetings,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addMeeting,
        deleteMeeting,
        setCurrent,
        clearCurrent,
        updateMeeting,
        filterMeetings,
        clearFilter,
        getMeetings,
        clearMeetings
      }}
    >
      {props.children}
    </crudContext.Provider>
  );
};

export default CrudState;