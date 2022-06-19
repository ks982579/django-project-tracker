import React, {useState, useEffect, useReducer} from "react";

import AuthActions from "../../actions/auth-actions";

const DevContext = React.createContext({
    taskData: [],
    update: {},
});

export const DevContextProvider = (props) => {
    const [taskData, setTaskData] = useState([]);
    const [runUpdate, setRunUpdate] = useState(0);

    const callAPI = () => {
        setRunUpdate((runUpdate+1)%2)
    }

    //Check if user is already logged in
    useEffect(() =>{
        /* We could check for just a cookie... but we'll ask the server */
        const newData = AuthActions.fetchAllData();
        console.log('Acquired Dev Context...')
        setTaskData(newData);
        console.log(taskData);
    },[runUpdate])

    return (
        <DevContext.Provider value={{
            taskData: taskData,
            update: callAPI,
        }}>
            {props.children}
        </DevContext.Provider>
    )
}

export default DevContext;