import React, { useState, useContext, useEffect } from 'react';
import crudContext from "../../context/crud/crudContext";

const ContactForm = () => {
  const CrudContext = useContext(crudContext);

  const { addMeeting, updateMeeting, clearCurrent, current } = CrudContext;

  useEffect(() => {
    if (current !== null) {
      setMeeting(current);
    } else {
      setMeeting({
        classname: '',
        classid: '',
        type: 'personal'
      });
    }
  }, [CrudContext, current]);

  const [meeting, setMeeting] = useState({
    classname: '',
    classid: '',
    type: 'personal'
  });

  const { classname, classid, type } = meeting;

  const onChange = e =>
    setMeeting({ ...meeting, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addMeeting(meeting);
    } else {
      updateMeeting(meeting);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      
      <h2 className='text-danger'>
  
      <i class="fas fa-chalkboard-teacher"></i>   {current ? 'Edit Meeting' : 'Add Meeting'}  
      </h2>
      
      <input
        type='text'
        placeholder='Class Name'
        name='classname'
        value={classname}
        onChange={onChange}
      />
     <input
        type='text'
        placeholder='Class Id'
        name='classid'
        value={classid}
        onChange={onChange}
      />
      
      <h5>Meeting Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Meeting' : 'Add Meeting'}
          className='btn btn-danger btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;