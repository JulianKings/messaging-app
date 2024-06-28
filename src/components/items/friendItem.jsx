import PropTypes from 'prop-types';
import defaultProfile from '../../assets/pfp.jpg';
import developerProfile from '../../assets/developer.png'
import DOMPurify from 'dompurify';

function FriendItem({ friend })
{
    const profilePicture = (friend.profile_picture === '') ? defaultProfile : 
    (friend.profile_picture === 'developer') ? developerProfile : friend.profile_picture;             
    
    const cleanPicture = (new DOMParser().parseFromString(profilePicture, "text/html")).documentElement.textContent;
    const sanitizePicture = DOMPurify.sanitize(cleanPicture);
    
    return <>
        <div className='friend-profile'>
            <div className='friend-image'>
                <img src={sanitizePicture} />
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