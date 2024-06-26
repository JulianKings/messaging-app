/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../scripts/redux/user/userSlice";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(localStorage.getItem('sso_token'))
    {
        localStorage.removeItem('sso_token');
        dispatch(updateUser(null))
        navigate(0);
    }

    useEffect(() => {
        if(!localStorage.getItem('sso_token'))
        {
            navigate('/login');
        }
    }, []);

    return <>
        <div className="redirectCaption">Redirecting...</div>
    </>
}

export default Logout