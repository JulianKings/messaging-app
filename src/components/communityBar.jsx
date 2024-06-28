/* eslint-disable react-hooks/exhaustive-deps */
import CommunityMenuItem from './items/communityMenuItem';
import addCommunityIcon from '../assets/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../scripts/redux/user/userSlice';
import { Fragment, useEffect } from 'react';
import { fetchCommunities, selectMyCommunities } from '../scripts/redux/community/communitySlice';

function CommunityBar()
{
    const userObject = useSelector(selectUser);
    const myCommunities = useSelector(selectMyCommunities);
    const dispatch = useDispatch();

    useEffect(() => {
        if(userObject !== null && userObject.role !== 'guest' && myCommunities === null && localStorage.getItem('sso_token'))
        {
            const ssoToken = localStorage.getItem('sso_token');
            dispatch(fetchCommunities(ssoToken)); 
        }
    }, []);

    let communityListComponent = '';
    if(userObject !== null && userObject.role === 'guest')
    {
        const mockCommunity = {
            _id: 0,
            name: 'Guest Community',
            description: 'Community made for not logged in users.',
            profile_picture: 'guest'
        }

        communityListComponent = <Fragment>
            <CommunityMenuItem key={mockCommunity._id} community={mockCommunity} />            
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
            <div className='community-add'>
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