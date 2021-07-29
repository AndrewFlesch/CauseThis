import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({ getCurrentProfile, profile: { profile }, auth }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
