import React, { createContext, useState } from 'react';

import Qiniu from './service/qiniu';

export const Context = createContext({});

export const Provider = (props) => {
    const { children } = props;

    const [ files, setFiles ] = useState([
        { name: 'hello.txt', type: 'file', size: 4654564 },
        { name: 'child', type: 'dir', size: 0 }
      ]);
    
    const [ currentDir, setCurrentDir ] = useState('/');

    const context = {
        files,
        setFiles,
        currentDir, 
        setCurrentDir
    };

    return (
        <Context.Provider value={context}>{children}</Context.Provider>
    )
}

export const { Consumer } = Context;



