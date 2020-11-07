import React, { useState } from 'react';
import { signupUser } from '../../clib/api';
import { useStateValue } from '../../state/StateProvider';
import { AUTH_SCREENS } from '../../routers/AuthRouter';

export const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [authing, setAuthing] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const signUp = async () => {
    setAuthing(true);
    try {
      const res = await signupUser(email, password);
      if (res) {
        dispatch({ type: 'SIGNUP_SUCCESS', payload: res });
        setAuthing(false);
      }
    } catch (e) {
      setAuthing(false);
      setLoginError('Incorrect email or password');
    }
  };

  const navigateToLogin = () => {
    props.navigate(AUTH_SCREENS.LOGIN);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className='pa4 white'>
      <div className='measure center'>
        <img src={require('../../logo-tigum.png')} className='w-33' />
        <p>Your personal knowledge base for the web</p>
        <fieldset id='sign_up' className='ba b--transparent white ph0 mh0'>
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Email</label>
            <input
              className='white pa2 br2 input-reset b--white ba bg-transparent hover-bg-black hover-white w-100'
              type='email'
              onChange={onChangeEmail}
              value={email}
              name='email-address'
              id='email-address'
            />
          </div>
          <div className='mv3'>
            <label className='db fw6 lh-copy f6'>Password</label>
            <input
              className='white pa2 br2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100'
              type='password'
              onChange={onChangePassword}
              value={password}
              name='password'
              id='password'
            />
          </div>
        </fieldset>
        {loginError && (
          <div>
            <p>{loginError}</p>
          </div>
        )}
        <div className='white'>
          <button
            className='b ph3 br2 pv2 white input-reset ba b--white bg-transparent pointer f6 dib'
            type='submit'
            disabled={authing}
            onClick={signUp}
          >
            {authing ? (
              <i className='fas fa-circle-notch fa-spin'></i>
            ) : (
              'Sign up'
            )}
          </button>
          <span
            onClick={navigateToLogin}
            className='link underline white fr pointer'
          >
            Login
          </span>
        </div>
      </div>
    </main>
  );
};
