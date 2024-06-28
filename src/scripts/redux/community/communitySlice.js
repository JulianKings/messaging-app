import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../user/userSlice";

export const communitySlice = createSlice ({
    name: 'community',
    initialState: {
        my_communities: null,
        error: null
    },
    reducers: {
        appendCommunity: (state, action) => {
            if(action.payload !== null)
            {
                state.my_communities.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommunities.fulfilled, (state, action) => {
                const apiResponse = action.payload;
                if(apiResponse === null)
                {
                    state.my_communities = null;
                } else {
                    state.my_communities = apiResponse.communities;
                }
            })
            .addCase(fetchCommunities.rejected, (state, action) => {
                state.error = action.error.message;
                state.my_communities = null;
            })
    }
});

export const { appendCommunity } = communitySlice.actions
export const selectMyCommunities = state => state.community.my_communities
export const selectCommunityError = state => state.community.error

export const fetchCommunities = createAsyncThunk('community/fetchCommunities', async (ssoToken) => {
    const response = await fetch("http://localhost:3000/sso/community", {                
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + ssoToken
        },
        mode: "cors",
        dataType: 'json',
    })
    .then((response) => {
        if(response.status === 401)
        {
            // Awaiting for login or token expired

            if(localStorage.getItem('sso_token'))
            {
                localStorage.removeItem('sso_token');
            }

            // cleanup user if it exists
            updateUser(null);

            return null;
        } else if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
    })
    .catch((error) => {
        throw new Error(error);
    });

    return response;
})

export default communitySlice.reducer


