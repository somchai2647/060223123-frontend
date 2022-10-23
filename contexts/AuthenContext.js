import React from "react";

const AuthenContext = React.createContext({
    isLogin: false,
    setIsLogin: () => { },
});

export default AuthenContext;