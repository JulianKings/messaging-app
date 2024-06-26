
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import './content.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import defaultProfile from './assets/pfp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectLoginStatus, selectUser } from './scripts/redux/user/userSlice';
function MainContent()
{
    const dispatch = useDispatch();
    const userObject = useSelector(selectUser);
    const userLoginStatus = useSelector(selectLoginStatus);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!localStorage.getItem('sso_token') || userLoginStatus)
        {
            navigate('/login');
        }

        if(localStorage.getItem('sso_token'))
        {
            if(userObject === null)
            {
                const ssoToken = localStorage.getItem('sso_token');
                dispatch(fetchUser(ssoToken));                
            }
        }
    }, [location.pathname]);

    let userContent = 'Loading information...';
    if(userObject)
        {
            userContent = <Fragment>
                <div className='navigation-profile'>
                    <div className='navigation-image'>
                        <img src={defaultProfile} />
                    </div>
                    <div className='navigation-caption'>
                        <div className='navigation-caption-name'>
                            {userObject.username}
                        </div>
                        <div className='navigation-caption-nick'>
                            {userObject.username}
                        </div>
                    </div>
                </div>
            </Fragment>;
        }

    return <>
    <div className='content-box'>
        <nav className='navigation'>
            {userContent}
        </nav>
        <main className='content-holder'>
            <Outlet />
        </main>

        <footer className='footer'>© 2024 Site developed as part of one of the final lessons for The Odin Project</footer>
    </div>
    </>
}

export default MainContent
