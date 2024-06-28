import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../user/userSlice";

export const friendSlice = createSlice ({
    name: 'friend',
    initialState: {
        my_friends: null,
        error: null
    },
    reducers: {
        appendFriend: (state, action) => {
            if(action.payload !== null)
            {
                state.my_friends.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriends.fulfilled, (state, action) => {
                const apiResponse = action.payload;
                if(apiResponse === null)
                {
                    state.my_friends = null;
                } else {
                    state.my_friends = apiResponse.friends;
                }
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.error = action.error.message;
                state.my_friends = null;
            })
    }
});

export const { appendFriend } = friendSlice.actions
export const selectMyFriends = state => state.friend.my_friends
export const selectFriendError = state => state.friend.error

export const fetchFriends = createAsyncThunk('community/fetchFriends', async (ssoToken) => {
    const response = await fetch("http://localhost:3000/sso/friends", {                
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

export default friendSlice.reducer


