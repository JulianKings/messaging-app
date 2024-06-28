import PropTypes from 'prop-types';
import defaultProfile from '../../assets/default-community.png';
import guestPicture from '../../assets/guest-community.png';

function CommunityMenuItem ({ community }) {
    const profilePicture = (community.profile_picture === '') ? defaultProfile : 
    (community.profile_picture === 'guest') ? guestPicture : community.profile_picture; 
    return <>
        <div className='community-item'>
            <img src={profilePicture} alt='Profile Picture' />
        </div>    
    </>
}

CommunityMenuItem.propTypes = {
    community: PropTypes.object
}

export default CommunityMenuItem;