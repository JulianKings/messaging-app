import '../style/index.css';
import CommunityMenuItem from './items/communityMenuItem';
import addCommunityIcon from '../assets/plus.svg';
import Communities from './communities';

function Index()
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
        <div className='community-search'>
            <div className='community-search-holder'>
                <input type='text' id='community-search' name='search-input' placeholder='Explore Communities' />
                <div className='community-search-icon' />
            </div>
        </div>
        <Communities />        
    </>;
}

export default Index;