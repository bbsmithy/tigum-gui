import React, { useState } from "react";
import { loginUser } from "../../clib/api";
import { useStateValue } from "../../state/StateProvider";
import { createUseStyles } from "react-jss";
import { goto } from "../../util";
import LoginCardResult from "../../components/LoginResultCard";

const useStyles = createUseStyles({
  disabledBtn: {
    backgroundColor: "gray",
    color: "#efefef",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid gray",
    width: "100%",
    cursor: "not-allowed",
  },
  activeBtn: {
    backgroundColor: "#246bf8",
    outline: "none",
    display: "inline",
    borderRadius: 4,
    border: "2px solid #246bf8",
    width: "100%",
    cursor: "pointer",
  },
  container: {
    "@media (max-width: 600px)": {
      padding: "30px 20px",
    },
    padding: 50,
  },
  eyeIcon: {
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
    borderTopLeftRadius: ".25rem",
  },
});

const PasswordInput = ({ onChangePassword, password, classes }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 9 }}>
        <input
          className={`${classes.passwordInput} b white dib pa2 bc-white input-reset b--white ba bg-transparent hover-bg-black hover-white w-100`}
          type={showPassword ? "text" : "password"}
          onChange={onChangePassword}
          value={password}
          name="password"
          id="password"
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className={classes.eyeIcon} onClick={toggleShowPassword}>
          {showPassword ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye" />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ dispatch, classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authing, setAuthing] = useState(false);

  const login = async () => {
    if (isValidForm && !authing) {
      setAuthing(true);
      try {
        const res = await loginUser(email, password);
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res });
          setAuthing(false);
        } else {
          setAuthing(false);
          setLoginError("Incorrect email or password");
        }
      } catch (e) {
        setAuthing(false);
        setLoginError("Incorrect email or password");
      }
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const isValidForm = email && password;

  return (
    <>
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <div className="mt3 white">
          <label className="db fw6 lh-copy f6 mb1">Enter Email</label>
          <input
            className="pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100"
            type="email"
            onChange={onChangeEmail}
            value={email}
            name="email-address"
            id="email-address"
          />
        </div>
        <div className="mv3 white">
          <label className="db fw6 lh-copy f6 mb1">Enter Password</label>
          <PasswordInput
            onChangePassword={onChangePassword}
            password={password}
            classes={classes}
          />
        </div>
      </fieldset>
      {loginError && <LoginCardResult message={loginError} type="ERROR" />}
      <div className="white">
        <button
          className={`${
            isValidForm ? classes.activeBtn : classes.disabledBtn
          } b ph3 pv2 br2 input-reset ba b--white bg-transparent white f6`}
          type="submit"
          disabled={!isValidForm || authing}
          onClick={login}
        >
          {authing ? (
            <div>
              <i className="fas fa-circle-notch fa-spin"></i> Beep Bop Boop
            </div>
          ) : (
            "Login"
          )}
        </button>
        <div
          onClick={() => goto(`request-access`)}
          className={`link underline tc mt4 white pointer`}
        >
          I don't have an account
        </div>
      </div>
    </>
  );
};

export const Login = (props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const classes = useStyles();

  return (
    <main className={`white ${classes.container}`}>
      <div className="measure center">
        <img src={require("../../logo-tigum.png")} className="w-33" />
        <p>Your study tool for the web</p>
        <div
          style={{
            boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
            background: "#333",
            borderRadius: 12,
            padding: "20px 20px 30px 20px",
          }}
        >
          <LoginForm dispatch={dispatch} classes={classes} />
        </div>
      </div>
    </main>
  );
};
