import React from "react"


const NotificationIcon = ({ variant, iconClass }) => {
    switch (variant) {
        case 'success': {
        return (
            <i className={`fa fa-check-circle ${iconClass}`} aria-hidden='true'></i>
        );
        }
        case 'error': {
        return (
            <i
            className={`fa fa-exclamation-triangle ${iconClass}`}
            aria-hidden='true'
            ></i>
        );
        }
        case 'progress': {
        return <i className={`ml1 fas fa-circle-notch fa-spin ${iconClass}`}></i>;
        }
        case 'warn': {
        return (
            <i className={`fa fa-info-circle ${iconClass}`} aria-hidden='true'></i>
        );
        }
        default: {
        return null;
        }
    }
};

export default NotificationIcon