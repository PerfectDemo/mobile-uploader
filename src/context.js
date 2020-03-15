import React, { createContext, useState } from 'react';

import Qiniu from './service/qiniu';
import useFiles from './hooks/use-files';


export const Context = createContext({});

export const Provider = (props) => {
    const { children } = props;

    const { files, currentDir, setCurrentDir } = useFiles();

    const context = {
        files,
        currentDir, 
        setCurrentDir
    };

    return (
        <Context.Provider value={context}>{children}</Context.Provider>
    )
}

export const { Consumer } = Context;



