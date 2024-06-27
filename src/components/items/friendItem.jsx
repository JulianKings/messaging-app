import PropTypes from 'prop-types';
import defaultProfile from '../../assets/pfp.jpg';

function FriendItem({ friend })
{
    const profilePicture = (friend.profile_picture === '') ? defaultProfile : friend.profile_picture;             
    return <>
        <div className='friend-profile'>
            <div className='friend-image'>
                <img src={profilePicture} />
            </div>
            <div className='friend-caption'>
                <div className='friend-caption-name'>
                    {friend.username}
                </div>
                <div className='friend-caption-status'>
                    Online
                </div>
            </div>
            <div className='friend-status'>
                <div className='community-item-green-dot'></div>
            </div>
        </div>
</>;
}

FriendItem.propTypes = {
    friend: PropTypes.object,
}

export default FriendItem;