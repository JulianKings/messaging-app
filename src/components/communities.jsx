import CommunityItem from "./items/communityItem";

function Communities() {
    const mockCommunity = {
        _id: 0,
        name: 'Mock Community',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        profile_picture: ''
    }

    return <>
        <div className='community-popular'>
            <div className='community-popular-caption'>
                Popular communities
            </div>
            <div className='community-popular-holder'>
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
            </div>
        </div>
        <div className='community-latest'>
            <div className='community-latest-caption'>
                Latest communities
            </div>
            <div className='community-latest-holder'>
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
                <CommunityItem id={mockCommunity._id} community={mockCommunity} />
            </div>
        </div>
    </>;
}

export default Communities