import PropTypes from 'prop-types';
import defaultProfile from '../../assets/default-community.png';
import guestPicture from '../../assets/guest-community.png';
import DOMPurify from 'dompurify';

function CommunityMenuItem ({ community }) {
    const profilePicture = (community.profile_picture === '') ? defaultProfile : 
    (community.profile_picture === 'guest') ? guestPicture : community.profile_picture; 
    
    const cleanPicture = (new DOMParser().parseFromString(profilePicture, "text/html")).documentElement.textContent;
    const sanitizePicture = DOMPurify.sanitize(cleanPicture);
    
    return <>
        <div className='community-item'>
            <img src={sanitizePicture} alt='Profile Picture' />
        </div>    
    </>
}

CommunityMenuItem.propTypes = {
    community: PropTypes.object
}

export default CommunityMenuItem;