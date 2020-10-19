import React, { useState } from 'react';
import { loginUser, signupUser } from '../../clib/api';
import { useStateValue } from '../../state/StateProvider';
import { AUTH_SCREENS } from '../../routers/AuthRouter';
import { useEvervault } from '@evervault/react';



const LoginForm = ({ dispatch, navigateToSignup }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [authing, setAuthing] = useState(false);

  const login = async () => {
    setAuthing(true);
    try {
      const res = await loginUser(email, password);
      if (res) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res });
        setAuthing(false);
      }
    } catch (e) {
      setAuthing(false);
      setLoginError('Incorrect email or password');
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        <div className='mt3 white'>
          <label className='db fw6 lh-copy f6'>Email</label>
          <input
            className='pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100'
            type='email'
            onChange={onChangeEmail}
            value={email}
            name='email-address'
            id='email-address'
          />
        </div>
        <div className='mv3 white'>
          <label className='db fw6 lh-copy f6'>Password</label>
          <input
            className='b white br2 pa2 bc-white input-reset b--white ba bg-transparent hover-bg-black hover-white w-100'
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
        <span
          onClick={navigateToSignup}
          className='link underline white fl pointer'
        >
          I don't have an account yet.
        </span>
        <button
          className='b ph3 pv2 fr br2 input-reset ba b--white bg-transparent white pointer f6 dib'
          type='submit'
          disabled={authing}
          onClick={login}
        >
          {authing ? (
            <div>
              <i className='fas fa-circle-notch fa-spin'></i> Beep Bop Boop
            </div>
          ) : (
            'Login'
          )}
        </button>
      </div>
    </>
  )
}


const SignupForm = ({ dispatch, navigateToSignup}) => {

  const evervault = useEvervault();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [authing, setAuthing] = useState(false);

  const onClickSignUp = async () => {
    try {
      const encrypted = await evervault.encrypt({ email, password })
      // const decrypted = await evervault.run("tigum-signup-cage", encrypted)
      console.log(encrypted)
    } catch (e) {
      console.log(e)
      setAuthing(false)
      setLoginError('Failed to create account')
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        <div className='mt3 white'>
          <label className='db fw6 lh-copy f6'>Email</label>
          <input
            className='pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100'
            type='email'
            onChange={onChangeEmail}
            value={email}
            name='email-address'
            id='email-address'
          />
        </div>
        <div className='mv3 white'>
          <label className='db fw6 lh-copy f6'>Password</label>
          <input
            className='b white br2 pa2 bc-white input-reset b--white ba bg-transparent hover-bg-black hover-white w-100'
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
        <span
          onClick={navigateToSignup}
          className='link underline white fl pointer'
        >
          I have an account, go to sign in
        </span>
        <button
          className='b ph3 pv2 fr br2 input-reset ba b--white bg-transparent white pointer f6 dib'
          type='submit'
          disabled={authing}
          onClick={onClickSignUp}
        >
          {authing ? (
            <div>
              <i className='fas fa-circle-notch fa-spin'></i> Computing...
            </div>
          ) : (
            'Sign Up'
          )}
        </button>
      </div>
    </>
  )
}

export const Login = (props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [showLogin, setShowLogin] = useState(true)


  const navigateToSignup = () => {
    setShowLogin(!showLogin)
  };

  return (
    <main className='pa4 white'>
      <div className='measure center'>
        <img src={require('../../logo-tigum.png')} className='w-33' />
        <p>A tool for building your online university</p>
        {showLogin ? 
          <LoginForm dispatch={dispatch} navigateToSignup={navigateToSignup} /> :
          <SignupForm dispatch={dispatch} navigateToSignup={navigateToSignup} />
        }   
      </div>
    </main>
  );
};
