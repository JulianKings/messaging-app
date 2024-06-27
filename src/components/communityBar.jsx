import CommunityMenuItem from './items/communityMenuItem';
import addCommunityIcon from '../assets/plus.svg';

function CommunityBar()
{
    const mockCommunity = {
        _id: 0,
        name: 'Mock Community',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        profile_picture: ''
    }

    return <>        
        <div className='community-holder'>
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />
            <CommunityMenuItem id={mockCommunity._id} community={mockCommunity} />

            <div className='community-add'>
                <img src={addCommunityIcon} alt='Add community' />
            </div>
        </div>
    </>;
}

export default CommunityBar