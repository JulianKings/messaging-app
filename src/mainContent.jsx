
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './content.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
function MainContent()
{
    const [userObject, setUserObject] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!localStorage.getItem('sso_token'))
        {
            navigate('/login');
        }

        if(localStorage.getItem('sso_token'))
        {
            const ssoToken = localStorage.getItem('sso_token');
            fetch("https://localhost:3000/sso", {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json',
             })
            .then((response) => {
                if(response.status === 401)
                {
                    // Awaiting for login or token expired

                    if(localStorage.getItem('sso_token'))
                    {
                        localStorage.removeItem('sso_token');
                    }
                    // cleanup user if it exists
                    if(userObject)
                    {
                        setUserObject(null);
                    }

                    navigate('/login');
                    return null;
                } else if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) => {
                if(response)
                {
                    // We are logged in
                    setUserObject(response.user);
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
        }
    }, [location.pathname]);

    return <>
    <div className='content-box'>
        <nav className='navigation'>
        </nav>
        <main className='content-holder'>
            <Outlet context={[userObject, setUserObject]} />
        </main>

        <footer className='footer'>© 2024 Site developed as part of one of the final lessons for The Odin Project</footer>
    </div>
    </>
}

export default MainContent
