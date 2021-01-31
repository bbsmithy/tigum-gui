import React, { useState } from 'react';
import { loginUser } from '../../clib/api';
import { useStateValue } from '../../state/StateProvider';
import { useEvervault } from '@evervault/react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  disabledBtn: {
    backgroundColor: "gray",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid #246bf8"
  },
  activeBtn: {
    backgroundColor: "#246bf8",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid #246bf8"
  }
});



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
          <label className='db fw6 lh-copy f6 mb1'>Enter Email</label>
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
          <label className='db fw6 lh-copy f6 mb1'>Enter Password</label>
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
          I don't have an account yet
        </span>
        <button
          className='b ph3 pv2 fr br2 input-reset ba b--white bg-transparent hover-bg-black hover-white white pointer f6 dib'
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


const SignupForm = ({ dispatch, navigateToSignup }) => {

  const classes = useStyles()
  const evervault = useEvervault();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [authing, setAuthing] = useState(false);

  const onClickSignUp = async () => {
    try {
      const encrypted = await evervault.encrypt({ email, password })
      // const decrypted = await evervault.run("tigum-signup-cage", encrypted)
      console.log(name, encrypted)
    } catch (e) {
      console.log(e)
      setAuthing(false)
      setLoginError('Failed to create account')
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeName= (e) => {
    setName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const isValidForm = email && name && password


  return (
    <>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        <div className='mt3 white'>
          <label className='db fw6 lh-copy f6 mb1'>Username</label>
          <input
            className='pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100'
            type="text"
            onChange={onChangeName}
            value={name}
          />
        </div>
        <div className='mt3 white'>
          <label className='db fw6 lh-copy f6 mb1'>New Email</label>
          <input
            className='pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100'
            type='email'
            onChange={onChangeEmail}
            value={email}
          />
        </div>
        <div className='mv3 white'>
          <label className='db fw6 lh-copy f6 mb1'>New Password</label>
          <input
            className='b white br2 pa2 bc-white input-reset b--white ba bg-transparent hover-bg-black hover-white w-100'
            type='password'
            onChange={onChangePassword}
            value={password}
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
          I already have an account
        </span>
        <button
          className={`${isValidForm ? classes.activeBtn : classes.disabledBtn} b ph3 pv2 fr br2 input-reset ba b--white bg-transparent white pointer f6 dib`}
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
    <main className='pa5 white' >
      <div className='measure center shadow-2' style={{backgroundColor: "#333", padding: "30px 20px", height: 480, borderRadius: 20}}>
        <img src={require('../../logo-tigum.png')} className='w-33' />
        <p>Your personal knowledge base for the web</p>
        {showLogin ? 
          <LoginForm dispatch={dispatch} navigateToSignup={navigateToSignup} /> :
          <SignupForm dispatch={dispatch} navigateToSignup={navigateToSignup} />
        }   
      </div>
    </main>
  );
};
