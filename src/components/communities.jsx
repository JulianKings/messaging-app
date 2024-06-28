import { Fragment } from "react";
import { useGetLatestCommunitiesQuery, useGetPopularCommunitiesQuery } from "../scripts/redux/query/communityApi";
import CommunityItem from "./items/communityItem";

function Communities() {
    const { data: popularData, isLoading: popularIsLoading } = useGetPopularCommunitiesQuery();
    const { data: latestData, isLoading: latestIsLoading } = useGetLatestCommunitiesQuery();

    let popularContent = <Fragment>
        <div className="community-loading-caption">
            Loading communities...
        </div>
    </Fragment>;

    if(!popularIsLoading)
    {
        if(popularData.length > 0)
        {
            popularContent = popularData.map((community) => {
                console.log(community);
                return <CommunityItem key={community.group._id} community={community.group} memberCount={community.memberCount} />;
            });
        } else {
            popularContent = <Fragment>
                <div className="community-empty-caption">
                    There are no communities currently.
                </div>
            </Fragment>
        }
    }

    let latestContent = <Fragment>
        <div className="community-loading-caption">
            Loading communities...
        </div>
    </Fragment>;
    if(!latestIsLoading)
    {
        if(latestData.length > 0)
        {
            latestContent = latestData.map((community) => {
                return <CommunityItem key={community._id} community={community} />;
            });
        } else {
            latestContent = <Fragment>
                <div className="community-empty-caption">
                    There are no communities currently.
                </div>
            </Fragment>
        }
    }

    return <>
        <div className='community-popular'>
            <div className='community-popular-caption'>
                Popular communities
            </div>
            <div className='community-popular-holder'>
                {popularContent}
            </div>
        </div>
        <div className='community-latest'>
            <div className='community-latest-caption'>
                Latest communities
            </div>
            <div className='community-latest-holder'>
                {latestContent}
            </div>
        </div>
    </>;
}

export default Communities