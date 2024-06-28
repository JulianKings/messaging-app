/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import searchFriendsIcon from '../assets/search-2.svg';
import FriendItem from './items/friendItem';
import { selectUser } from '../scripts/redux/user/userSlice';
import { Fragment, useEffect } from 'react';
import { fetchFriends, selectMyFriends } from '../scripts/redux/user/friendSlice';

function FriendBar()
{
    const userObject = useSelector(selectUser);
    const myFriends = useSelector(selectMyFriends);
    const dispatch = useDispatch();

    useEffect(() => {
        if(userObject !== null && userObject.role !== 'guest' && myFriends === null && localStorage.getItem('sso_token'))
        {
            const ssoToken = localStorage.getItem('sso_token');
            dispatch(fetchFriends(ssoToken)); 
        }
    }, [userObject]);

    let friendListComponent = '';
    if(userObject !== null && userObject.role === 'guest')
    {
        const guestFriend = {
            _id: -1,
            username: 'Developer',
            profile_picture: 'developer',
            online: false
        }

        friendListComponent = <Fragment>
            <FriendItem id={guestFriend._id} friend={guestFriend} />
        </Fragment>

    } else if(userObject !== null && myFriends !== null && myFriends.length > 0) {
        friendListComponent = myFriends.map(friend => {
            return <FriendItem key={friend._id} friend={friend.friend} />;
        })
    }

    return <>
        <div className='navigation-search-friends'>
            <div className='navigation-search-image'>
                <img src={searchFriendsIcon} alt='Search Friends' />
            </div>
            <input type='text' placeholder='Search Friend' />
        </div>

        <div className='navigation-friend-list'>
            {friendListComponent}
        </div>
    </>;
}

export default FriendBar;