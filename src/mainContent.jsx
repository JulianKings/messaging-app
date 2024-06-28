
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import './content.css'
import logoutIcon from './assets/logout.svg';
import settingsIcon from './assets/settings.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import defaultProfile from './assets/pfp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectLoginStatus, selectUser } from './scripts/redux/user/userSlice';
import FriendBar from './components/friendBar';
function MainContent()
{
    const dispatch = useDispatch();
    const userObject = useSelector(selectUser);
    const userLoginStatus = useSelector(selectLoginStatus);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!localStorage.getItem('sso_token'))
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

    useEffect(() => {
        if(userLoginStatus)
        {
            navigate('/login');
        }
    }, [userLoginStatus]);

    let userContent = 'Loading information...';
    if(userObject)
        {
            const profilePicture = (userObject.picture === '' || userObject.picture === 'none') ? defaultProfile : userObject.picture;
            let userNick = userObject.username;
            if(userObject.role === 'guest')
            {
                userNick = userObject.username.toLowerCase() + "" + userObject._id;
            } 
            let userName = userObject.username;
            if(userObject.role !== 'guest')
            {
                userName = userObject.first_name + ' ' + userObject.last_name;
            }
            userContent = <Fragment>
                <div className='navigation-profile'>
                    <div className='navigation-image'>
                        <img src={profilePicture} />
                    </div>
                    <div className='navigation-caption'>
                        <div className='navigation-caption-name'>
                            {userName}
                        </div>
                        <div className='navigation-caption-nick'>
                            {userNick}
                        </div>
                    </div>
                    <div className='navigation-menu'>
                    <img src={settingsIcon} alt='Settings' onClick={() => { navigate('/settings'); }} />
                        <img src={logoutIcon} alt='Logout' onClick={() => { navigate('/logout'); }} />
                    </div>
                </div>

                <FriendBar />
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

        <footer className='footer'>© 2024 Julian Reyes Lahoz</footer>
    </div>
    </>
}

export default MainContent
