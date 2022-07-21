import React, { useState } from "react";
import { setSubdomain, signupUser } from "../../clib/api";
import { useStateValue } from "../../state/StateProvider";
import { useEvervault } from "@evervault/react";
import { createUseStyles } from "react-jss";
import { goto } from "../../util";
import LoginCardResult from "../../components/LoginResultCard";
import {
  uploadImageandGetPublicUrl,
  uploadProfilePictureAndUpdateUser,
} from "../../clib/S3";

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
  profileStepContainer: {
    textAlign: "center",
  },
  profilePictureInputContainer: {
    textAlign: "center",
  },
  profilePic: {
    background: "gray",
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: "auto",
    justifyContent: "center",
    border: "2px solid #246bf8",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#BFBFBD",
    },
  },
  subdomainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  subdomainInputContainer: {
    flex: 2,
    fontSize: 15,
  },
  subdomainInput: {
    borderRadius: 5,
    width: 220,
    padding: 10,
    height: 26,
    border: "1px solid gray",
    fontFamily: "Arial",
  },
  subdomainTigum: {
    flex: 8,
    fontSize: 18,
  },
});

const SubdomainInput = ({ classes, onChange, value }) => {
  return (
    <div
      style={{ width: "70%", margin: "auto", marginTop: 30, marginBottom: 50 }}
    >
      <div className={classes.subdomainContainer}>
        <div className={classes.subdomainInputContainer}>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Enter your subdomain"
            className={classes.subdomainInput}
          ></input>
        </div>
        <div className={classes.subdomainTigum}>
          <span>.tigum.io</span>
        </div>
      </div>
      <p style={{ fontSize: 12 }}>
        All of your published content will be hosted at this domain. For
        exampled{" "}
        <a
          href="https://bbsmithy.tigum.io"
          style={{ color: "white" }}
          target="blank"
        >
          bbsmithy.tigum.io
        </a>
      </p>
    </div>
  );
};

const ProfilePicture = ({ classes, userName, setPPURL, ppURL }) => {
  const onSelectProfile = async () => {
    const profilePic = await uploadProfilePictureAndUpdateUser("bbsmithy");
    setPPURL(profilePic);
  };

  return (
    <div className={classes.profilePictureInputContainer}>
      {ppURL && (
        <img
          className={classes.profilePic}
          src={ppURL}
          onClick={onSelectProfile}
        />
      )}
      {!ppURL && (
        <div className={classes.profilePic} onClick={onSelectProfile}>
          <i className="fas fa-plus" style={{ marginTop: 40 }} />
        </div>
      )}

      <h2>{userName}</h2>
    </div>
  );
};

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

const ProfileForm = ({ classes }) => {
  const [domain, setDomain] = useState("");
  const [ppURL, setPPURL] = useState("");

  const disabled = domain === "" || ppURL === "";

  const onChangeSubdomain = (evt) => {
    if (
      validateUrl(`https://${evt.target.value}.tigum.io`) ||
      evt.target.value === ""
    ) {
      setDomain(evt.target.value);
    }
  };

  const onDone = async () => {
    try {
      await setSubdomain(domain);
      window.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.profileStepContainer}>
      <ProfilePicture
        classes={classes}
        userName="Brian Smith"
        ppURL={ppURL}
        setPPURL={setPPURL}
      />
      <SubdomainInput
        classes={classes}
        onChange={onChangeSubdomain}
        value={domain}
      />
      <button
        className={`${
          disabled ? classes.disabledBtn : classes.activeBtn
        } b ph3 pv2 br2 input-reset ba b--white bg-transparent white f6`}
        type="submit"
        onClick={onDone}
      >
        Done
      </button>
    </div>
  );
};

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

const SignupForm = ({ classes, onComplete }) => {
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
        onComplete();
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

  const goToNextStep = () => {
    setStepNumber(stepNumber + 1);
  };

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
            <SignupForm onComplete={goToNextStep} classes={classes} />
          )}
          {stepNumber === 2 && <ProfileForm classes={classes} />}
        </div>
      </div>
    </main>
  );
};
