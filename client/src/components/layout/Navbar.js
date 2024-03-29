import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

const Navbar = ( { auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
      <ul>
      <li>
      <Link to='/profile'>
        Me
      </Link>
      </li>
        <li>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <a onClick={logout} href="#!">Logout</a></li>
      </ul>
  );

  const guestLinks = (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
);

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      { !loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks } </Fragment>)}
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
