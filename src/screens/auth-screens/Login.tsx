import React, { useState } from "react";
import { loginUser } from "../../client-lib/api";
import { useStateValue } from "../../state/StateProvider";
import { AUTH_SCREENS } from "../../routers/AuthRouter";

export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authing, setAuthing] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const login = async () => {
    setAuthing(true);
    try {
      const res = await loginUser(email, password);
      if (res) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res });
        setAuthing(false);
      }
    } catch (e) {
      setAuthing(false);
      setLoginError("Incorrect email or password");
    }
  };

  const navigateToSignup = () => {
    props.navigate(AUTH_SCREENS.SIGNUP);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <main className="pa4 white">
      <div className="measure center">
        <img src={require("../../logo.png")} className="w-33" />
        <p>A personal knowledge base built for developers</p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3 white">
            <label className="db fw6 lh-copy f6">Email</label>
            <input
              className="pa2 white input-reset ba bg-transparent b--white hover-bg-black hover-white w-100"
              type="email"
              onChange={onChangeEmail}
              value={email}
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3 white">
            <label className="db fw6 lh-copy f6">Password</label>
            <input
              className="b white pa2 bc-white input-reset b--white ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              onChange={onChangePassword}
              value={password}
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        {loginError && (
          <div>
            <p>{loginError}</p>
          </div>
        )}
        <div className="white">
          <button
            className="b ph3 pv2 input-reset ba b--white bg-transparent white pointer f6 dib"
            type="submit"
            disabled={authing}
            onClick={login}
          >
            {authing ? (
              <div>
                <i className="fas fa-circle-notch fa-spin"></i> Searching the
                cosmos
              </div>
            ) : (
              "Login"
            )}
          </button>
          <span
            onClick={navigateToSignup}
            className="link underline white fr pointer"
          >
            Sign up
          </span>
        </div>
      </div>
    </main>
  );
};
