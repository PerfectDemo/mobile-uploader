import React, { useState, useEffect } from 'react';

export default function ussSnackBar() {
    const [ snackBarOpen, setSnackBarOpen ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ snackType, setSnackType ] = useState('info');

    const show = function(message, type = 'info') {
        setSnackType(type);
        setMessage(message);
        setSnackBarOpen(true);
        setTimeout(() => setSnackBarOpen(false), 1500);
    }

    const hide = function() {
        setSnackBarOpen(false);
    }

    return {
        snackBarOpen,
        snackShow: show,
        snackMessage: message,
        snackHide: hide,
        snackType
    };
}