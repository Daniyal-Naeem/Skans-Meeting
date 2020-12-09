import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import crudContext from "../../context/crud/crudContext";


const ContactItem = ({ meeting }) => {
  const CrudContext = useContext(crudContext);
  const { deleteMeeting, setCurrent, clearCurrent } = CrudContext;

  const { _id, classname, classid, type } = meeting;


  const onDelete = () => {
    deleteMeeting(_id); 
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-danger text-left'>
     
    <a href= "https://rocky-chamber-92882.herokuapp.com/">  {classname} </a>

        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {classid && (
          <li>
          <i class="fas fa-chalkboard-teacher"></i>   {classid}
          </li>
        )}
        
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(meeting)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  meeting: PropTypes.object.isRequired
};

export default ContactItem;