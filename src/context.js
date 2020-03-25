import React, { createContext, useState } from 'react';

import useFiles from './hooks/use-files';
import useSnackBar from './hooks/use-snackbar';


export const Context = createContext({});

export const Provider = (props) => {
    const { children } = props;

    const { files, currentDir, setCurrentDir, readDir } = useFiles();
    const {
        snackBarOpen,
        snackShow,
        snackMessage,
        snackHide,
        snackType
    } = useSnackBar();

    const context = {
        files,
        currentDir, 
        setCurrentDir,
        readDir,

        snackBarOpen,
        snackShow,
        snackMessage,
        snackHide,
        snackType
    };

    return (
        <Context.Provider value={context}>{children}</Context.Provider>
    )
}

export const { Consumer } = Context;



