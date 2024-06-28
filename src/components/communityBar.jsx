/* eslint-disable react-hooks/exhaustive-deps */
import CommunityMenuItem from './items/communityMenuItem';
import addCommunityIcon from '../assets/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../scripts/redux/user/userSlice';
import { Fragment, useEffect } from 'react';
import { fetchCommunities, selectMyCommunities } from '../scripts/redux/community/communitySlice';
import { useNavigate } from 'react-router-dom';

function CommunityBar()
{
    const userObject = useSelector(selectUser);
    const myCommunities = useSelector(selectMyCommunities);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(userObject !== null && userObject.role !== 'guest' && myCommunities === null && localStorage.getItem('sso_token'))
        {
            console.log('uh');
            const ssoToken = localStorage.getItem('sso_token');
            dispatch(fetchCommunities(ssoToken)); 
        }
    }, [userObject]);

    let communityListComponent = '';
    if(userObject !== null && userObject.role === 'guest')
    {
        const guestCommunity = {
            _id: 0,
            name: 'Guest Community',
            description: 'Community made for not logged in users.',
            profile_picture: 'guest'
        }

        communityListComponent = <Fragment>
            <CommunityMenuItem key={guestCommunity._id} community={guestCommunity} />            
        </Fragment>
    } else if(userObject !== null && myCommunities !== null && myCommunities.length > 0) {
        communityListComponent = myCommunities.map(community => {
            return <CommunityMenuItem key={community._id} community={community.group} />;
        })
    }

    let appendCommunityMenu = '';
    if(userObject !== null && userObject.role !== 'guest')
    {
        appendCommunityMenu = <Fragment>
            <div className='community-add' onClick={() => {
                navigate('./add_community');
            }}>
                <img src={addCommunityIcon} alt='Add community' />
            </div>
        </Fragment>;
    }

    return <>        
        <div className='community-holder'>
            {communityListComponent}

            {appendCommunityMenu}
        </div>
    </>;
}

export default CommunityBar