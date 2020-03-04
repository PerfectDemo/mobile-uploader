import React, { createContext, useState } from 'react';


export const Context = createContext({});

export const Provider = (props) => {
    const { children } = props;

    const [ selectedRecord, setSelectedRecord ] = useState(null);

    const context = {
        selectedRecord,
        setSelectedRecord
    };

    return (
        <Context.Provider value={context}>{children}</Context.Provider>
    )
}

export const { Consumer } = Context;



