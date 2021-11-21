import React, { useState } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    eyeIcon:{
        padding: 8,
        border: "1px solid white",
        backgroundColor: "#246bf8",
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: ".25rem",
        borderBottomRightRadius: ".25rem",
        fontSize: 14
    },
    passwordInput: {
        borderBottomLeftRadius: ".25rem",
        borderTopLeftRadius: ".25rem",
        fontSize: 14
    }
})


export const PasswordInput = ({ onChangePassword, password, placeholder }) => {

    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 9 }}>
                <input
                    placeholder={placeholder}
                    className={`${classes.passwordInput} b dib pa2 bc-white input-reset b--white ba w-100`}
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChangePassword}
                    value={password}
                />
            </div>
            <div style={{ flex: 1 }}>
                <div className={classes.eyeIcon} onClick={toggleShowPassword}>
                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className='fas fa-eye' />}
                </div>
            </div>
        </div>
    )
}