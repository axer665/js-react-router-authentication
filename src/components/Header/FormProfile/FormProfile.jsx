import './FormProfile.scss';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default function FormProfile(props) {
  const { profile, handleLogout } = props;

  return (
    profile && <div className="form__profile">
      <div className="form__greeting">Hello, {profile.name}</div>
      <div className="form__avatar">
        <img src={profile.avatar} alt={profile.name} />
      </div>
      <Link to={'/'}>
        <button onClick={handleLogout} className="form__btn logout">Logout</button>
      </Link>
    </div>
  )
}

FormProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}