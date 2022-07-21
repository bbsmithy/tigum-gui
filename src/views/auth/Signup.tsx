import React, { useState } from "react";
import { signupUser } from "../../clib/api";
import { useStateValue } from "../../state/StateProvider";
import { useEvervault } from "@evervault/react";
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

const SignupForm = ({ dispatch, classes }) => {
  const params = new URLSearchParams(window.location.search);
  const evervault = useEvervault();
  const [email, setEmail] = useState(params.get("email"));
  const [name, setName] = useState(params.get("name"));
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [authing, setAuthing] = useState(false);

  const onClickSignUp = async () => {
    if (isValidForm && !authing) {
      setAuthing(true);
      try {
        setAuthing(true);
        const encrypted = await evervault.encrypt({ email });
        await signupUser(name, email, encrypted.email, password);
        setSignupSuccess(
          "Thanks for signing up! Check your email for your account verification link"
        );
        setAuthing(false);
      } catch (e) {
        setAuthing(false);
        setSignupError(
          "Failed to create account, contact briansmith.work578@gmail.com for support"
        );
      }
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const isValidForm = email && password && name;

  return (
    <>
      <fieldset id="sign_up" className="ba b--transparent ph0">
        <div className="mt3 white">
          <label className="db fw6 lh-copy f6 mb1">Username</label>
          <input
            className="pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100"
            type="text"
            onChange={onChangeName}
            value={name}
          />
        </div>
        <div className="mt3 white">
          <label className="db fw6 lh-copy f6 mb1">Email</label>
          <input
            className="pa2 white br2 input-reset ba bg-transparent b--white hover-bg-black hover-white w-100"
            type="email"
            onChange={onChangeEmail}
            value={email}
          />
        </div>
        <div className="mv3 white">
          <label className="db fw6 lh-copy f6 mb1">Password</label>
          <PasswordInput
            onChangePassword={onChangePassword}
            password={password}
            classes={classes}
          />
        </div>
      </fieldset>
      {signupError && <LoginCardResult type="ERROR" message={signupError} />}
      {signupSuccess && (
        <LoginCardResult type="SUCCESS" message={signupSuccess} />
      )}
      <div className="white center">
        <button
          className={`${
            isValidForm ? classes.activeBtn : classes.disabledBtn
          } b ph3 pv2 br2 input-reset ba b--white bg-transparent white f6`}
          type="submit"
          disabled={!isValidForm || authing}
          onClick={onClickSignUp}
        >
          {authing ? (
            <div>
              <i className="fas fa-circle-notch fa-spin"></i> Beep Bop Boop...
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        <div
          onClick={() => {
            goto(`login`);
          }}
          className="link underline tc mt4 white pointer"
        >
          I already have an account login
        </div>
      </div>
    </>
  );
};

export const Signup = (props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [stepNumber, setStepNumber] = useState(1);
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
          <i>Step {stepNumber} of 2</i>
          {stepNumber === 1 && (
            <SignupForm dispatch={dispatch} classes={classes} />
          )}
          {stepNumber === 2 && <div>HOWYA</div>}
        </div>
      </div>
    </main>
  );
};
