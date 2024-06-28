import PropTypes from 'prop-types';
import defaultProfile from '../../assets/default-community.png'
import usersIcon from '../../assets/users.svg';

function CommunityItem ({ community }) {
    const profilePicture = (community.profile_picture === '') ? defaultProfile : community.profile_picture; 
    return <>
        <div className='community-big-item'>
            <div className='community-item-header'>
                <img src={profilePicture} alt='Profile Picture' />
                <div className='community-item-header-line'></div>
            </div>
            <div className='community-item-content'>
                <div className='community-item-name'>{community.name}</div>
                <div className='community-item-description'>{community.description}</div>
                <div className='community-item-stats'>
                    <div className='community-item-online'>
                        <div className='community-item-green-dot'></div>
                        <div className='community-item-online-count'>0 Online</div>
                    </div>
                    <div className='community-item-members'>
                        <div className='community-item-member-image'>
                            <img src={usersIcon} alt='Members Icon' />
                        </div>
                        <div className='community-item-member-count'>0 Members</div>
                    </div>
                </div>
            </div>
        </div>    
    </>
}

CommunityItem.propTypes = {
    community: PropTypes.object
}

export default CommunityItem;