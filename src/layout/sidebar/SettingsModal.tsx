import React, { useState } from "react";
import { loginUser, logoutUser, updatePassword } from "../../clib/api";
import { Modal, PasswordInput } from "../../components";
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

    const onSaveSettings = async () => {
        try {
            setRunningAction("Save")
            console.log(state.user)
            const res = await updatePassword({ old_password: oldPassword,  new_password: newPassword })
            setRunningAction("")
            toggle()
        } catch (err) {
            setRunningAction("")
            toggle()
            console.log("err: ", err)
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
          <h5 className="white">Update Password</h5>
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