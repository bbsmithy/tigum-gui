import React from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    container: {
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        paddingTop: "10%"
    },
    fourOFour: {
        color: "white",
        fontSize: 50
    },
    img: {
        position: "absolute",
        bottom: 0,
        left: 30
    },
    notFoundheading: {
        color: "white",
        fontSize: 30
    }
})


const UserNotFound = ({ userName }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h1 className={classes.fourOFour}>404</h1>
            <h3 className={classes.notFoundheading}>
                Sorry that profile does not exist "{userName}"
            </h3>
            <img src={require("./404.gif")} className={classes.img} />
        </div>
    )
}

export default UserNotFound