import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userToken = useSelector((state : any) => state.auth.token); 
    const getUserTokenFromStorage = localStorage.getItem('token')
    useEffect(() => {
        if (userToken || getUserTokenFromStorage) setIsLoggedIn(true)
        else navigate('/signin');
    }, [userToken, navigate]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;
