import React from "react";

const AuthenContext = React.createContext({
    isLogin: false,
    user: {},
    setIsLogin: () => {

    },
});

export default AuthenContext;