import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { CursorState } from "../types"
import ClickAwayListener from './ClickAwayListener';

const useStyles = createUseStyles({
    cmdInput: {
      position: "absolute",
      zIndex: 10,
      borderRadius: 5,
      width: 250,
    },
    container: {
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        width: "100%",
        padding: 8,
        backgroundColor: "#474646",
        borderRadius: 3
    },
    searchResourceInput: {
      width: "97%",
      border: "1px solid #333",
      '&:focus': {
        outline: 'none'
      },
      fontSize: 12,
      height: 27,
      padding: 3,
      borderRadius: 2
    },
    checkboxContainer: {
        marginTop: 10,
        fontSize: 12,
        color: "white"
    },
    createBtnContainer: {
        borderTop: "1px solid gray",
        marginTop: 10,
    },
    createBtn: {
        marginTop: 10,
        backgroundColor: "#007bff",
        color: "white",
        width: "100%",
        cursor: "pointer",
        fontSize: 14,
        padding: 4,
        border: "none",
        boxShadow: "0 1px 2px rgba(0,0,0,0.16), 0 2px 3px rgba(0,0,0,0.23)",
    }
});


type Props = {
    selection: CursorState,
    cm: any,
    topic_id: number,
    player: any,
    onClickAway: Function,
    onCreate: Function
}


const ReferenceDialog = ({ 
    selection: { absPos, cursorPos },
    cm, topic_id,
    player,
    onClickAway,
}: Props) => {

    const classes = useStyles()
    const [refTitle, setRefTitle] = useState()


    const createReference = (ref) => {
        const currentVidTime = player.getCurrentTime()
        const refLink = `#### [${refTitle}](https://tigum.io/${window.location.pathname}/?t=${currentVidTime})`
        cm.replaceRange(refLink, cursorPos)
        onClickAway()
    }

    const onChangeRefTitle = (evt) => {
        setRefTitle(evt.currentTarget.value)
    }

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div
                className={classes.cmdInput}
                style={{
                    left: absPos.left,
                    right: absPos.right,
                    top: absPos.top,
                    bottom: absPos.bottom
                }}
            >
                <div className={classes.container}>
                    <input
                        autoFocus
                        placeholder="Video Reference Title"
                        className={classes.searchResourceInput}
                        onChange={onChangeRefTitle}
                    >
                    </input>
                    <div className={classes.checkboxContainer}>
                        <input type="checkbox" value={refTitle} defaultChecked />
                        <label style={{ lineHeight: 0, position: "relative", top: -2, left: 5 }}>Save at current video time</label>
                    </div>
                    <div className={classes.createBtnContainer}>
                        <button
                            className={classes.createBtn}
                            onClick={createReference}
                            disabled={!refTitle}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div> 
        </ClickAwayListener>
    )


}

export default ReferenceDialog