import React, { useState } from "react";
import { loginUser, logoutUser, updatePassword } from "../../clib/api";
import { Modal, PasswordInput } from "../../components";
import { notify } from "../../state/Actions";
import { useStateValue } from "../../state/StateProvider";
import { goto } from "../../util";

const SettingsModal = ({ 
    display, 
    toggle
} : { 
    display: boolean, 
    toggle: () => void
}) => {

    // @ts-ignore
    const [state, dispatch] = useStateValue();


    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [runningAction, setRunningAction] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const onChangeOldPassword = (evt) => {
        setOldPassword(evt.target.value)
    }

    const onChangeNewPassword = (evt) => {
        setNewPassword(evt.target.value)
    }
    
    const onLogout = async () => {
        try {
            setRunningAction("Logout")
            dispatch({ type: 'LOGOUT' });
            await logoutUser()
            setRunningAction("")
            goto("login")
        } catch (err) {
            console.log(err)
        }
    };
    
    const updatePasswordSettings = async () => {
        try {
            const res = await updatePassword({ old_password: oldPassword,  new_password: newPassword })
            if (res.error) {
                throw res
            }
        } catch (err) {
            throw err
        }
    }

    const onSaveSettings = async () => {
        try {
            setRunningAction("Save")
            await updatePasswordSettings()
            setRunningAction("")
            toggle()
            notify(dispatch, "Updated Settings", "success", "right")
        } catch (err) {
            setErrorMessage(err.error)
            setRunningAction("")
        }
    }

    const actions = [{
        text: "Logout",
        textColor: "white",
        btnColor: "#dc3545",
        action: onLogout,
        position: "left",
        icon: "fas fa-sign-out-alt"
    }, {
        text: "Save",
        textColor: "white",
        action: onSaveSettings,
        position: "right",
        icon: "fas fa-save"
    }]

    return (
    <Modal
        display={display}
        toggleModal={toggle}
        actions={actions}
        loadingAction={runningAction}
        actionDisabled={false}
        buttonText='Logout'
        title='Account Settings'
      >
        <div style={{marginBottom: 20}}>
        <div className="mb3 mt3">
            <h5 className="white" style={{display: "inline"}}>Update Password</h5>
            {errorMessage && (
                <span style={{
                    marginLeft: 10,
                    backgroundColor: "rgb(220, 53, 69)", 
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 5, 
                    paddingRight: 5,
                    display: "inline", 
                    borderRadius: 8, 
                    fontSize: 11
                }}>
                    <i className="fas fa-exclamation-circle mr1"></i>
                    {errorMessage}
                </span>
            )}
        </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div style={{ flex: 1, marginRight: 5 }}>
                <PasswordInput 
                    onChangePassword={onChangeOldPassword} 
                    password={oldPassword}
                    placeholder="Enter old password"
                />
            </div>
            <div style={{ flex: 1, marginLeft: 5 }}>
                <PasswordInput 
                    onChangePassword={onChangeNewPassword} 
                    password={newPassword}
                    placeholder="Enter new password"
                />
            </div>
          </div>

        </div>
      </Modal>
    )
}

export default SettingsModal