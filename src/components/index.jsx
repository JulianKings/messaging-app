import '../style/index.css';
import Communities from './communities';
import CommunityBar from './communityBar';

function Index()
{
    return <>
        <CommunityBar />
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