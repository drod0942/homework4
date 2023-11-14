import React, { createContext, useState, useContext } from "react";

// Create Context object
export const UserContext = createContext();

// It returns the context provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Returning our provider with value as an object of value and update method
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

// useUser is our own custom React hook that will return user and setUser.
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserProvider;
