import React from "react"
import { createUseStyles } from "react-jss";
import NotificationIcon from "./NotificationIcon";

const useStyles = createUseStyles({
    success: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20
    },
    error: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20
    },
    warn: {
        backgroundColor: '#fd7e14',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20
    },
    icon: {
        color: 'white',
        marginRight: 10,
    },
    text: {
        color: "white",
        margin: 0,
        display: "inline"
    },
    notifContainer: {
        display: "inline"
    }
});

type LoginCardResultProps = {
    message: string,
    type: "ERROR" | "SUCCESS" | "WARN"
}

const LoginCardResult = ({ message, type } : LoginCardResultProps) => {
    const classes = useStyles()
    return (
        <div className={type === "SUCCESS" ? classes.success : classes.error}>
            <div className={classes.notifContainer}>
                <NotificationIcon 
                    variant={type.toLowerCase()} 
                    iconClass={classes.icon}
                />
            </div>
            <p className={classes.text}>{message}</p>
        </div>
    )
}

export default LoginCardResult