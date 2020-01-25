import React, { useState } from "react";
import { signupUser } from "../../client-lib/api";
import { useStateValue } from "../../state/StateProvider";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authing, setAuthing] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const signUp = async () => {
    setAuthing(true);
    try {
      const res = await signupUser(email, password);
      if (res) {
        dispatch({ type: "SIGNUP_SUCCESS", payload: res });
        setAuthing(false);
      }
    } catch (e) {
      console.log(e);
      setAuthing(false);
      setLoginError("Incorrect email or password");
    }
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
        <fieldset id="sign_up" className="ba b--transparent white ph0 mh0">
          <div className="mt3">
            <label className="db fw6 lh-copy f6">Email</label>
            <input
              className="pa2 input-reset b--white ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              onChange={onChangeEmail}
              value={email}
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6">Password</label>
            <input
              className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100"
              type="password"
              onChange={onChangePassword}
              value={password}
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div>
          <p>{loginError}</p>
        </div>
        <div className="">
          <button
            className="b ph3 pv2 white input-reset ba b--white bg-transparent pointer f6 dib"
            type="submit"
            disabled={authing}
            onClick={signUp}
          >
            {authing ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              "Sign up"
            )}
          </button>
          <a href="#" className="link underline white fr">
            Login
          </a>
        </div>
      </div>
    </main>
  );
};
