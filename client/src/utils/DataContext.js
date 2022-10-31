import React, { useState } from 'react';

const DataContext = React.createContext([[], () => { }]);

const DataProvider = ({ children }) => {
    const [dataState, setDataState] = useState([]);

    return (
        <DataContext.Provider value={[dataState, setDataState]}>
            {children}
        </DataContext.Provider>
    )
};

export { DataContext, DataProvider };