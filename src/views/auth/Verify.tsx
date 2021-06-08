import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { verifyUser } from '../../clib/api';
import { goto } from '../../util';

const useStyles = createUseStyles({
  icon: {
    fontSize:50
  },
  activeBtn: {
    backgroundColor: "#246bf8",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid #246bf8",
    width: "50%",
    marginTop: 20,
    cursor: "pointer"
  },
})

export const Verify = (props) => {
  const [verifying, setVerifying] = useState(null)
  const [verificationFailed, setVerificationFailed] = useState(null)
  const [verificationSuccess, setVerificationSuccess] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    findHashAndVerify()
  }, [])

  const setFailedVarification = () => {
    setVerificationFailed(true)
    setVerifying(false)
  } 

  const findHashAndVerify = async () => {
    const pathVars = window.location.pathname.split(/\//);
    if (pathVars[2]) {
      setVerifying(true)
      try {
        const res = await verifyUser(pathVars[2])
        if (res.status === 200) {
          setVerificationSuccess(true)
          setVerifying(false)
        } else {
          setFailedVarification()
        }
      } catch (err) {
        setFailedVarification()
      }
    } else {
      setFailedVarification()
    }
  }


  return (
    <main className='pa5 white' >
      <div
        className='measure center shadow-2'
        style={{backgroundColor: "#333", padding: "30px 20px", height: 480, borderRadius: 20}}
      >
        <div style={{width: "100%", margin: "auto", marginTop: "25%" }}>
          <div className='measure center tc'>
            {verificationFailed && (
              <>
                <i className={`fa fa-ban white ${classes.icon}`}></i>
                <h1>Failed to verify</h1>
              </>
            )}
            {verificationSuccess && (
              <>
                <i className={`fas fa-check white ${classes.icon}`}></i>
                <h1>Successfully Verified</h1>
                <button
                  className={`${classes.activeBtn} b ph3 pv2 br2 input-reset ba b--white bg-transparent white f6`}
                  type='submit'
                  onClick={() => goto('login')}
                >
                  Go to Login
                </button>
              </>
            )}
            {verifying && (
              <>
                  <i className={`fas fa-circle-notch fa-spin white ${classes.icon}`}></i>
                  <h1>Verifying</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
