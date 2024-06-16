import React , { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export const useUser = () =>{
    return useContext(UserContext);
}


export const UserProvider = (props) => {
    const [user, setuser] = useState();
    
    return (
        <UserContext.Provider  value={{user,setuser}}>
            {props.children}
        </UserContext.Provider>
    )
} 