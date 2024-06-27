import { useSelector } from 'react-redux';
import searchFriendsIcon from '../assets/search-2.svg';
import FriendItem from './items/friendItem';
import { selectUser } from '../scripts/redux/user/userSlice';
import { Fragment } from 'react';

function FriendBar()
{
    const userObject = useSelector(selectUser);

    let friendListComponent = '';
    if(userObject !== null && userObject.role === 'guest')
    {
        const guestFriend = {
            _id: -1,
            username: 'Developer',
            profile_picture: '',
            online: false
        }

        friendListComponent = <Fragment>
            <FriendItem id={guestFriend._id} friend={guestFriend} />
        </Fragment>

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