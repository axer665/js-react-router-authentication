import './FormAuth.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

export default function FormAuth({ handleLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPasword] = useState('');
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name } = evt.target
    const { value } = evt.target;
    name === 'name' ? setLogin(value) : setPasword(value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleLogin(login, password);
    setLogin('');
    setPasword('');
    await navigate('/news');
  }

  return (
    <form onSubmit={handleSubmit} className="form__auth">
      <input
        onChange={handleChange}
        value={login}
        type="text"
        className="form__input"
        name="name"
        placeholder="Username"
        required
      />
      <input
        onChange={handleChange}
        value={password}
        type="password"
        className="form__input"
        name="password"
        placeholder="Password"
        required
      />
      <button className="form__btn login">Login</button>
    </form>
  )
}

FormAuth.propTypes = {
  handleLogin: PropTypes.func.isRequired
}