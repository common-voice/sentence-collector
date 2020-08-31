import React, {
  useCallback,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { migrate } from '../../actions/login';

import '../../../css/migrate.css';

const Migrate = () => {
  const {
    migrationError,
    migrating,
    migrationDone,
   } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [username, usernameChanged] = useState();
  const [password, passwordChanged] = useState();
  const submit = useCallback((event) => {
    const credentials = {
      username,
      password,
    };
    event.preventDefault();
    dispatch(migrate(credentials));
  }, [username, password]);

  return (
    <form id="migrationForm" onSubmit={ (event) => submit(event) }>
      <h1>Migrate Account</h1>
      <p>If you had an account with a username and password before we switched to using Auth0, you can migrate your old account here. To do so, enter your username and password.</p>
      { migrationError && (<p className="error-message">{ migrationError }</p>) }

      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" onChange={ (event) => usernameChanged(event.target.value) } />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="username" onChange={ (event) => passwordChanged(event.target.value) } />

      { migrating && (
        <p className="loadingText">Migrating your data. This might take a few moments.</p>
      )}
      <button disabled={ !username || !password }>Migrate</button>

      { migrationDone && (<Redirect to={'/foo'} />) }
    </form>
  );
};

export default Migrate;
