import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice ({
    name: 'user',
    initialState: {
        user: null,
        invalidLogin: false,
        error: null
    },
    reducers: {
        updateUser: (state, action) => {
            if(action.payload === null)
            {
                state.invalidLogin = true;
            }
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                const apiResponse = action.payload;
                if(apiResponse === null)
                {
                    state.user = null;
                    state.invalidLogin = true;
                } else {
                    state.user = apiResponse.user;
                    state.invalidLogin = false;
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.user = null;
                state.invalidLogin = true;
            })
    }
});

export const { updateUser } = userSlice.actions
export const selectUser = state => state.user.user
export const selectLoginStatus = state => state.user.invalidLogin
export const selectUserError = state => state.user.error

export const fetchUser = createAsyncThunk('user/fetchUser', async (ssoToken) => {
    const response = await fetch("http://localhost:3000/sso", {                
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

export default userSlice.reducer


