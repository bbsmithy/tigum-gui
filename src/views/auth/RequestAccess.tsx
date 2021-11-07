import React, { useState } from 'react';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { goto, validateEmail } from '../../util';
import { requestBetaAccess } from '../../clib/api'
import LoginCardResult from '../../components/LoginResultCard';

const useStyles = createUseStyles({
  disabledBtn: {
    backgroundColor: "gray",
    color: "#efefef",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid gray",
    width: "100%",
    cursor: "not-allowed"
  },
  activeBtn: {
    backgroundColor: "#246bf8",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid #246bf8",
    width: "100%",
    cursor: "pointer"
  },
  container: {
    '@media (max-width: 600px)':{
      padding: "30px 20px"
    },
    padding: 50
  },
  eyeIcon:{
    padding: 8,
    border: "1px solid white",
    backgroundColor: "#246bf8",
    textAlign: "center",
    cursor: "pointer",
    borderTopRightRadius: ".25rem",
    borderBottomRightRadius: ".25rem",
  },
  passwordInput: {
    borderBottomLeftRadius: ".25rem",
    borderTopLeftRadius: ".25rem"
  }
});


const BetaAccessForm = ({ dispatch, classes }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [accessMsg, setAccessMsg] = useState('');
  const [accessFailed, setAccesFailed] = useState('');
  const [invalidEmail, setInvalidEmail] = useState('');
  const [authing, setAuthing] = useState(false);
  const [requestedAccess, setRequestedAccess] = useState(false)

  const isValidForm = (email || requestedAccess)
  

  const request = async () => {
    if (isValidForm && !authing) {
      setAuthing(true);
      if (!validateEmail(email)) {
        setInvalidEmail("Invalid email")
        setAuthing(false)
      } else {
        try {
          await requestBetaAccess({ email, username })
          setAuthing(false)
          setAccessMsg("Thank you for requesting beta access! I'll email you soon with your login details.")
          setRequestedAccess(true)
          setAuthing(false)
        } catch (e) {
          setAuthing(false);
          setAccesFailed('Something went wrong please contact briansmith.work578@gmail.com for support');
        }
      }
    }
  };

  const onChangeEmail = (e) => {
    setAccesFailed("")
    setInvalidEmail("")
    setEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setAccesFailed("")
    setInvalidEmail("")
    setUsername(e.target.value);
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
            name='Email Address'
            id='email-address'
          />
          <div className='mv3 white'>
            <label className='db fw6 lh-copy f6 mb1'>Enter Name (optional)</label>
            <input
              className='pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100'
              onChange={onChangeName}
              value={username}
              name='Name'
              id='beta-name'
            />
          </div>
        </div>
      </fieldset>
      {accessMsg && (
        <LoginCardResult message={accessMsg} type="SUCCESS" />
      )}
      {accessFailed && (
        <LoginCardResult message={accessFailed} type="ERROR" />
      )}
      {invalidEmail && (
        <LoginCardResult message={invalidEmail} type="WARN" />
      )}
      <div className='white'>
        <button
          className={`${isValidForm ? classes.activeBtn : classes.disabledBtn} b ph3 pv2 br2 input-reset ba b--white bg-transparent white f6`}
          type='submit'
          disabled={!isValidForm || authing}
          onClick={request}
        >
          {authing ? (
            <div>
              <i className='fas fa-circle-notch fa-spin'></i> Beep Bop Boop
            </div>
          ) : (
            'Request Beta Access'
          )}
        </button>
        <div
          onClick={() => {
            goto(`login`);
          }}
          className={`link underline tc mt4 white pointer`}
        >
          I already have an account login
        </div>
      </div>
    </>
  )
}

export const RequestAccess = (props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const classes = useStyles()

  return (
    <main className={`white ${classes.container}`}>
      <div className='measure center'>
        <img src={require('../../logo-tigum.png')} className='w-33' />
        <p>Your personal learning enviroment for the web</p>
        <BetaAccessForm dispatch={dispatch} classes={classes} />
      </div>
    </main>
  );
};
