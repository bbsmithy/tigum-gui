import React from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    paragraphLoading: {
        width: '100%',
        marginTop: 10,
        height: 8,
        borderRadius: 5,
        backgroundColor: 'gray',
    },
    linkLoading: {
        width: '60%',
        marginTop: 30,
        height: 8,
        backgroundColor: 'gray',
        marginBottom: 10,
    },
    snippetLoading: {
        margin: "auto",
        marginTop: 15,
        padding: 10
    }
})


const LoadingSnippet = () => {

    const classes = useStyles()

    return (
        <>
            <article className={`shadow-card mw5 mw7-ns hidden br3 ba dark-gray b--black-10  mv3 ${classes.snippetLoading}`}>
            <div className={classes.paragraphLoading}></div>
            <div className={classes.paragraphLoading}></div>
            <div className={classes.paragraphLoading}></div>
            <div className={classes.paragraphLoading}></div>
            <div className={classes.paragraphLoading}></div>
            <div className={classes.linkLoading}></div>
            </article>
            <article className={`shadow-card mw5 mw7-ns hidden br3 ba dark-gray b--black-10  mv3 ${classes.snippetLoading}`}>
                <div className={classes.paragraphLoading}></div>
                <div className={classes.paragraphLoading}></div>
                <div className={classes.paragraphLoading}></div>
                <div className={classes.paragraphLoading}></div>
                <div className={classes.linkLoading}></div>
            </article>
        </>
    )
}

export default LoadingSnippet