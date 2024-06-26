import PropTypes from 'prop-types';
import defaultProfile from '../../assets/pfp.jpg'

function CommunityMenuItem ({ community }) {
    const profilePicture = (community.profile_picture === '') ? defaultProfile : community.profile_picture; 
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