import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 토큰 있으면 로그인 유지
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!isLoggedIn);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}