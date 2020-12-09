import React, {useContext, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/auth/authContext";
import CrudContext from "../../context/crud/crudContext";

const Navbar = ({ title, icon }) => {
const authContext = useContext(AuthContext);
const crudContext = useContext(CrudContext);

const {isAuthenticated, logout, user} = authContext;
const {clearMeetings} = crudContext;

const onLogout = () => {
  logout();
  clearMeetings();
}

const authLinks = (
  <Fragment>
    <li>Hello {user && user.name}</li>
    <li>
      <a onClick={onLogout} >
        <li className="fas fa-sign-out-alt"></li> <span className="hide-sm">Logout</span>
      </a>
    </li>
    
 
  </Fragment>
);
const guestLinks = (
  <Fragment>
      {/* <Link to='/register'>Register</Link> */}
      <Link to='/login'>Login </Link>
 
  </Fragment>
);



    return (
        <div className='navbar bg-danger'>
        <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
        </h1>
        <ul>
    <Link to='/'>Home </Link>
      <Link to='/about'>About</Link>
      <Link to='/courses'>Our Courses</Link>
    </ul>
         <ul> 
      {isAuthenticated ? authLinks : guestLinks} 
         </ul> 
        
    
    
     
     
        
      </div>
    )
   
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Meeting App',
  icon: 'far fa-handshake'
};
export default Navbar;